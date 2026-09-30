/**
 * Aritra & Srijani - Wedding Reception Invitation JavaScript
 * Handles Royal Unveiling, Live Countdown, Petal Physics, Confetti, Calendar,
 * Interactive Audio, Guestbook RSVP, and Scroll Progress animations.
 */

// ==========================================================================
// CONFIGURATION
// ==========================================================================
const WEDDING_CONFIG = {
  groomName: "Aritra",
  brideName: "Srijani",
  eventTitle: "Wedding Reception of Aritra & Srijani",
  // Target date: December 14, 2026, 19:00:00 IST (UTC+5:30)
  targetDate: new Date("2026-12-14T19:00:00+05:30").getTime(),
  venueName: "Taj Garden",
  venueAddress: "Taj Garden, Kamalgazi, Garia, Kolkata, West Bengal",
  googleMapsUrl: "https://maps.app.goo.gl/pw3P4nERyKfgorFv6",
  timeText: "7:00 PM Onwards",
  formattedDate: "Monday, December 14, 2026",

  // GOOGLE APPS SCRIPT WEB APP URL
  googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbzUR2e3m2w95aaLDm0q6nOdi-EMV027SRZOGcUBOelzO4DjfcLBKAfrUGa4lZA9q1VRFg/exec"
};

// State Variables
let isOverlayOpen = false;
let isAudioPlaying = false;
let arePetalsActive = true;
let selectedSticker = "💖 Loads of Love!";
let clientIpAddress = "Detecting...";

// Pre-loaded Blessings for initial charm
const initialBlessings = [
  {
    name: "Subhashis & Moumita",
    status: "🎉 Joyfully Attending with Family",
    sticker: "💖 Loads of Love!",
    message: "Wishing Aritra and Srijani a lifetime of boundless love, health, and infinite smiles! Can't wait for Dec 14!",
    time: "Just now"
  },
  {
    name: "Anirban Roy",
    status: "💃 Ready to Dance all night!",
    sticker: "✨ Best Wishes for Forever!",
    message: "Huge congratulations to the most lovely couple! Super excited to celebrate with you both at Taj Garden!",
    time: "2 hours ago"
  },
  {
    name: "Debolina Sen",
    status: "🥂 Cheers to the Beautiful Couple!",
    sticker: "🥂 Cheers to the Beautiful Couple!",
    message: "May your married life be filled with sweet moments, endless laughter, and beautiful adventures together! 🌸✨",
    time: "Yesterday"
  }
];


// ==========================================================================
// DOM CONTENT LOADED INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initUnveilExperience();
  initCountdown();
  initPetalCanvas();
  initConfettiCanvas();
  initClickSparkles();
  initCalendarIntegrations();
  initGuestbook();
  initScrollTracker();
  initMusicController();
  initShareFeatures();
  initScrollAnimations();
});


// ==========================================================================
// 1. ROYAL UNVEIL EXPERIENCE (CURTAIN + ENVELOPE)
// ==========================================================================
function initUnveilExperience() {
  const overlay = document.getElementById("unveilOverlay");
  const envelope = document.getElementById("royalEnvelope");
  const waxSealBtn = document.getElementById("waxSealBtn");
  const unveilHint = document.getElementById("unveilHint");

  function triggerOpen() {
    if (isOverlayOpen) return;
    isOverlayOpen = true;

    // Play subtle opening chime
    playHarpChime();

    // Spawn celebration sparkles at seal
    const rect = waxSealBtn.getBoundingClientRect();
    createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);

    // Open envelope flap
    envelope.classList.add("opened-flap");

    // After slight delay, open velvet curtains and fade overlay
    setTimeout(() => {
      overlay.classList.add("opened");
      showToast("🌸 Welcome to Aritra & Srijani's Wedding Celebration! ✨");
      fireConfetti();
    }, 600);

    // Cleanup overlay from DOM after transition
    setTimeout(() => {
      overlay.style.display = "none";
    }, 2200);
  }

  // Click on wax seal or envelope
  waxSealBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerOpen();
  });

  envelope.addEventListener("click", () => {
    triggerOpen();
  });

  if (unveilHint) {
    unveilHint.addEventListener("click", () => {
      triggerOpen();
    });
  }

  // Scroll or Wheel down triggers opening
  let wheelDelta = 0;
  window.addEventListener("wheel", (e) => {
    if (!isOverlayOpen && e.deltaY > 20) {
      triggerOpen();
    }
  }, { passive: true });

  // Touch swipe up / down on mobile
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!isOverlayOpen) {
      const touchEndY = e.touches[0].clientY;
      if (Math.abs(touchStartY - touchEndY) > 30) {
        triggerOpen();
      }
    }
  }, { passive: true });

  // Keyboard Enter/Space
  waxSealBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerOpen();
    }
  });
}


