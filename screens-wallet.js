import {
  CHILDREN_DOCUMENTS,
  DATA_TRACKER_LOGS,
  SCANNED_DOC_TEMPLATES,
  WALLET_DOCUMENTS
} from "./data.js";
import { ICONS, formatLiveClock, state } from "./core.js";
import { renderPromptPill } from "./screens-main.js";

function renderWalletEmblem(emblem) {
  if (emblem === "seal") {
    return `
      <span class="wallet-emblem wallet-emblem--seal" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2.5L18.5 5.5V12C18.5 16.4 15.6 20 12 21.5C8.4 20 5.5 16.4 5.5 12V5.5L12 2.5Z" fill="#dc143c"/>
          <path d="M9.5 10.5L12 7.5L14.5 10.5L13.5 16.5H10.5L9.5 10.5Z" fill="#ffffff"/>
          <circle cx="12" cy="7" r="1.3" fill="#ffffff"/>
        </svg>
      </span>
    `;
  }
  if (emblem === "eagle") {
    return `
      <span class="wallet-emblem" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L17 6V12C17 16 14.8 19.2 12 20.5C9.2 19.2 7 16 7 12V6L12 3Z" fill="rgba(255,255,255,0.22)" stroke="#ffffff" stroke-width="1.6"/>
          <path d="M9.5 10.5L12 8L14.5 10.5L13.5 15.5H10.5L9.5 10.5Z" fill="#ffffff"/>
        </svg>
      </span>
    `;
  }
  if (emblem === "eu_pl") {
    return `
      <span class="wallet-emblem" aria-hidden="true">
        <span style="border:1.5px dashed rgba(255,255,255,0.75);border-radius:999px;inline-size:24px;block-size:24px;display:grid;place-items:center;font-size:9px">PL</span>
      </span>
    `;
  }
  if (emblem === "kids") {
    return `
      <span class="wallet-emblem" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="2.5" stroke="#ffffff" stroke-width="1.7"/>
          <circle cx="15.5" cy="9" r="2.1" stroke="#ffffff" stroke-width="1.7"/>
          <path d="M5 17.5C5.3 14.5 7 13 9 13C11 13 12.7 14.5 13 17.5M12.5 17.5C12.8 15.2 14 14 15.5 14C17 14 18.2 15.2 18.5 17.5" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round"/>
        </svg>
      </span>
    `;
  }
  return `
    <span class="wallet-emblem" aria-hidden="true" style="background:linear-gradient(135deg,rgba(255,255,255,0.28),rgba(236,72,153,0.45))">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8.5" r="2.3" fill="#fde047"/>
        <circle cx="15" cy="9" r="2" fill="#f9a8d4"/>
        <path d="M5.5 17C5.5 14.5 7.2 13 9 13C10.8 13 12.5 14.5 12.5 17M12 17C12 14.9 13.4 13.5 15 13.5C16.6 13.5 18 14.9 18 17" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </span>
  `;
}

