import {
  lookupVehicleByPlate,
  INITIAL_KSEF_INVOICES,
  INITIAL_DELEGATIONS
} from "./data.js";

let _renderAll = () => {};
export function registerRenderAll(fn) { _renderAll = fn; }

const state = {
  screen: "hub",
  context: "obywatel",
  offlineMode: false,
  seniorMode: false,
  contrastByMode: (() => {
    try { return localStorage.getItem("contrast-by") === "1"; } catch { return false; }
  })(),
  aiOptIn: true,
  mfirmaTab: "ksef",
  doreczeniaBox: "firma",
  ksefInvoices: [...INITIAL_KSEF_INVOICES],
  delegations: INITIAL_DELEGATIONS.map(d => ({ ...d })),
  carRole: "buyer",
  p2pVehicleTab: "plate",
  selectedVehicle: lookupVehicleByPlate("GD 4829X"),
  contractPrice: 34500,
  contractMileage: 84210,
  expandedDocId: "mdowod",
  selectedChildId: "zosia",
  showChildData: true,
  showMdowodData: false,
  peselLocked: true,
  servicesQuery: "",
  callerIsSpoof: true,
  callerReported: false,
  kwAlertEnabled: true,
  mortgageCleared: false,
  pensionPlus2Y: false,
  bizPkdDesc: "Usługi programistyczne i doradztwo IT",
  bizCreated: false,
  scanDoc: {
    templateId: "oswiadczenie",
    uploadedImageUrl: null,
    uploadedFileName: null,
    sigDataUrl: null,
    sigX: 148,
    sigY: 128,
    pzSigned: false,
    sentStatus: null
  },
  tourStep: 0,
  tourOpen: false,
  chatMessages: [
    { role: "user", text: "Kupiłem używane auto — czy muszę iść do urzędu skarbowego i wydziału komunikacji?" },
    {
      role: "ai",
      text: "Załatwisz oba urzędy i OC jednym podpisem w telefonie: zeskanuj papierową umowę albo wygeneruj cyfrową umowę P2P z drugą osobą. Zachowując tablice UE, oszczędzisz 93,50 zł."
    }
  ]
};