// ==========================================================================
// 2. LIVE COUNTDOWN TIMER
// ==========================================================================
function initCountdown() {
  const daysEl = document.getElementById("timerDays");
  const hoursEl = document.getElementById("timerHours");
  const minutesEl = document.getElementById("timerMinutes");
  const secondsEl = document.getElementById("timerSeconds");

  function updateTimer() {
    const now = new Date().getTime();
    const distance = WEDDING_CONFIG.targetDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}


// ==========================================================================
// 3. FALLING ROSE PETALS CANVAS ANIMATION
// ==========================================================================
function initPetalCanvas() {
  const canvas = document.getElementById("petalsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = Math.min(32, Math.floor(width / 35));
  const petals = [];

  const petalColors = [
    { fill: "rgba(225, 48, 80, 0.65)", stroke: "rgba(180, 20, 50, 0.4)" },
    { fill: "rgba(244, 143, 177, 0.7)", stroke: "rgba(216, 27, 96, 0.35)" },
    { fill: "rgba(255, 182, 193, 0.6)", stroke: "rgba(240, 98, 146, 0.3)" },
    { fill: "rgba(212, 175, 55, 0.55)", stroke: "rgba(170, 124, 17, 0.35)" } // gold stardust petal
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 10 + 10;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationDistance = Math.random() * 20 + 10;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.angle += this.oscillationSpeed;
      this.x += this.speedX + Math.sin(this.angle) * 0.6;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);

      ctx.fillStyle = this.color.fill;
      ctx.fill();
      ctx.strokeStyle = this.color.stroke;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < petalsCount; i++) {
    petals.push(new Petal());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    if (arePetalsActive) {
      for (const p of petals) {
        p.update();
        p.draw();
      }
    }
    requestAnimationFrame(render);
  }
  render();

  // Petal toggle button
  const petalToggleBtn = document.getElementById("petalToggleBtn");
  if (petalToggleBtn) {
    petalToggleBtn.addEventListener("click", () => {
      arePetalsActive = !arePetalsActive;
      petalToggleBtn.classList.toggle("active", arePetalsActive);
      showToast(arePetalsActive ? "🌸 Rose petals shower enabled" : "🌸 Petals paused");
    });
  }
}


// ==========================================================================
// 4. INTERACTIVE CLICK / TAP SPARKLE BURST SYSTEM
// ==========================================================================
function initClickSparkles() {
  const container = document.getElementById("sparkleContainer");
  const cuteEmojis = ["💖", "✨", "🌸", "💍", "💕", "⭐", "🌺"];

  window.addEventListener("click", (e) => {
    // Avoid triggering if clicking on interactive form inputs
    if (["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(e.target.tagName)) return;
    createSparkleBurst(e.clientX, e.clientY, 7);
  });

  window.createSparkleBurst = function(x, y, count = 10) {
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "sparkle-particle";
      particle.textContent = cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80 + 30;
      const dx = `${Math.cos(angle) * distance}px`;
      const dy = `${Math.sin(angle) * distance}px`;

      particle.style.setProperty("--dx", dx);
      particle.style.setProperty("--dy", dy);

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1200);
    }
  };
}


// ==========================================================================
// 5. CONFETTI CELEBRATION ENGINE
// ==========================================================================
let fireConfetti = () => {};

function initConfettiCanvas() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let confettiParticles = [];
  const colors = ["#D4AF37", "#FF4D6D", "#FF758F", "#FFB703", "#721121", "#9D4EDD", "#00B4D8"];

  class Confetti {
    constructor(originX, originY) {
      this.x = originX || width / 2;
      this.y = originY || height * 0.4;
      this.size = Math.random() * 8 + 6;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 5;
      this.gravity = 0.28;
      this.friction = 0.98;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 15;
      this.opacity = 1;
      this.decay = Math.random() * 0.015 + 0.008;
    }

    update() {
      this.vx *= this.friction;
      this.vy = this.vy * this.friction + this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.opacity -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      ctx.restore();
    }
  }

  fireConfetti = function(originX, originY) {
    const count = 100;
    for (let i = 0; i < count; i++) {
      confettiParticles.push(new Confetti(originX, originY));
    }
  };

  function updateConfetti() {
    ctx.clearRect(0, 0, width, height);
    confettiParticles = confettiParticles.filter((p) => p.opacity > 0);
    for (const p of confettiParticles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(updateConfetti);
  }
  updateConfetti();
}


// ==========================================================================
// 6. CALENDAR INTEGRATIONS (GOOGLE & ICAL DOWNLOAD)
// ==========================================================================
function initCalendarIntegrations() {
  const googleBtn = document.getElementById("googleCalBtn");
  const iCalBtn = document.getElementById("iCalBtn");

  // Event Start: Dec 14, 2026, 19:00:00 (13:30:00 UTC)
  // Event End: Dec 14, 2026, 23:30:00 (18:00:00 UTC)
  const title = encodeURIComponent(WEDDING_CONFIG.eventTitle);
  const location = encodeURIComponent(WEDDING_CONFIG.venueAddress);
  const details = encodeURIComponent("You are cordially invited to celebrate the Wedding Reception of Aritra & Srijani on Monday, December 14, 2026 at Taj Garden, Kamalgazi, Garia from 7:00 PM onwards!");

  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261214T133000Z/20261214T180000Z&details=${details}&location=${location}`;
      window.open(googleCalUrl, "_blank");
      showToast("📅 Opening Google Calendar event...");
    });
  }

  if (iCalBtn) {
    iCalBtn.addEventListener("click", () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Aritra and Srijani//Wedding Reception//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "SUMMARY:Wedding Reception of Aritra & Srijani",
        "DESCRIPTION:Celebrate the Wedding Reception of Aritra & Srijani at Taj Garden, Kamalgazi, Garia!",
        "LOCATION:Taj Garden, Kamalgazi, Garia, Kolkata, West Bengal",
        "DTSTART:20261214T133000Z",
        "DTEND:20261214T180000Z",
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "BEGIN:VALARM",
        "TRIGGER:-P1D",
        "ACTION:DISPLAY",
        "DESCRIPTION:Reminder: Aritra & Srijani Wedding Reception Tomorrow!",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "Aritra_Srijani_Wedding_Reception.ics");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("🍏 Apple/Outlook Calendar invitation downloaded!");
    });
  }
}


// ==========================================================================
// 7. GUESTBOOK & RSVP WITH GOOGLE SHEETS APPS SCRIPT INTEGRATION
// ==========================================================================
function initGuestbook() {
  const form = document.getElementById("blessingForm");
  const listEl = document.getElementById("blessingCardsList");
  const countBadge = document.getElementById("blessingCountBadge");
  const stickerBtns = document.querySelectorAll(".sticker-btn");
  const submitBtn = document.getElementById("submitBlessingBtn");

  // Fetch client IP in background
  detectClientIp();

  // Sticker selection
  stickerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      stickerBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSticker = btn.getAttribute("data-sticker") || "💖";
    });
  });

  // Load local storage blessings initially
  let currentBlessings = [];
  try {
    const raw = localStorage.getItem("wedding_blessings_aritra_srijani");
    currentBlessings = raw ? JSON.parse(raw) : initialBlessings;
  } catch (e) {
    currentBlessings = initialBlessings;
  }

  function renderBlessings(blessingsToRender = currentBlessings) {
    if (!listEl) return;
    listEl.innerHTML = "";
    if (countBadge) countBadge.textContent = `${blessingsToRender.length} Wishes`;

    if (blessingsToRender.length === 0) {
      listEl.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding: 20px;">Be the first to send your sweet blessings! 🌸</p>`;
      return;
    }

    blessingsToRender.forEach((item) => {
      const card = document.createElement("div");
      card.className = "guest-blessing-card";
      
      const timeDisplay = item.timestamp || item.time || "Recently";

      card.innerHTML = `
        <div class="guest-card-top">
          <span class="guest-card-name">${escapeHtml(item.name)}</span>
          <span class="guest-card-time">${escapeHtml(timeDisplay)}</span>
        </div>
        <div class="guest-card-status">${escapeHtml(item.status)}</div>
        <div class="guest-card-sticker">${escapeHtml(item.sticker)}</div>
        <div class="guest-card-msg">"${escapeHtml(item.message)}"</div>
      `;
      listEl.appendChild(card);
    });
  }

  // Initial render
  renderBlessings();

  // Fetch live blessings from Google Sheet Apps Script
  fetchLiveBlessingsFromSheet((remoteBlessings) => {
    if (remoteBlessings && remoteBlessings.length > 0) {
      currentBlessings = remoteBlessings;
      try {
        localStorage.setItem("wedding_blessings_aritra_srijani", JSON.stringify(currentBlessings));
      } catch (err) {}
      renderBlessings(currentBlessings);
    }
  });

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("guestName");
      const statusInput = document.getElementById("attendanceStatus");
      const messageInput = document.getElementById("blessingMessage");

      const guestName = nameInput.value.trim();
      const status = statusInput.value;
      const message = messageInput.value.trim();

      if (!guestName || !message) return;

      const deviceType = detectDeviceType();
      const nowFormatted = "Just now";

      const newBlessing = {
        name: guestName,
        status: status,
        sticker: selectedSticker,
        message: message,
        time: nowFormatted,
        timestamp: nowFormatted,
        device: deviceType,
        ip: clientIpAddress,
        userAgent: navigator.userAgent
      };

      // Optimistically add to UI
      currentBlessings.unshift(newBlessing);
      try {
        localStorage.setItem("wedding_blessings_aritra_srijani", JSON.stringify(currentBlessings));
      } catch (err) {}

      renderBlessings(currentBlessings);
      form.reset();

      // Trigger Confetti explosion & Toast
      fireConfetti(window.innerWidth / 2, window.innerHeight * 0.6);
      showToast("🎉 Thank you! Your blessing has been recorded with love!");

      // Save to Google Sheet Apps Script
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="btn-icon">⏳</span> Saving to Sheet...`;
      }

      await saveBlessingToGoogleSheet(newBlessing);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span class="btn-icon">🎉</span> Post Blessing & Trigger Confetti`;
      }
    });
  }

  // Polaroid heart reaction buttons
  document.querySelectorAll(".love-reaction-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const countEl = btn.querySelector(".like-count");
      if (countEl) {
        let count = parseInt(countEl.textContent, 10) || 0;
        countEl.textContent = count + 1;
      }
      btn.style.transform = "scale(1.3)";
      setTimeout(() => (btn.style.transform = ""), 250);
      createSparkleBurst(e.clientX, e.clientY, 8);
    });
  });
}