function renderZnak() {
  const cardsHtml = WALLET_DOCUMENTS.map((doc) => {
    const isExpanded = state.expandedDocId === doc.id;
    const carDecor = doc.id === "pojazdy"
      ? `<svg class="wallet-car-peek" aria-hidden="true" width="118" height="32" viewBox="0 0 118 32" fill="none">
           <path d="M8 31C14 14 28 5 49 4H79C96 4 108 13 114 31H8Z" fill="#e2e8f0" fill-opacity="0.72" stroke="#ffffff" stroke-opacity="0.85" stroke-width="2"/>
           <path d="M23 27C28 15 39 10 53 9H75C87 9 96 15 101 27H23Z" fill="#475569" fill-opacity="0.55"/>
         </svg>`
      : "";

    let bodyHtml = "";
    if (doc.id === "mdowod") {
      const dataToggleLabel = state.showMdowodData ? "Ukryj dane" : "Pokaż dane";
      bodyHtml = `
        <div class="wallet-card__body" ${isExpanded ? "" : "hidden"}>
          <div class="mdowod-live-bar">
            <span class="mdowod-live-time">
              <span class="mdowod-live-dot" aria-hidden="true"></span>
              <span id="mdowod-live-clock">${formatLiveClock()}</span>
            </span>
            <span class="mdowod-holo-badge" id="mdowod-holo-badge">HOLOGRAM RP ✓</span>
          </div>
          <div class="mdowod-hero">
            <div class="mdowod-photo" aria-hidden="true">
              <svg width="68" height="84" viewBox="0 0 68 84" fill="none">
                <rect width="68" height="84" fill="#d8dee6"/>
                <circle cx="34" cy="30" r="14.5" fill="#7c8798"/>
                <path d="M21 27C21 17 27 12 34 12C41 12 47 17 47 27C44 21 39 19 34 19C29 19 24 21 21 27Z" fill="#475569"/>
                <circle cx="29" cy="30" r="1.6" fill="#1e293b"/>
                <circle cx="39" cy="30" r="1.6" fill="#1e293b"/>
                <path d="M30 37.5C32.2 39.2 35.8 39.2 38 37.5" stroke="#334155" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M12 84C14 63 22 52 34 52C46 52 54 63 56 84H12Z" fill="#475569"/>
                <path d="M27 52L34 62L41 52" fill="#f1f5f9"/>
              </svg>
            </div>
            <div class="mdowod-meta">
              <div class="mdowod-name">${doc.holderFirst}</div>
              <div class="mdowod-pills">
                <button type="button" class="wallet-pill-btn" id="btn-toggle-mdowod-data" aria-expanded="${state.showMdowodData}">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M2 12C4.5 7.5 8 5.5 12 5.5C16 5.5 19.5 7.5 22 12C19.5 16.5 16 18.5 12 18.5C8 18.5 4.5 16.5 2 12Z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="2"/></svg>
                  <span>${dataToggleLabel}</span>
                </button>
                <button type="button" class="wallet-pill-btn" id="btn-open-znak-modal">
                  ${ICONS.shield}
                  <span>Znak 18+</span>
                </button>
              </div>
            </div>
          </div>
          ${state.showMdowodData ? `
            <div class="wallet-details-panel">
              <div class="wallet-detail-row"><span>Posiadacz</span><strong>${doc.holderFull}</strong></div>
              <div class="wallet-detail-row"><span>Numer PESEL</span><strong>${doc.pesel}</strong></div>
              <div class="wallet-detail-row"><span>Seria i numer</span><strong>${doc.series}</strong></div>
              <div class="wallet-detail-row"><span>Ważny do</span><strong>${doc.validTo}</strong></div>
              <div class="wallet-detail-row"><span>Dostępność</span><strong>${doc.certStatus}</strong></div>
              <button type="button" class="wallet-cta-btn" id="btn-toggle-pesel-lock" aria-pressed="${state.peselLocked}">
                ${state.peselLocked ? "PESEL zastrzeżony ✓ (kliknij, aby cofnąć)" : "Zastrzeż PESEL 1 kliknięciem"}
              </button>
            </div>
          ` : ""}
        </div>
      `;
    } else if (doc.id === "dzieci") {
      const child = CHILDREN_DOCUMENTS.find(c => c.id === state.selectedChildId) || CHILDREN_DOCUMENTS[0];
      const childDataLabel = state.showChildData ? "Ukryj dane" : "Pokaż dane";
      bodyHtml = `
        <div class="wallet-card__body" ${isExpanded ? "" : "hidden"}>
          <div class="mdowod-live-bar">
            <span class="mdowod-live-time">
              <span class="mdowod-live-dot" aria-hidden="true"></span>
              <span>Dokument małoletniego · PESEL ✓</span>
            </span>
            <span class="mdowod-holo-badge">HOLOGRAM RP ✓</span>
          </div>
          <div class="mdowod-pills" style="padding:0 16px 10px" role="group" aria-label="Wybierz dziecko">
            ${CHILDREN_DOCUMENTS.map(c => `
              <button type="button" class="wallet-pill-btn" data-select-child="${c.id}" aria-pressed="${c.id === child.id}">
                <span>${c.fullName}</span>
              </button>
            `).join("")}
          </div>
          <div class="mdowod-hero">
            <div class="mdowod-photo" aria-hidden="true">
              <svg width="68" height="84" viewBox="0 0 68 84" fill="none">
                <rect width="68" height="84" fill="#d8dee6"/>
                <circle cx="34" cy="33" r="13" fill="#8b96a6"/>
                <path d="M21 30C21 20 27 15 34 15C41 15 47 20 47 30C44 24 39 22 34 22C29 22 24 24 21 30Z" fill="${child.id === "zosia" ? "#92400e" : "#475569"}"/>
                <circle cx="29.5" cy="33" r="1.5" fill="#1e293b"/>
                <circle cx="38.5" cy="33" r="1.5" fill="#1e293b"/>
                <path d="M30 40C32.2 41.8 35.8 41.8 38 40" stroke="#334155" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M14 84C16 65 23 55 34 55C45 55 52 65 54 84H14Z" fill="#0f766e"/>
              </svg>
            </div>
            <div class="mdowod-meta">
              <div class="mdowod-name">${child.firstName}</div>
              <div class="card-desc" style="color:inherit;font-size:11.5px;font-weight:700">${child.schoolBadge}</div>
              <div class="mdowod-pills">
                <button type="button" class="wallet-pill-btn" id="btn-toggle-child-data" aria-expanded="${state.showChildData}">
                  <span>${childDataLabel}</span>
                </button>
              </div>
            </div>
          </div>
          ${state.showChildData ? `
            <div class="wallet-details-panel">
              <div class="wallet-detail-row"><span>Dziecko</span><strong>${child.fullName}</strong></div>
              <div class="wallet-detail-row"><span>Data urodzenia</span><strong>${child.birthDate}</strong></div>
              <div class="wallet-detail-row"><span>Numer PESEL</span><strong>${child.pesel}</strong></div>
              <div class="wallet-detail-row"><span>mDowód dziecka</span><strong>${child.series}</strong></div>
              <div class="wallet-detail-row"><span>Ważny do</span><strong>${child.validTo}</strong></div>
              <div class="wallet-detail-row"><span>IKP i alergie</span><strong>${child.bloodAndAllergy}</strong></div>
              <div class="wallet-detail-row"><span>Opiekun</span><strong>${child.guardian}</strong></div>
              <button type="button" class="wallet-cta-btn" id="btn-child-ikp">🏥 Okaż IKP i alergie dziecka (Lekarz / SOR)</button>
              <button type="button" class="wallet-pill-btn" id="btn-child-consent" style="inline-size:100%;justify-content:center;min-block-size:38px;margin-block-start:2px">✈️ Zgoda na odbiór / wyjazd dziecka</button>
            </div>
          ` : ""}
        </div>
      `;
    } else {
      bodyHtml = `
        <div class="wallet-card__body" ${isExpanded ? "" : "hidden"}>
          <div class="wallet-details-panel">
            ${doc.rows.map(r => `<div class="wallet-detail-row"><span>${r.label}</span><strong>${r.value}</strong></div>`).join("")}
            <button type="button" class="wallet-cta-btn" data-go="${doc.ctaScreen}">${doc.ctaLabel}</button>
          </div>
        </div>
      `;
    }

    const watermark = doc.id === "mdowod"
      ? `<svg class="mdowod-watermark" aria-hidden="true" width="146" height="146" viewBox="0 0 120 120" fill="none">
           <path d="M60 12L92 32V68C92 90 78 106 60 114C42 106 28 90 28 68V32L60 12Z" stroke="#ffffff" stroke-width="2.5"/>
           <path d="M44 52L60 36L76 52L70 86H50L44 52Z" fill="#ffffff"/>
         </svg>`
      : "";

    return `
      <article class="wallet-card wallet-card--${doc.theme} ${isExpanded ? "is-expanded" : ""}">
        ${carDecor}
        ${watermark}
        <button type="button" class="wallet-card__toggle" data-expand-doc="${doc.id}" aria-expanded="${isExpanded}">
          <span class="wallet-card__title">${doc.title}</span>
          ${renderWalletEmblem(doc.emblem)}
        </button>
        ${bodyHtml}
      </article>
    `;
  }).join("");

  return `
    <div class="wallet-header">
      <h1 id="phone-main-heading" tabindex="-1" class="wallet-h1">
        <button type="button" class="wallet-heading-btn" id="btn-all-docs-modal">
          <span>Dokumenty</span>
          <span aria-hidden="true" style="font-size:14px;color:var(--text-muted)">⌄</span>
        </button>
      </h1>
      <div class="wallet-actions">
        <button type="button" class="wallet-icon-btn" id="btn-header-znak-qr" aria-label="Potwierdź wiek 18+ lub okaż kod QR">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 8V5H8M16 5H20V8M20 16V19H16M8 19H4V16" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
            <path d="M8 10H16M14 8L16 10L14 12M16 14H8M10 12L8 14L10 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button type="button" class="wallet-icon-btn" data-go="translator" aria-label="Skrzynka pism — 3 nieprzeczytane">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.9"/>
            <path d="M4 7L12 13L20 7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
          </svg>
          <span class="wallet-mail-dot" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <div class="wallet-stack">${cardsHtml}</div>

    <div class="wallet-bottom-dock">
      <button type="button" class="wallet-alert-bar" data-go="translator">
        <span class="wallet-alert-count" aria-hidden="true">3</span>
        <span class="wallet-alert-copy">
          <strong>Pismo z Urzędu Skarbowego / ZUS</strong>
          <span><span style="color:var(--brand-crimson);font-weight:700">Odpowiedź do 01.12</span> · i 2 inne sprawy</span>
        </span>
        <span aria-hidden="true" style="font-size:18px;color:var(--text-muted)">›</span>
      </button>

      ${renderPromptPill("wallet-prompt-input")}
    </div>
  `;
}

