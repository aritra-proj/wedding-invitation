/**
 * Google Apps Script for Aritra & Srijani Wedding Reception Guestbook & RSVP
 * Spreadsheet ID: 1Jzs9SV5XFWbnGXpV6LHq1ZG5Gn7fqzW-6LgiY1kArco
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Jzs9SV5XFWbnGXpV6LHq1ZG5Gn7fqzW-6LgiY1kArco/edit
 * 2. In the top menu, click: Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file.
 * 4. Click the Save icon (💾).
 * 5. Click "Deploy" (top right) > "New deployment".
 * 6. Click the gear icon (⚙️) next to "Select type" and choose "Web app".
 * 7. Set configuration:
 *    - Description: "Wedding Blessing API"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (IMPORTANT: Do NOT select "Only myself" or "Anyone with Google account")
 * 8. Click "Deploy", authorize permissions when prompted.
 * 9. Copy the "Web app URL" (ends with /exec).
 * 10. Paste that URL into app.js in place of GOOGLE_APPS_SCRIPT_URL.
 */

const SHEET_ID = "1Jzs9SV5XFWbnGXpV6LHq1ZG5Gn7fqzW-6LgiY1kArco";
const SHEET_NAME = "Blessings";

function getSpreadsheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Auto-create sheet and header row if not already present
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = ["Timestamp", "Guest Name", "RSVP Status", "Sticker", "Blessing Message", "Device Type", "IP Address", "User Agent"];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#F3EBD8").setFontColor("#721121");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Handle GET requests - Fetches all blessings to display on the webpage
 */
function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : "";
    
    // Support saving via GET query params if POST is ever restricted
    if (action === "add" && e.parameter.name) {
      return handleAddBlessing({
        name: e.parameter.name || "Anonymous",
        status: e.parameter.status || "Joyfully Attending",
        sticker: e.parameter.sticker || "💖",
        message: e.parameter.message || "",
        device: e.parameter.device || "Unknown",
        ip: e.parameter.ip || "Unknown",
        userAgent: e.parameter.userAgent || ""
      });
    }

    const sheet = getSpreadsheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return createJsonResponse({ status: "success", blessings: [] });
    }

    const blessings = [];
    // Skip header (row 0), read newest first (from bottom to top)
    for (let i = data.length - 1; i >= 1; i--) {
      const row = data[i];
      if (row[1] && row[4]) { // Must have Name and Message
        blessings.push({
          timestamp: formatDisplayDate(row[0]),
          name: String(row[1]),
          status: String(row[2] || "Joyfully Attending"),
          sticker: String(row[3] || "💖"),
          message: String(row[4] || ""),
          device: String(row[5] || ""),
          ip: String(row[6] || "")
        });
      }
    }

    return createJsonResponse({ status: "success", count: blessings.length, blessings: blessings });

  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

/**
 * Handle POST requests - Stores a new blessing into the Google Sheet
 */
function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    return handleAddBlessing(payload);

  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

function handleAddBlessing(data) {
  const sheet = getSpreadsheet();
  const timestamp = new Date();
  const name = (data.name || "").trim() || "Anonymous Well-Wisher";
  const status = data.status || "Joyfully Attending with Family";
  const sticker = data.sticker || "💖 Loads of Love!";
  const message = (data.message || "").trim();
  const device = data.device || "Desktop / Browser";
  const ip = data.ip || "Not detected";
  const userAgent = data.userAgent || "";

  if (!message) {
    return createJsonResponse({ status: "error", message: "Blessing message is required." });
  }

  // Append new row to Google Sheet
  sheet.appendRow([timestamp, name, status, sticker, message, device, ip, userAgent]);

  return createJsonResponse({
    status: "success",
    message: "Blessing saved successfully to Google Sheet!",
    blessing: {
      timestamp: "Just now",
      name: name,
      status: status,
      sticker: sticker,
      message: message,
      device: device,
      ip: ip
    }
  });
}

function formatDisplayDate(dateVal) {
  if (!dateVal) return "Recently";
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return Utilities.formatDate(d, "Asia/Kolkata", "dd MMM yyyy, hh:mm a");
  } catch (e) {
    return String(dateVal);
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