const ICONS = {
  hospital: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" stroke-width="1.9"/><path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  car: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 14L6 8.5C6.5 7 7.8 6 9.3 6H14.7C16.2 6 17.5 7 18 8.5L20 14M4 14H20V18H18V16H6V18H4V14Z" stroke="currentColor" stroke-width="1.85" stroke-linejoin="round"/><circle cx="7.5" cy="12" r="1" fill="currentColor"/><circle cx="16.5" cy="12" r="1" fill="currentColor"/></svg>`,
  doc: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 3H14L19 8V20C19 20.6 18.6 21 18 21H7C6.4 21 6 20.6 6 20V4C6 3.4 6.4 3 7 3Z" stroke="currentColor" stroke-width="1.85" stroke-linejoin="round"/><path d="M9 12H15M9 16H13" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/></svg>`,
  layers: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L21 8L12 13L3 8L12 3Z" stroke="currentColor" stroke-width="1.85" stroke-linejoin="round"/><path d="M3 13L12 18L21 13" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shield: `<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3L19 6.5V12C19 16.5 16 20 12 21.5C8 20 5 16.5 5 12V6.5L12 3Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`,
  moon: `<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`,
  search: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.9"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  mic: `<svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" stroke-width="1.9"/><path d="M5 11C5 14.9 8.1 18 12 18C15.9 18 19 14.9 19 11M12 18V21" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  briefcase: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2.5" stroke="currentColor" stroke-width="1.85"/><path d="M9 7V5C9 4 9.9 3 11 3H13C14.1 3 15 4 15 5V7" stroke="currentColor" stroke-width="1.85"/></svg>`,
  heart: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 20S4 14.5 4 9.5C4 6.8 6.1 5 8.5 5C10.1 5 11.4 5.9 12 7.1C12.6 5.9 13.9 5 15.5 5C17.9 5 20 6.8 20 9.5C20 14.5 12 20 12 20Z" stroke="currentColor" stroke-width="1.85" stroke-linejoin="round"/></svg>`,
  baby: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.85"/><circle cx="9.5" cy="11" r="1" fill="currentColor"/><circle cx="14.5" cy="11" r="1" fill="currentColor"/><path d="M9.5 14.5C10.8 15.7 13.2 15.7 14.5 14.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  phone: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.5 4H10L11.5 8.5L9.5 10C10.7 12.4 12.6 14.3 15 15.5L16.5 13.5L21 15V18.5C21 19.6 20.1 20.5 19 20.5C10.7 20 4 13.3 3.5 5C3.5 3.9 4.4 3 5.5 3H6.5V4Z" stroke="currentColor" stroke-width="1.85" stroke-linejoin="round"/></svg>`,
  home: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3L21 10.5V20H15V14H9V20H3V10.5Z" stroke="currentColor" stroke-width="1.85" stroke-linejoin="round"/></svg>`,
  chart: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19H20M8 15V11M13 15V8M18 15V6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  scanSign: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7V5C4 3.9 4.9 3 6 3H9M15 3H18C19.1 3 20 3.9 20 5V7M20 17V19C20 20.1 19.1 21 18 21H15M9 21H6C4.9 21 4 20.1 4 19V17" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/><path d="M8 13C9.5 10.5 11.2 14.5 13 11.5C14 10 15 13 16.5 12" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  contrast: `<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 3A9 9 0 0 1 12 21V3Z" fill="currentColor"/></svg>`
};

const SCREEN_NOTES = {
  hub: {
    title: "Calm UI 2026: Zero duplikatów, Dark Mode i PWA",
    body: "Brak powielonych przycisków, spójne ikony SVG, Tryb Ciemny 1-klikiem oraz pełnoekranowy manifest PWA na smartfon podczas prezentacji w Sejmie RP.",
    bench: "Benchmark: GOV.UK Plain Language + Apple Calm UI + Revolut 10 + Diia"
  },
  mfirma: {
    title: "Tryb mFirma — KSeF, e-Doręczenia, Uprawnienia i Start firmy",
    body: "Kompletny kokpit JDG i zarządów: powiadomienia FA(3) z załącznikami, tarcza 14 dni ADE, delegacje Corppass na NIP biura oraz 1-Okienko rejestracji firmy (CEIDG + VAT-R + ZUS + KSeF).",
    bench: "Benchmark: App IO + SEND (Włochy) + Corppass + Diia e-Entrepreneur"
  },
  caller_shield: {
    title: "Tarcza „Kto dzwoni?” — Koniec oszustw na bank i Policję",
    body: "Każdy bank, Policja lub urząd może wywołać weryfikację kryptograficzną do mObywatela. Jeśli oszust podmienia numer (spoofing), obywatel dostaje czerwony alarm i 1-klik zgłoszenie do CERT Polska.",
    bench: "Benchmark: Gov.pl Anty-Spoofing + Singpass Verified Caller"
  },
  kw: {
    title: "Księgi Wieczyste 2.0 — Alert KW i wykreślenie hipoteki",
    body: "Rozwiązywanie luki z audytu XI 2026: zamiast płacić 30 zł za odpis, obywatel ma bezpłatny podgląd KW, Alert KW przed kradzieżą mieszkania oraz cyfrowe wykreślenie hipoteki z banku do sądu.",
    bench: "Benchmark: e-Sądy / EKW + Eesti Kinnistusraamat"
  },
  pension: {
    title: "Moja Emerytura 360° — 4 filary w jednym widoku",
    body: "ZUS, PPK, OFE oraz IKE/IKZE połączone w jeden przejrzysty widok z prognozą miesięcznej wypłaty „na rękę” (realizacja zapowiedzi integracji z 2025/2026).",
    bench: "Benchmark: Szwecja (MinPension) + Dania (PensionsInfo)"
  },
  auto_choice: {
    title: "mTransakcja Pojazd — 2 jasne ścieżki bez urzędu",
    body: "Kupujący i sprzedający wybierają w sekundę: skan papierowej umowy offline albo cyfrowa umowa P2P po skanie mObywatela i tablicy.",
    bench: "Benchmark: Diia (22% umów online) + art. 73 ust. 1a PoRD"
  },
  auto_p2p: {
    title: "Generator Umowy P2P: Skan mObywatela + Tablica lub mPojazd",
    body: "Weryfikacja w PESEL chroni przed zakupem auta na słupa, a wpisanie tablicy pobiera CEPiK/UFG i oszczędza 93,50 zł na tablicach UE.",
    bench: "Benchmark: Diia + ePłatności BGK + CEPiK / UFG"
  },
  auto_scan: {
    title: "Skaner Papierowej Umowy (Bielik-Vision w telefonie)",
    body: "Lokalny OCR odczytuje VIN, kwotę i datę bez wysyłania zdjęcia poza urządzenie.",
    bench: "Benchmark: Bielik-Vision On-Device + CEPiK"
  },
  hospital: {
    title: "Szpital i SOR w 5 s — jeden wyraźny alert medyczny",
    body: "Tylko alergia na penicylinę ma czerwony pasek ostrzegawczy, żeby lekarz widział ją natychmiast bez szumu wizualnego.",
    bench: "Benchmark: Singpass Myinfo + IKP (P1) + art. 26 ust. 1 UPP"
  },
  zero_hub: {
    title: "Usługi bez formularzy + Wyszukiwarka na żywo",
    body: "Wyszukiwarka na górze zakładki natychmiast filtruje 9 usług życiowych (w tym Tarczę „Kto dzwoni?”, KW 2.0 i Emeryturę 360°).",
    bench: "Benchmark: Eesti Life Events + Myinfo PL API"
  },
  translator: {
    title: "Pismo z urzędu wyjaśnione w 3 prostych punktach",
    body: "Zamienia niezrozumiałe pismo z ZUS/US na jasną odpowiedź w 3 punktach na bazie PUE ZUS.",
    bench: "Benchmark: PLLuM-12B-Gov + RAG ISAP"
  },
  znak: {
    title: "Dokumenty (Stos Kart) + Żywy zegar i hologram RP",
    body: "Tykający zegar co do sekundy i mieniący się hologram RP potwierdzają autentyczność na żywo, a stos kart i Znak 18+ ZKP mieszczą się w jednym czystym widoku.",
    bench: "Benchmark: Apple Wallet + France Identité (ZKP) + EUDI Wallet"
  },
  dzieci_id: {
    title: "Dowody dzieci w telefonie rodzica (mDowód + mLegitymacja + IKP)",
    body: "Automatyczne powiązanie małoletnich dzieci z Rejestru PESEL (władza rodzicielska): mDowód dziecka, mLegitymacja szkolna (37% PKP), karta alergii IKP na SOR oraz cyfrowa zgoda na wyjazd lub odbiór dziecka.",
    bench: "Benchmark: Diia (Świadectwo i dokument dziecka) + Rejestr PESEL / SIO / IKP"
  },
  tracker: {
    title: "Ślad Danych (Data Tracker) i tryb prywatności AI",
    body: "Czerwony pasek wyróżnia wyłącznie nietypowe odpytanie PESEL poza godzinami aktywności obywatela.",
    bench: "Benchmark: Estonia (Andmejälgija) + PLLuM 2.0"
  },
  senior: {
    title: "Tryb Seniora WCAG AAA + e-Pełnomocnik Rodzinny",
    body: "Kontrast >7.5:1, przyciski >=58 px oraz bezpieczny podgląd sprawy dla bliskiego bez podawania PIN-u.",
    bench: "Benchmark: WCAG 2.2 AA/AAA"
  },
  doc_scan_sign: {
    title: "Skaner PDF + Podpis odręczny i Profil Zaufany + Wyślij do",
    body: "Skanuje papierowy dokument lub zdjęcie A4, pozwala złożyć podpis ręczny w dowolnym miejscu kartki, pieczętuje Profilem Zaufanym, generuje prawdziwy plik .pdf i wysyła przez e-Doręczenia, e-mail lub do biura.",
    bench: "Benchmark: eIDAS 2.0 + Apple Markup + Profil Zaufany ePUAP"
  },
  contrast_by: {
    title: "Tryb Wysokiego Kontrastu Czarno-Żółty (WCAG AAA)",
    body: "Czysta czerń #000000 i intensywna żółć #FFD600 (>16:1 kontrastu), wyraźne żółte kafelki akcji i obrysy kart dla osób słabowidzących oraz w pełnym słońcu.",
    bench: "Benchmark: WCAG 2.2 AAA + Contrast Mode (Black & Yellow)"
  }
};

const screenEl = document.getElementById("screen-body");
const dialogEl = document.getElementById("app-dialog");
const dialogTitleEl = document.getElementById("dialog-title");
const dialogContentEl = document.getElementById("dialog-content");
const liveAnnouncer = document.getElementById("live-announcer");
const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const tourPopover = document.getElementById("jury-tour-popover");

/* Two-state dark mode toggle (modern-web-guidance: dark-mode-toggle) */
function isCurrentlyDark() {
  const val = colorSchemeMeta ? colorSchemeMeta.content : "light dark";
  if (val === "dark") return true;
  if (val === "light") return false;
  return darkQuery.matches;
}

function updateThemeControls() {
  const dark = isCurrentlyDark();
  const simDarkBtn = document.getElementById("btn-sim-dark");
  if (simDarkBtn) {
    simDarkBtn.setAttribute("aria-pressed", String(dark));
    simDarkBtn.textContent = dark ? "☀️ Przełącz na motyw Jasny" : "🌙 Przełącz motyw Jasny / Ciemny";
  }
  const hubThemeBtn = document.getElementById("btn-hub-theme");
  if (hubThemeBtn) {
    hubThemeBtn.setAttribute("aria-pressed", String(dark));
    hubThemeBtn.setAttribute("aria-label", dark ? "Przełącz na motyw jasny" : "Przełącz na motyw ciemny");
  }
  const simContrastBtn = document.getElementById("btn-sim-contrast-by");
  if (simContrastBtn) simContrastBtn.setAttribute("aria-pressed", String(state.contrastByMode));
  const hubContrastBtn = document.getElementById("btn-hub-contrast");
  if (hubContrastBtn) {
    hubContrastBtn.setAttribute("aria-pressed", String(state.contrastByMode));
    hubContrastBtn.setAttribute("aria-label", state.contrastByMode ? "Wyłącz kontrast czarno-żółty" : "Włącz kontrast czarno-żółty");
  }
  const senContrastBtn = document.getElementById("btn-senior-contrast");
  if (senContrastBtn) senContrastBtn.setAttribute("aria-pressed", String(state.contrastByMode));
}

function toggleContrastByMode(forceVal) {
  state.contrastByMode = typeof forceVal === "boolean" ? forceVal : !state.contrastByMode;
  try {
    if (state.contrastByMode) localStorage.setItem("contrast-by", "1");
    else localStorage.removeItem("contrast-by");
  } catch {}
  announce(state.contrastByMode ? "Włączono czarno-żółty tryb wysokiego kontrastu" : "Wyłączono tryb wysokiego kontrastu");
  _renderAll();
}

function toggleColorScheme() {
  const currentlyDark = isCurrentlyDark();
  const target = currentlyDark ? "light" : "dark";
  const systemScheme = darkQuery.matches ? "dark" : "light";
  let stored = "light dark";

  try {
    if (target !== systemScheme) {
      localStorage.setItem("color-scheme", target);
      stored = target;
    } else {
      localStorage.removeItem("color-scheme");
      stored = "light dark";
    }
  } catch {
    stored = target;
  }

  if (colorSchemeMeta) colorSchemeMeta.content = stored;
  announce(target === "dark" ? "Włączono tryb ciemny" : "Włączono tryb jasny");
  updateThemeControls();
}

window.addEventListener("storage", (e) => {
  if (e.key === "color-scheme" && colorSchemeMeta) {
    colorSchemeMeta.content = e.newValue === "dark" || e.newValue === "light" ? e.newValue : "light dark";
    updateThemeControls();
  }
});
darkQuery.addEventListener("change", () => updateThemeControls());

/* Live clock tick for mDowód hologram bar */
function formatLiveClock() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss} · 26.11.2026`;
}
setInterval(() => {
  const el = document.getElementById("mdowod-live-clock");
  if (el) el.textContent = formatLiveClock();
}, 1000);