function renderTracker() {
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <span class="status-chip status-chip--info">Przejrzystość danych</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Ślad Danych i AI</h1>

    <div class="card">
      <div class="sub-nav-row">
        <span class="card-title" style="font-size:14px">Tryb prywatności asystenta</span>
        <button type="button" class="back-chip" id="btn-toggle-ai-mode" aria-pressed="${state.aiOptIn}">
          ${state.aiOptIn ? "Pomoc z rejestrami ✓" : "Tylko pytania (Zero-Log)"}
        </button>
      </div>
      <div class="card-desc">
        ${state.aiOptIn
          ? "Asystent przygotowuje dokumenty za Twoją zgodą — bez trenowania modelu na Twoich danych."
          : "Tryb anonimowy: asystent odpowiada ogólnie bez dostępu do Twoich spraw i historii."}
      </div>
    </div>

    <p class="section-label">Ostatnie zapytania do Twoich rejestrów</p>
    ${DATA_TRACKER_LOGS.map((l, i) => `
      <div class="card ${l.suspicious ? "card--critical" : ""}">
        <div class="sub-nav-row">
          <span class="kicker" style="color:${l.suspicious ? "var(--brand-crimson)" : "var(--status-success)"}">${l.time} · ${l.reg}</span>
        </div>
        <div class="card-title">${l.inst}</div>
        <div class="card-desc">${l.reason} (${l.legal})</div>
        ${l.suspicious ? `<button type="button" class="btn btn--danger-outline" data-report-log="${i}">Zgłoś podejrzane sprawdzenie</button>` : ""}
      </div>
    `).join("")}
  `;
}

function renderAssistant() {
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <button type="button" class="back-chip" id="btn-toggle-ai-mode-chat">
        ${state.aiOptIn ? "Tryb aktywny ✓" : "Tryb anonimowy"}
      </button>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Asystent mObywatel</h1>

    ${state.chatMessages.map(m => `
      <div class="card ${m.role === "user" ? "card--elevated" : ""}">
        <span class="kicker">${m.role === "user" ? "Ty" : "Asystent (PLLuM)"}</span>
        <div class="card-desc" style="color:var(--text-primary)">${m.text}</div>
      </div>
    `).join("")}

    <div class="badge-row">
      <button type="button" class="back-chip" data-ask="Kupiłem auto — wygeneruj umowę">Kupno / sprzedaż auta</button>
      <button type="button" class="back-chip" data-ask="Dzwoni ktoś z banku i chce BLIK">Telefon z banku</button>
      <button type="button" class="back-chip" data-ask="Sprawdź faktury w KSeF">Faktury w KSeF</button>
    </div>

    <div class="prompt-pill-wrap">
      <form id="chat-form" class="prompt-pill-bar">
        <label for="chat-input" class="visually-hidden">Zadaj pytanie asystentowi</label>
        <input id="chat-input" class="prompt-pill-input" type="text" placeholder="Napisz sprawę urzędową..." autocomplete="off">
        <button type="submit" class="prompt-send-btn" aria-label="Wyślij wiadomość">↑</button>
      </form>
    </div>
  `;
}