/**
 * Fetch blessings from Google Sheet Web App
 */
async function fetchLiveBlessingsFromSheet(callback) {
  const url = WEDDING_CONFIG.googleAppsScriptUrl;
  if (!url || url.includes("REPLACE_WITH_YOUR_EXEC_URL")) {
    console.log("ℹ️ Google Apps Script URL not configured yet. Using local storage blessings.");
    return;
  }

  try {
    const res = await fetch(url, { method: "GET", mode: "cors" });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data && data.status === "success" && Array.isArray(data.blessings)) {
      callback(data.blessings);
    }
  } catch (err) {
    console.warn("Could not fetch remote blessings from Google Sheet:", err);
  }
}

/**
 * Send Blessing data to Google Sheet Apps Script
 */
async function saveBlessingToGoogleSheet(blessingData) {
  const url = WEDDING_CONFIG.googleAppsScriptUrl;
  if (!url || url.includes("REPLACE_WITH_YOUR_EXEC_URL")) {
    console.log("ℹ️ Google Sheet not yet connected (Google Apps Script URL is placeholder). Blessing saved locally.");
    return;
  }

  try {
    // Send as text/plain JSON payload to prevent CORS pre-flight block in Google Apps Script Web App
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(blessingData),
      mode: "no-cors"
    });
    console.log("✅ Blessing sent to Google Sheet successfully.");
  } catch (err) {
    console.error("Failed to send blessing to Google Sheet:", err);
  }
}

