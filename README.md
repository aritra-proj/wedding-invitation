# 💍 Aritra & Srijani — Wedding Reception Invitation Page

An interactive, responsive, and cute wedding reception invitation web page for **Aritra & Srijani** celebrating their reception on **Monday, December 14, 2026** at **Taj Garden, Kamalgazi, Garia, Kolkata**.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

### Option 1: Using GitHub Web (No CLI needed)
1. Go to [GitHub.com](https://github.com) and click **"New Repository"**.
2. Name the repository (e.g. `wedding-invitation` or `aritra-srijani-reception`).
3. Set repository visibility to **Public** and create it.
4. Click **"Upload files"** and drag & drop all files from this folder (`index.html`, `style.css`, `app.js`, and the `assets/` folder).
5. Commit the files.
6. Go to repository **Settings** ⚙️ ➔ **Pages** (in the left sidebar).
7. Under **Build and deployment** ➔ **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
8. Within 1 minute, GitHub will give you your live URL:
   `https://<your-username>.github.io/wedding-invitation/`

---

### Option 2: Using Git Terminal / PowerShell
Open your terminal inside this `marriage_card_page` directory:

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit for Aritra & Srijani Wedding Reception Invitation"

# 4. Set main branch
git branch -M main

# 5. Link to your GitHub repo
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push code
git push -u origin main
```

Then in your GitHub repository:
- Go to **Settings** ➔ **Pages**
- Source: Deploy from a branch ➔ Select **`main`** / **`/ (root)`** ➔ Click **Save**.

---

## 📊 Google Sheets Live Guestbook & RSVP Setup

Your web page is integrated with Google Sheets so that guest wishes & RSVPs are permanently recorded in your Google Sheet and loaded live on the page!

### Quick 1-Minute Setup:
1. Open your Google Sheet: [https://docs.google.com/spreadsheets/d/1Jzs9SV5XFWbnGXpV6LHq1ZG5Gn7fqzW-6LgiY1kArco/edit](https://docs.google.com/spreadsheets/d/1Jzs9SV5XFWbnGXpV6LHq1ZG5Gn7fqzW-6LgiY1kArco/edit)
2. In the top toolbar, click **Extensions** ➔ **Apps Script**.
3. Replace any code with the contents of [`google_apps_script.gs`](google_apps_script.gs) and click **Save** (💾).
4. Click **Deploy** (top right button) ➔ **New deployment**.
5. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
6. Set:
   - **Description**: `Wedding Guestbook API`
   - **Execute as**: `Me (<your-email>)`
   - **Who has access**: `Anyone` *(Crucial: must be Anyone so guests can post without logging in)*
7. Click **Deploy** and click **Authorize Access** when prompted.
8. Copy the generated **Web App URL** (which ends in `/exec`).
9. Open [`app.js`](app.js) and paste your URL in `WEDDING_CONFIG.googleAppsScriptUrl`:
   ```javascript
   googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec"
   ```
10. Commit and push to GitHub!

### Stored Fields in Google Sheets:
- **Timestamp** (Formatted IST time)
- **Guest Name**
- **RSVP Status**
- **Cute Sticker**
- **Blessing Message**
- **Device Type** (e.g. `Mobile (Android • Chrome)`, `Desktop (Windows • Edge)`, `Mobile (iOS • Safari)`)
- **IP Address** (Client public IP)
- **User Agent**

---

## 📱 Features Included
- 💌 **Opening Royal Curtain & Wax-Seal Envelope** (opens on scroll or tap with harp chime).
- ⏳ **Live Dynamic Countdown** to Dec 14, 2026, 7:00 PM.
- 📅 **Add to Google Calendar** & **Download Apple/Outlook iCal (.ics)**.
- 📍 **Venue Card & Direct Google Maps link** for Taj Garden, Kamalgazi, Garia.
- 🌸 **Falling Rose Petal Canvas Physics** (with toggle).
- ✨ **Interactive Click/Touch Heart & Sparkle Particle bursts**.
- 👫 **Scroll-Progress Walking Couple Tracker** (Aritra & Srijani walk towards each other as guests scroll).
- 💬 **Celebration Blessing Board & RSVP** with Google Sheet integration, IP & device detection, and celebration confetti explosions.
- 🎵 **Romantic Ambient Melody Synthesizer** with music toggle.
- 🔗 **WhatsApp & Social Share** with pre-formatted invitation text and preview cards.