function renderSenior() {
  return `
    <div class="sub-nav-row">
      <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Tryb Seniora (WCAG AAA)</h1>
      <button type="button" class="back-chip" id="btn-exit-senior">Wyłącz</button>
    </div>
    <button type="button" class="btn btn--primary" data-go="assistant" style="min-block-size:84px;flex-direction:column">
      <span>Powiedz własnymi słowami</span>
      <span style="font-size:13px;font-weight:500">Rozmowa głosowa po polsku</span>
    </button>
    <button type="button" class="card row-btn card--critical" data-go="hospital">
      <span class="card-title">Szpital bez ankiet (Leki i bliski)</span>
      <span class="card-desc">Przekaż lekarzowi listę leków i upoważnij bliską osobę jednym dotknięciem.</span>
    </button>
    <button type="button" class="card row-btn" data-go="translator" style="border:2px solid #090d16">
      <span class="card-title">Wyjaśnij pismo z urzędu</span>
      <span class="card-desc">Zrób zdjęcie listu z ZUS lub skarbówki — powiemy prosto, co zrobić.</span>
    </button>
    <button type="button" class="card row-btn" id="btn-senior-proxy" style="border:2px solid #003d99;background:#eff6ff;color:#090d16">
      <span class="card-title">Poproś bliskiego o pomoc</span>
      <span class="card-desc" style="color:#1e293b">Marek Kowalski (Syn) · Podgląd sprawy bez podawania PIN-u (ochrona przed oszustwem).</span>
    </button>
    <button type="button" class="btn btn--secondary" id="btn-senior-contrast" aria-pressed="${state.contrastByMode}">
      ${state.contrastByMode ? "✓ Kontrast Czarno-Żółty aktywny (Wyłącz)" : "◐ Włącz kontrast Czarno-Żółty (WCAG AAA)"}
    </button>
  `;
}