/**
 * Detect client Device details (OS, Device Category, Browser)
 */
function detectDeviceType() {
  const ua = navigator.userAgent || "";
  let device = "Desktop";
  let os = "Unknown OS";
  let browser = "Browser";

  // Device Form Factor
  if (/iPad|Tablet|PlayBook/i.test(ua)) {
    device = "Tablet";
  } else if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    device = "Mobile";
  }

  // Operating System
  if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  // Browser
  if (/Edg/i.test(ua)) browser = "Edge";
  else if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Firefox/i.test(ua)) browser = "Firefox";

  return `${device} (${os} • ${browser})`;
}

/**
 * Detect Client Public IP Address
 */
async function detectClientIp() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch("https://api.ipify.org?format=json", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.ip) {
        clientIpAddress = data.ip;
      }
    }
  } catch (e) {
    // Fallback attempt
    try {
      const res2 = await fetch("https://api64.ipify.org?format=json");
      const data2 = await res2.json();
      if (data2 && data2.ip) clientIpAddress = data2.ip;
    } catch (err) {
      clientIpAddress = "IP Not Available";
    }
  }
}


// ==========================================================================
// 8. SCROLL PROGRESS COUPLE WALKING TRACKER
// ==========================================================================
function initScrollTracker() {
  const progressBar = document.getElementById("trackerProgress");
  const groomEl = document.getElementById("trackerGroom");
  const brideEl = document.getElementById("trackerBride");
  const heartEl = document.getElementById("trackerHeart");
  const mergedEl = document.getElementById("trackerMerged");

  if (mergedEl) {
    mergedEl.addEventListener("click", () => {
      showToast("💖 #ARISRI — Together Forever & Always! ✨");
    });
  }

  function updateTracker() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    if (progressBar) progressBar.style.width = `${scrollPercent}%`;

    // Merge threshold where couple meets
    const mergeThreshold = 92;

    if (scrollPercent < mergeThreshold) {
      const progress = scrollPercent / mergeThreshold; // 0 to 1
      // Walks from 0% to ~48% towards the center
      const posPercent = progress * 48;

      if (groomEl) {
        groomEl.style.opacity = "1";
        groomEl.style.left = `${posPercent.toFixed(2)}%`;
        groomEl.style.transform = `translateX(-${(progress * 50).toFixed(1)}%) scale(1)`;
      }

      if (brideEl) {
        brideEl.style.opacity = "1";
        brideEl.style.right = `${posPercent.toFixed(2)}%`;
        brideEl.style.transform = `translateX(${(progress * 50).toFixed(1)}%) scale(1)`;
      }

      if (heartEl) {
        heartEl.style.opacity = `${(0.3 + progress * 0.7).toFixed(2)}`;
        heartEl.style.transform = `translateX(-50%) scale(${(0.9 + progress * 0.35).toFixed(2)})`;
      }

      if (mergedEl) {
        mergedEl.style.opacity = "0";
        mergedEl.style.transform = "translateX(-50%) scale(0.6)";
        mergedEl.style.pointerEvents = "none";
      }
    } else {
      // Merged #ARISRI celebration state when matched at bottom
      if (groomEl) {
        groomEl.style.opacity = "0";
        groomEl.style.left = "48%";
        groomEl.style.transform = "translateX(-50%) scale(0.4)";
      }

      if (brideEl) {
        brideEl.style.opacity = "0";
        brideEl.style.right = "48%";
        brideEl.style.transform = "translateX(50%) scale(0.4)";
      }

      if (heartEl) {
        heartEl.style.opacity = "0";
      }

      if (mergedEl) {
        mergedEl.style.opacity = "1";
        mergedEl.style.transform = "translateX(-50%) scale(1.08)";
        mergedEl.style.pointerEvents = "auto";
      }
    }
  }

  window.addEventListener("scroll", updateTracker, { passive: true });
  window.addEventListener("resize", updateTracker, { passive: true });
  updateTracker();
}