if (dialogEl && !("closedBy" in HTMLDialogElement.prototype)) {
  dialogEl.addEventListener("click", (event) => {
    if (event.target !== dialogEl) return;
    const rect = dialogEl.getBoundingClientRect();
    const isDialogContent = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );
    if (!isDialogContent) dialogEl.close();
  });
}
document.getElementById("dialog-close-btn").addEventListener("click", () => dialogEl.close());

function announce(msg) {
  if (liveAnnouncer) liveAnnouncer.textContent = msg;
}

function openModal(title, html) {
  dialogTitleEl.textContent = title;
  dialogContentEl.innerHTML = html;
  dialogEl.showModal();
}

function navigateTo(targetScreen, direction = "forward") {
  const updateDOM = () => {
    if (targetScreen === "dzieci_id") {
      state.expandedDocId = "dzieci";
      state.screen = "znak";
    } else {
      state.screen = targetScreen;
    }
    state.context = state.screen === "mfirma" ? "mfirma" : "obywatel";
    _renderAll();
    screenEl.scrollTop = 0;
  };

  if (!document.startViewTransition) {
    updateDOM();
    return;
  }
  try {
    document.startViewTransition({
      update: updateDOM,
      types: [direction]
    });
  } catch {
    document.startViewTransition(updateDOM);
  }
}