function generateSampleSignatureDataUrl() {
  const c = document.createElement("canvas");
  c.width = 280;
  c.height = 96;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 3.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(26, 62);
  ctx.bezierCurveTo(38, 22, 64, 18, 60, 56);
  ctx.bezierCurveTo(56, 76, 84, 70, 96, 46);
  ctx.bezierCurveTo(106, 26, 118, 68, 134, 52);
  ctx.bezierCurveTo(148, 36, 162, 62, 182, 46);
  ctx.bezierCurveTo(198, 34, 212, 54, 242, 44);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(24, 76);
  ctx.quadraticCurveTo(132, 68, 248, 72);
  ctx.lineWidth = 1.6;
  ctx.stroke();
  return c.toDataURL("image/png");
}

function toAsciiPdfSafe(text) {
  const map = {
    "ą": "a", "ć": "c", "ę": "e", "ł": "l", "ń": "n", "ó": "o", "ś": "s", "ź": "z", "ż": "z",
    "Ą": "A", "Ć": "C", "Ę": "E", "Ł": "L", "Ń": "N", "Ó": "O", "Ś": "S", "Ź": "Z", "Ż": "Z",
    "—": "-", "–": "-", "„": "\"", "”": "\"", "✓": "OK", "→": "->"
  };
  return String(text || "")
    .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ—–„”✓→]/g, ch => map[ch] || "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function buildSignedPdfBlob() {
  const sd = state.scanDoc;
  const tpl = SCANNED_DOC_TEMPLATES[sd.templateId] || SCANNED_DOC_TEMPLATES.oswiadczenie;
  const title = sd.uploadedFileName ? `Zeskanowany dokument: ${sd.uploadedFileName}` : tpl.title;
  const bodyLines = sd.uploadedFileName
    ? [
        `Zrodlo: plik lokalny (${sd.uploadedFileName}) przetworzony do formatu PDF A4.`,
        "Wykonano korekte kontrastu oraz osadzenie warstwy podpisu obywatela.",
        `Pozycja pieczeci podpisu na arkuszu: X=${Math.round(sd.sigX)}px, Y=${Math.round(sd.sigY)}px.`
      ]
    : tpl.lines;

  const pdfLines = [
    "BT",
    "/F1 16 Tf",
    "56 770 Td",
    `(${toAsciiPdfSafe(title)}) Tj`,
    "/F1 10 Tf",
    "0 -22 Td",
    `(mObywatel 3.0 AI | Nr referencyjny: ${toAsciiPdfSafe(tpl.refNo)} | Adresat: ${toAsciiPdfSafe(tpl.recipient)}) Tj`,
    "0 -26 Td",
    "/F1 11 Tf"
  ];
  bodyLines.forEach((line, idx) => {
    if (idx > 0) pdfLines.push("0 -18 Td");
    pdfLines.push(`(${toAsciiPdfSafe(line)}) Tj`);
  });
  pdfLines.push(
    "0 -44 Td",
    "/F1 10 Tf",
    "(--- PIECZEC ELEKTRONICZNA I PODPIS OBYWATELA ---) Tj",
    "0 -18 Td",
    "(Podpisano Profilem Zaufanym: Sebastian M. [PESEL 920418*****]) Tj",
    "0 -16 Td",
    `(Podpis odreczny na dokumencie: ZLOZONO [X=${Math.round(sd.sigX)}, Y=${Math.round(sd.sigY)}]) Tj`,
    "0 -16 Td",
    "(Znacznik czasu: 2026-11-26 21:41:09 CET | SHA-256: 7f8a92d1c4e0b19a...39d2) Tj",
    "ET"
  );

  const streamContent = `${pdfLines.join("\n")}\n`;
  const objs = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}endstream\nendobj\n`
  ];

  let out = "%PDF-1.4\n";
  const offsets = [0];
  for (const obj of objs) {
    offsets.push(out.length);
    out += obj;
  }
  const xrefStart = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objs.length; i += 1) {
    out += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return new Blob([out], { type: "application/pdf" });
}

function triggerPdfDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function renderDocScanSign() {
  const sd = state.scanDoc;
  if (!sd.sigDataUrl) sd.sigDataUrl = generateSampleSignatureDataUrl();
  const tpl = SCANNED_DOC_TEMPLATES[sd.templateId] || SCANNED_DOC_TEMPLATES.oswiadczenie;
  const pdfFileName = `${sd.uploadedFileName ? sd.uploadedFileName.replace(/\.[^.]+$/, "") : sd.templateId}_podpisany_PZ.pdf`;

  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <span class="status-chip ${sd.pzSigned ? "status-chip--ok" : "status-chip--info"}">
        ${sd.pzSigned ? "PDF + Profil Zaufany ✓" : "Skan A4 → PDF"}
      </span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Skanuj, podpisz i wyślij PDF</h1>

    <div class="card">
      <span class="kicker">1. Dokument źródłowy (Skan A4 lub zdjęcie)</span>
      <div class="scan-template-row">
        <button type="button" class="btn btn--secondary" data-scan-tpl="oswiadczenie" aria-pressed="${!sd.uploadedImageUrl && sd.templateId === "oswiadczenie"}">
          📄 Oświadczenie
        </button>
        <button type="button" class="btn btn--secondary" data-scan-tpl="pelnomocnictwo" aria-pressed="${!sd.uploadedImageUrl && sd.templateId === "pelnomocnictwo"}">
          📑 Pełnomocnictwo
        </button>
      </div>
      <div class="sub-nav-row">
        <label for="scan-file-input" class="back-chip" style="cursor:pointer">📷 Wgraj własny skan / zdjęcie</label>
        <input id="scan-file-input" type="file" accept="image/*" class="visually-hidden">
        ${sd.uploadedFileName ? `<span class="field-hint">${sd.uploadedFileName}</span>` : `<span class="field-hint">Gotowy podgląd PDF A4</span>`}
      </div>

      <div class="pdf-sheet" id="pdf-sheet-preview" aria-label="Podgląd dokumentu PDF A4 z pozycją podpisu">
        ${sd.uploadedImageUrl
          ? `<img src="${sd.uploadedImageUrl}" alt="Zeskanowany dokument" class="pdf-sheet__img">`
          : `
            <div class="pdf-sheet__head">
              <span>${tpl.title}</span>
              <span>${tpl.refNo}</span>
            </div>
            <div class="pdf-sheet__meta">Adresat: ${tpl.recipient}</div>
            <div class="pdf-sheet__body">${tpl.lines.join("<br>")}</div>
          `}

        <div
          id="sig-stamp-handle"
          class="pdf-sig-stamp sig-drag-handle ${sd.pzSigned ? "is-signed" : ""}"
          tabindex="0"
          role="application"
          aria-label="Pieczęć podpisu na dokumencie. Przeciągnij myszą lub przesuń strzałkami."
          style="left:${sd.sigX}px;top:${sd.sigY}px">
          <img src="${sd.sigDataUrl}" alt="Podpis odręczny Sebastian M.">
          <div class="pdf-sig-caption">
            ${sd.pzSigned ? "✓ Profil Zaufany · 26.11.2026" : "Przeciągnij podpis w wybrane miejsce"}
          </div>
        </div>
      </div>

      <div class="sub-nav-row">
        <button type="button" class="back-chip" id="btn-pos-left">↙ Lewy dół</button>
        <button type="button" class="back-chip" id="btn-pos-right">↘ Prawy dół</button>
      </div>
    </div>

    <div class="card">
      <span class="kicker">2. Złóż podpis odręczny (palcem lub myszą)</span>
      <canvas id="sig-pad" class="sig-pad" width="320" height="108" aria-label="Pole do rysowania podpisu odręcznego"></canvas>
      <div class="sub-nav-row">
        <button type="button" class="back-chip" id="btn-sig-clear">Wyczyść podpis</button>
        <button type="button" class="back-chip" id="btn-sig-sample">Przykładowy podpis</button>
      </div>
    </div>

    <div class="card ${sd.pzSigned ? "card--soft-emerald" : ""}">
      <span class="kicker">3. Profil Zaufany, generowanie PDF i wysyłka</span>
      <button type="button" class="btn ${sd.pzSigned ? "btn--success" : "btn--primary"}" id="btn-sign-pz">
        ${sd.pzSigned ? "✓ Podpisano Profilem Zaufanym — odśwież PDF" : "🔐 Podpisz Profilem Zaufanym i generuj PDF"}
      </button>

      ${sd.pzSigned ? `
        <div class="card-desc" style="font-weight:700">
          Wygenerowano: <code>${pdfFileName}</code><br>
          Pieczęć PZ ePUAP · SHA-256 osadzony w PDF.
          ${sd.sentStatus ? `<br><span style="color:var(--brand-emerald)">${sd.sentStatus}</span>` : ""}
        </div>
        <div class="scan-template-row">
          <button type="button" class="btn btn--secondary" id="btn-download-signed-pdf">📥 Pobierz PDF</button>
          <button type="button" class="btn btn--primary" id="btn-send-signed-pdf">📤 Wyślij do…</button>
        </div>
      ` : ""}
    </div>
  `;
}


export {
  renderWalletEmblem,
  renderZnak,
  renderTracker,
  renderAssistant,
  renderSenior,
  generateSampleSignatureDataUrl,
  toAsciiPdfSafe,
  buildSignedPdfBlob,
  triggerPdfDownload,
  renderDocScanSign
};