// ==========================================================================
// 9. AMBIENT ROMANTIC HARP/MELODY SYNTHESIZER
// ==========================================================================
let audioCtx = null;
let melodyInterval = null;

function initMusicController() {
  const musicBtn = document.getElementById("musicToggleBtn");
  if (!musicBtn) return;

  musicBtn.addEventListener("click", () => {
    if (!isAudioPlaying) {
      startRomanticMelody();
      isAudioPlaying = true;
      musicBtn.classList.add("active");
      showToast("🎵 Soft romantic ambient melody playing...");
    } else {
      stopRomanticMelody();
      isAudioPlaying = false;
      musicBtn.classList.remove("active");
      showToast("🎵 Music paused");
    }
  });
}

function startRomanticMelody() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  // Romantic pentatonic dream chords (C Major 9, F Major 7, A Minor 7, G sus4)
  const notes = [
    261.63, 329.63, 392.00, 493.88, 523.25, // C4, E4, G4, B4, C5
    349.23, 440.00, 523.25, 659.25,         // F4, A4, C5, E5
    220.00, 261.63, 329.63, 392.00, 440.00, // A3, C4, E4, G4, A4
    196.00, 293.66, 392.00, 440.00, 587.33  // G3, D4, G4, A4, D5
  ];

  let noteIdx = 0;
  playPluckNote(notes[0]);

  melodyInterval = setInterval(() => {
    noteIdx = (noteIdx + 1) % notes.length;
    playPluckNote(notes[noteIdx]);
  }, 750);
}