function updateShellChrome() {
  const titles = {
    hub: "Start",
    mfirma: "mFirma — KSeF, e-Doręczenia i Start firmy",
    caller_shield: "Tarcza Kto dzwoni?",
    kw: "Księgi Wieczyste 2.0",
    pension: "Moja Emerytura 360°",
    auto_choice: "Kupno i sprzedaż auta",
    auto_p2p: "Umowa cyfrowa P2P",
    auto_scan: "Skan papierowej umowy",
    auto_bundle: "Opłaty i rejestracja 3 w 1",
    auto_done: "Gotowe — potwierdzenie UPO",
    hospital: "Szpital i SOR w 5 sekund",
    hospital_done: "Przekazano do szpitala",
    zero_hub: "Usługi bez formularzy",
    crash: "mStłuczka 2.0 Offline i UE",
    job: "Pierwszy dzień w pracy",
    bereave: "Wsparcie po stracie",
    birth: "Narodziny dziecka",
    translator: "Pismo z urzędu w 3 pkt",
    znak: "Dokumenty i mWiek 18+",
    tracker: "Ślad Danych i prywatność AI",
    assistant: "Asystent mObywatel",
    senior: "Tryb Seniora WCAG AAA",
    doc_scan_sign: "Skanuj i podpisz dokument"
  };
  document.title = `${titles[state.screen] || "mObywatel"} | mObywatel 3.0 AI — Wersja 2.0`;

  document.body.classList.toggle("senior-mode", state.seniorMode || state.screen === "senior");
  document.body.classList.toggle("contrast-by-mode", state.contrastByMode);
  updateThemeControls();

  const ctxCit = document.getElementById("ctx-citizen");
  const ctxBiz = document.getElementById("ctx-business");
  const isBiz = state.context === "mfirma";
  ctxCit.classList.toggle("is-selected", !isBiz);
  ctxCit.setAttribute("aria-pressed", String(!isBiz));
  ctxBiz.classList.toggle("is-selected", isBiz);
  ctxBiz.setAttribute("aria-pressed", String(isBiz));

  const hasNewKsef = state.ksefInvoices.some(i => i.status === "new" || i.status === "flagged");
  document.getElementById("ksef-unread-dot").hidden = !hasNewKsef;

  const netPill = document.getElementById("net-status-pill");
  netPill.textContent = state.offlineMode ? "Offline ✓" : "5G · Online";
  netPill.classList.toggle("is-offline", state.offlineMode);
  document.getElementById("offline-banner").hidden = !state.offlineMode;

  document.getElementById("btn-sim-offline").setAttribute("aria-pressed", String(state.offlineMode));
  document.getElementById("btn-sim-senior").setAttribute("aria-pressed", String(state.seniorMode));

  const zeroScreens = ["zero_hub", "doc_scan_sign", "caller_shield", "kw", "pension", "auto_choice", "auto_p2p", "auto_scan", "auto_bundle", "auto_done", "hospital", "hospital_done", "crash", "job", "bereave", "birth", "translator"];
  for (const btn of document.querySelectorAll(".tab-item")) {
    const active =
      (btn.dataset.nav === "hub" && state.screen === "hub") ||
      (btn.dataset.nav === "znak" && state.screen === "znak") ||
      (btn.dataset.nav === "assistant" && state.screen === "assistant") ||
      (btn.dataset.nav === "zero_hub" && zeroScreens.includes(state.screen));
    btn.classList.toggle("is-active", active);
  }

  for (const fbtn of document.querySelectorAll(".flow-btn")) {
    const active = fbtn.dataset.flow === "contrast_by"
      ? (state.contrastByMode && state.screen === "hub")
      : fbtn.dataset.flow === "dzieci_id"
        ? (state.screen === "znak" && state.expandedDocId === "dzieci")
        : fbtn.dataset.flow === "znak"
          ? (state.screen === "znak" && state.expandedDocId !== "dzieci")
          : (fbtn.dataset.flow === state.screen && !(state.contrastByMode && state.screen === "hub"));
    fbtn.classList.toggle("is-active", active);
  }

  const noteKey = (state.contrastByMode && state.screen === "hub")
    ? "contrast_by"
    : (state.screen === "znak" && state.expandedDocId === "dzieci")
      ? "dzieci_id"
      : (SCREEN_NOTES[state.screen] ? state.screen : (state.screen.startsWith("auto_") ? "auto_p2p" : "zero_hub"));
  const note = SCREEN_NOTES[noteKey] || SCREEN_NOTES.hub;
  document.getElementById("note-title").textContent = note.title;
  document.getElementById("note-body").textContent = note.body;
  document.getElementById("note-benchmark").textContent = note.bench;
}

