const tips = [
  "VestCity to serwer RolePlay w FiveM. Łączymy klimat miejskiej rozgrywki z dobrymi zasadami i społecznością.",
  "Na VestCity ballasy ssą kutasy i tyle w temacie jebac policje i sądy tylko bug nas moze sądzic.",
  "Pamiętaj: szanuj innych graczy i zasady serwera. Jakość RolePlay zależy od każdego z nas.",
  "Discord, TikTok i inne social media znajdziesz po prawej stronie ekranu. Do zobaczenia na serwerze!",
  "Muzykę możesz włączyć lub wyłączyć klawiszem SPACJA. Głośność ustawisz paskiem na dole ekranu."
];

function highlightVestCity(text) {
  return text.replace(/\bVestCity\b/gi, '<span class="highlight">VestCity</span>');
}

let tipIndex = 0;
const tipEl = document.getElementById("tip-text");
if (tipEl) {
  tipEl.innerHTML = highlightVestCity(tips[0]);
  setInterval(() => {
    tipEl.classList.remove("fade-in");
    tipEl.classList.add("fade-out");
    setTimeout(() => {
      tipIndex = (tipIndex + 1) % tips.length;
      tipEl.innerHTML = highlightVestCity(tips[tipIndex]);
      tipEl.classList.remove("fade-out");
      tipEl.classList.add("fade-in");
    }, 400);
  }, 6000);
}

const loadingTexts = [
  "Pobieranie zasobów serwera...",
  "Ładowanie skryptów...",
  "Pobieranie danych postaci...",
  "Synchronizacja z bazą...",
  "Przygotowywanie świata..."
];

let loadIndex = 0;
const loadingEl = document.getElementById("loading-text");
if (loadingEl) {
  setInterval(() => {
    loadingEl.classList.remove("status-in");
    loadingEl.classList.add("status-out");
    setTimeout(() => {
      loadIndex = (loadIndex + 1) % loadingTexts.length;
      loadingEl.textContent = loadingTexts[loadIndex];
      loadingEl.classList.remove("status-out");
      loadingEl.classList.add("status-in");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => loadingEl.classList.remove("status-in"));
      });
    }, 400);
  }, 4500);
}

const music = document.getElementById("bg-music");
const musicDesc = document.getElementById("music-desc");
let musicPaused = true;

function updateMusicHint() {
  if (!musicDesc) return;
  if (musicPaused) {
    musicDesc.innerHTML = 'Muzyka wyłączona. Kliknij <span class="highlight">SPACJĘ</span>, aby włączyć.';
  } else {
    musicDesc.innerHTML = 'Muzyka włączona. Kliknij <span class="highlight">SPACJĘ</span>, aby wyłączyć.';
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    musicPaused = !musicPaused;
    if (musicPaused) music.pause();
    else music.play();
    updateMusicHint();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") e.preventDefault();
});

let volume = 100;
const volumeBar = document.getElementById("volume-bar");
const volumeFill = document.getElementById("volume-fill");
const volumePct = document.getElementById("volume-pct");

function setVolume(pct) {
  volume = Math.max(0, Math.min(100, pct));
  if (volumeFill) volumeFill.style.width = volume + "%";
  if (volumePct) volumePct.textContent = Math.round(volume) + "%";
  if (music) music.volume = volume / 100;
}

if (volumeBar && volumeFill && volumePct && music) {
  setVolume(100);
  music.volume = 1;

  volumeBar.addEventListener("click", (e) => {
    const rect = volumeBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setVolume(pct);
  });
}

updateMusicHint();