function stopRomanticMelody() {
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
}

function playPluckNote(freq) {
  if (!audioCtx || audioCtx.state !== "running") return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Subtle gentle acoustic harp envelope
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.09, audioCtx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.7);
  } catch (err) {}
}

function playHarpChime() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  const chimeNotes = [523.25, 659.25, 783.99, 1046.50];
  chimeNotes.forEach((f, idx) => {
    setTimeout(() => playPluckNote(f), idx * 90);
  });
}


// ==========================================================================
// 10. SHARE & CLIPBOARD FEATURES
// ==========================================================================
function initShareFeatures() {
  const copyAddressBtn = document.getElementById("copyAddressBtn");
  const shareWhatsAppBtn = document.getElementById("shareWhatsAppBtn");
  const shareLinkBtn = document.getElementById("shareLinkBtn");

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener("click", () => {
      copyToClipboard(WEDDING_CONFIG.venueAddress);
      showToast("📋 Venue Address copied to clipboard!");
    });
  }

  if (shareWhatsAppBtn) {
    shareWhatsAppBtn.addEventListener("click", () => {
      const text = encodeURIComponent(
        `💍 *Wedding Reception Invitation* 💍\n\n` +
        `Dear Friends & Family,\n` +
        `You are cordially invited to celebrate the Wedding Reception of *Aritra & Srijani*!\n\n` +
        `📅 *Date:* Monday, 14th December 2026\n` +
        `⏰ *Time:* 7:00 PM Onwards\n` +
        `📍 *Venue:* Taj Garden, Kamalgazi, Garia\n` +
        `🗺️ *Google Maps:* ${WEDDING_CONFIG.googleMapsUrl}\n\n` +
        `✨ Open our interactive invitation card here:\n${window.location.href}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    });
  }

  if (shareLinkBtn) {
    shareLinkBtn.addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({
          title: WEDDING_CONFIG.eventTitle,
          text: `Wedding Reception of Aritra & Srijani on Dec 14, 2026 at Taj Garden, Garia.`,
          url: window.location.href
        }).catch(() => {});
      } else {
        copyToClipboard(window.location.href);
        showToast("🔗 Invitation link copied to clipboard!");
      }
    });
  }
}


// ==========================================================================
// 11. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================================================
function initScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((r) => r.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}


// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================
function showToast(msg) {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMsg");
  if (!toast || !msgEl) return;

  msgEl.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }
}

function escapeHtml(string) {
  const div = document.createElement("div");
  div.textContent = string;
  return div.innerHTML;
}