function wireAccessibleTabs(root) {
  const tablist = root.querySelector('[role="tablist"]');
  if (!tablist) return;
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];

  const activateTab = (selectedTab, focusIt = false) => {
    for (const tab of tabs) {
      const isSel = tab === selectedTab;
      tab.setAttribute("aria-selected", String(isSel));
      tab.toggleAttribute("focusgroupstart", isSel);
      tab.tabIndex = isSel ? 0 : -1;
    }
    for (const panel of panels) {
      const isMatch = panel.getAttribute("aria-labelledby") === selectedTab.id;
      if (isMatch) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "until-found");
    }
    if (focusIt) selectedTab.focus();
    selectedTab.scrollIntoView({ block: "nearest", inline: "nearest" });
    if (selectedTab.dataset.tabkey) {
      if (state.screen === "mfirma") state.mfirmaTab = selectedTab.dataset.tabkey;
      if (state.screen === "auto_p2p") state.p2pVehicleTab = selectedTab.dataset.tabkey;
    }
  };

  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => activateTab(tab, false));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const nextIdx = e.key === "ArrowRight" ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
        activateTab(tabs[nextIdx], true);
      }
    });
  });

  panels.forEach((panel) => {
    panel.addEventListener("beforematch", () => {
      const owner = tabs.find(t => t.id === panel.getAttribute("aria-labelledby"));
      if (owner) activateTab(owner, false);
    });
  });
}


export {
  state,
  ICONS,
  SCREEN_NOTES,
  screenEl,
  dialogEl,
  dialogTitleEl,
  dialogContentEl,
  liveAnnouncer,
  tourPopover,
  isCurrentlyDark,
  updateThemeControls,
  toggleContrastByMode,
  toggleColorScheme,
  formatLiveClock,
  announce,
  openModal,
  navigateTo,
  updateShellChrome,
  wireAccessibleTabs
};
