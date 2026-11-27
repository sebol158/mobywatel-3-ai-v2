import {
  COUNTERPARTY,
  MDORECZENIA_ITEMS,
  PENSION_DATA,
  SERVICES_CATALOG
} from "./data.js";
import { ICONS, isCurrentlyDark, state } from "./core.js";

function renderPromptPill(inputId) {
  return `
    <div class="prompt-pill-wrap">
      <form class="prompt-pill-bar" data-prompt-form="true">
        <label for="${inputId}" class="visually-hidden">Co chcesz załatwić w mObywatelu?</label>
        <input id="${inputId}" class="prompt-pill-input" type="text" placeholder="Co chcesz załatwić?" autocomplete="off">
        <button type="button" class="prompt-mic-btn" data-go="assistant" aria-label="Zapytaj głosowo">
          ${ICONS.mic}
        </button>
        <button type="submit" class="prompt-send-btn" aria-label="Wyślij zapytanie">↑</button>
      </form>
    </div>
  `;
}

function renderHub() {
  const dark = isCurrentlyDark();
  return `
    <div class="hub-greeting-wrap">
      <div class="hub-greeting-row">
        <h1 id="phone-main-heading" tabindex="-1" class="hub-greeting-h1">Dzień dobry, Sebastian</h1>
        <div class="hub-tools">
          <button type="button" class="icon-pill-btn" data-go="tracker" aria-label="Ślad Danych i prywatność AI">
            ${ICONS.shield}
          </button>
          <button type="button" class="icon-pill-btn" id="btn-hub-theme" aria-pressed="${dark}" aria-label="${dark ? "Przełącz na motyw jasny" : "Przełącz na motyw ciemny"}">
            ${ICONS.moon}
          </button>
          <button type="button" class="icon-pill-btn" id="btn-hub-contrast" aria-pressed="${state.contrastByMode}" aria-label="${state.contrastByMode ? "Wyłącz kontrast czarno-żółty" : "Włącz kontrast czarno-żółty"}">
            ${ICONS.contrast}
          </button>
          <button type="button" class="icon-pill-btn" data-go="senior" aria-label="Włącz Tryb Seniora WCAG AAA">
            Aa+
          </button>
        </div>
      </div>
      <div class="hub-date">Czwartek, 26 listopada · Gdańsk</div>
    </div>

    <div class="card card--elevated">
      <div class="badge-row">
        <span class="status-chip status-chip--warn">12 dni na podatek PCC-3</span>
        <span class="status-chip status-chip--ok">-93,50 zł na tablicach</span>
      </div>
      <h2 class="card-title" style="font-size:16.5px">Kupno lub sprzedaż auta</h2>
      <p class="card-desc">Cyfrowa umowa w 60 sekund z drugą osobą lub skan ze zdjęcia — bez wizyty w urzędzie.</p>
      <button type="button" class="btn btn--primary" data-go="auto_choice">Załatw sprawę auta →</button>
    </div>

    <p class="section-label">Załatw bez formularzy</p>
    <div class="grid-2x2">
      <button type="button" class="tile-btn" data-go="hospital">
        <span class="icon-box icon-box--crimson">${ICONS.hospital}</span>
        <div>
          <div class="tile-title">Szpital i SOR</div>
          <div class="tile-sub">IKP, leki i alergie w 5 s</div>
        </div>
      </button>
      <button type="button" class="tile-btn" data-go="caller_shield">
        <span class="icon-box icon-box--crimson">${ICONS.phone}</span>
        <div>
          <div class="tile-title">Kto dzwoni?</div>
          <div class="tile-sub">Weryfikuj bank i Policję</div>
        </div>
      </button>
      <button type="button" class="tile-btn" data-go="doc_scan_sign">
        <span class="icon-box icon-box--cobalt">${ICONS.scanSign}</span>
        <div>
          <div class="tile-title">Skanuj i podpisz</div>
          <div class="tile-sub">Papier → PDF + Profil Zaufany</div>
        </div>
      </button>
      <button type="button" class="tile-btn" data-go="zero_hub">
        <span class="icon-box icon-box--emerald">${ICONS.layers}</span>
        <div>
          <div class="tile-title">Więcej usług</div>
          <div class="tile-sub">Emerytura · KW 2.0 · Stłuczka</div>
        </div>
      </button>
    </div>

    ${renderPromptPill("hub-prompt-input")}
  `;
}

function renderCallerShield() {
  const spoof = state.callerIsSpoof;
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <span class="status-chip ${spoof ? "status-chip--danger" : "status-chip--ok"}">
        ${spoof ? "Uwaga: Spoofing" : "Połączenie zweryfikowane"}
      </span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Tarcza „Kto dzwoni?”</h1>

    <div class="badge-row" role="group" aria-label="Symulacja scenariusza połączenia">
      <button type="button" class="back-chip" data-caller-mode="spoof" style="${spoof ? "background:#dc143c;color:#fff;border-color:#dc143c" : ""}">Oszust (Spoofing)</button>
      <button type="button" class="back-chip" data-caller-mode="verified" style="${!spoof ? "background:#059669;color:#fff;border-color:#059669" : ""}">Prawdziwy bank</button>
    </div>

    ${spoof ? `
      <div class="card card--critical">
        <span class="kicker" style="color:#dc143c">Przychodzące: +48 800 302 302 („Dział Bezpieczeństwa”)</span>
        <div class="card-title">TO PRAWDOPODOBNIE OSZUSTWO!</div>
        <div class="card-desc">Żaden bank ani policjant nie wysłał prośby o weryfikację w Twoim mObywatelu. <strong>Rozłącz się natychmiast i nie podawaj kodów BLIK.</strong></div>
        <button type="button" class="btn btn--crimson" id="btn-report-caller">
          ${state.callerReported ? "Zgłoszono numer do CERT Polska ✓" : "Zablokuj i zgłoś do CERT Polska"}
        </button>
      </div>
    ` : `
      <div class="card card--soft-emerald">
        <span class="kicker" style="color:#059669">Potwierdzone kryptograficznie przez bank</span>
        <div class="card-title">PKO Bank Polski S.A. · Doradca Anna Zielińska</div>
        <div class="card-desc">Nr sprawy: <strong>PKO-2026-88412</strong> (kredyt hipoteczny). Połączenie autoryzowane — możesz bezpiecznie rozmawiać.</div>
      </div>
    `}

    <div class="card">
      <div class="card-title">Jak to działa?</div>
      <div class="card-desc">Gdy dzwoni prawdziwy konsultant banku, Policji lub urzędu, wysyła do Twojego mObywatela zaszyfrowane potwierdzenie imienia i celu rozmowy.</div>
    </div>
  `;
}

function renderKw() {
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <span class="status-chip status-chip--info">Bezpłatny podgląd KW</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Księgi Wieczyste 2.0</h1>

    <div class="card card--elevated">
      <span class="kicker">GD1G/00148291/4 · Gdańsk, ul. Grunwaldzka 118/4</span>
      <div class="card-title">Mieszkanie 58,4 m² · Właściciel: Sebastian M.</div>
      <div class="card-desc">Wartość zwalnia z wizyty na portalu ekw.ms.gov.pl — podgląd wszystkich 4 działów w aplikacji za 0 zł.</div>
    </div>

    <div class="row-item">
      <div>
        <div class="card-title" style="font-size:13.5px">Alert KW (Ochrona nieruchomości)</div>
        <div class="card-desc" style="font-size:11.5px">Natychmiastowy push przy każdej próbie wzmianki u notariusza.</div>
      </div>
      <button type="button" class="back-chip" id="btn-toggle-kw-alert" aria-pressed="${state.kwAlertEnabled}" style="${state.kwAlertEnabled ? "background:#059669;color:#fff;border-color:#059669" : ""}">
        ${state.kwAlertEnabled ? "Aktywny ✓" : "Włącz"}
      </button>
    </div>

    <div class="card ${state.mortgageCleared ? "card--soft-emerald" : "card--soft-amber"}">
      <span class="kicker" style="color:${state.mortgageCleared ? "#059669" : "#b45309"}">
        ${state.mortgageCleared ? "Wysłano do Sądu Rejonowego ✓" : "Dział IV · Otrzymano cyfrową zgodę banku"}
      </span>
      <div class="card-title">Wykreślenie spłaconej hipoteki</div>
      <div class="card-desc">
        ${state.mortgageCleared
          ? "Wniosek o wykreślenie hipoteki (100 zł BLIK) został złożony elektronicznie. Koniec biegania z papierowym kwitem mazalnym."
          : "PKO BP wysłał elektroniczne oświadczenie o spłacie kredytu. Złóż wniosek do sądu jednym kliknięciem (opłata sądowa: 100,00 zł)."}
      </div>
      ${state.mortgageCleared ? "" : `<button type="button" class="btn btn--primary" id="btn-clear-mortgage">Wyślij wniosek do sądu i opłać 100 zł BLIK →</button>`}
    </div>
  `;
}

function renderPension() {
  const plus2 = state.pensionPlus2Y;
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="zero_hub">← Usługi</button>
      <span class="status-chip status-chip--ok">ZUS + PPK + IKE + OFE</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Moja Emerytura 360°</h1>

    <div class="card card--elevated">
      <span class="kicker">Twój łączny zgromadzony kapitał</span>
      <div style="font-size:28px;font-weight:800;letter-spacing:-0.02em;color:var(--brand-cobalt)">${PENSION_DATA.total}</div>
      <div class="card-desc">Prognoza miesięcznej emerytury „na rękę”: <strong style="font-size:15px;color:var(--text-primary)">${plus2 ? PENSION_DATA.monthlyPlus2Y : PENSION_DATA.monthlyNow}</strong></div>
      <div class="badge-row" role="group" aria-label="Symulacja wieku emerytalnego">
        <button type="button" class="back-chip" data-pension-sim="now" style="${!plus2 ? "background:#0052cc;color:#fff;border-color:#0052cc" : ""}">Wiek ustawowy</button>
        <button type="button" class="back-chip" data-pension-sim="plus2" style="${plus2 ? "background:#059669;color:#fff;border-color:#059669" : ""}">+2 lata pracy (+16%)</button>
      </div>
    </div>

    ${PENSION_DATA.pillars.map(p => `
      <div class="row-item">
        <div>
          <div class="card-title" style="font-size:13.5px">${p.name}</div>
          <div class="card-desc" style="font-size:11.5px">Udział w kapitale: ${p.share}</div>
        </div>
        <strong style="white-space:nowrap">${p.amount}</strong>
      </div>
    `).join("")}
  `;
}

function renderMFirma() {
  const ksefSel = state.mfirmaTab === "ksef";
  const dorSel = state.mfirmaTab === "mdoreczenia";
  const corpSel = state.mfirmaTab === "corppass";
  const startSel = state.mfirmaTab === "startbiz";

  const invoicesHtml = state.ksefInvoices.map(inv => `
    <div class="card ${inv.suspicious ? "card--critical" : (inv.status === "new" ? "card--elevated" : "")}">
      <div class="sub-nav-row">
        <span class="status-chip ${inv.suspicious ? "status-chip--danger" : (inv.status === "new" ? "status-chip--info" : "status-chip--ok")}">
          ${inv.suspicious ? "Podejrzana faktura" : (inv.status === "new" ? "Nowa w KSeF" : "Odebrano")}
        </span>
        <strong>${inv.gross}</strong>
      </div>
      <div class="card-title">${inv.seller}</div>
      <div class="card-desc">NIP ${inv.nip} · Termin: ${inv.due}<br>${inv.attachment}</div>
      <div class="badge-row">
        <button type="button" class="back-chip" data-ksef-preview="${inv.id}">Podgląd i załącznik</button>
        ${inv.suspicious
          ? `<button type="button" class="back-chip" style="color:#be123c" data-ksef-report="${inv.id}">Zgłoś do KAS</button>`
          : (inv.status !== "paid"
            ? `<button type="button" class="back-chip" style="background:#0052cc;color:#fff;border-color:#0052cc" data-ksef-pay="${inv.id}">Opłać BLIK</button>`
            : `<span class="status-chip status-chip--ok">Opłacono ✓</span>`)}
      </div>
    </div>
  `).join("");

  const dorList = MDORECZENIA_ITEMS[state.doreczeniaBox].map(d => `
    <div class="card ${d.urgent ? "card--soft-amber" : ""}">
      <div class="sub-nav-row">
        <span class="status-chip ${d.urgent ? "status-chip--warn" : "status-chip--ok"}">
          ${d.urgent ? `Dzień ${d.daysElapsed} z ${d.daysLimit}` : `Odebrano (${d.daysElapsed}/${d.daysLimit})`}
        </span>
      </div>
      <div class="card-title">${d.title}</div>
      <div class="card-desc"><strong>${d.sender}</strong><br>${d.summary}</div>
    </div>
  `).join("");

  const delHtml = state.delegations.map(d => `
    <div class="row-item">
      <div>
        <div class="card-title" style="font-size:13px">${d.label}</div>
        <div class="card-desc" style="font-size:11.5px">${d.sub}</div>
      </div>
      <button type="button" class="back-chip" data-toggle-del="${d.id}" aria-pressed="${d.enabled}" style="${d.enabled ? "background:var(--emerald-soft);color:var(--status-success);border-color:rgba(5,150,105,0.35)" : ""}">
        ${d.enabled ? "Aktywne ✓" : "Włącz"}
      </button>
    </div>
  `).join("");

  return `
    <div class="sub-nav-row">
      <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">mFirma</h1>
      <span class="status-chip status-chip--info">NIP 583-319-44-02</span>
    </div>

    <div class="tabs-container">
      <div class="tablist" role="tablist" focusgroup="tablist nomemory" aria-label="Moduły firmy">
        <button type="button" role="tab" id="tab-ksef" data-tabkey="ksef" aria-selected="${ksefSel}" ${ksefSel ? "focusgroupstart" : ""}>Faktury (${state.ksefInvoices.length})</button>
        <button type="button" role="tab" id="tab-dor" data-tabkey="mdoreczenia" aria-selected="${dorSel}" ${dorSel ? "focusgroupstart" : ""}>Doręczenia</button>
        <button type="button" role="tab" id="tab-corp" data-tabkey="corppass" aria-selected="${corpSel}" ${corpSel ? "focusgroupstart" : ""}>Uprawnienia</button>
        <button type="button" role="tab" id="tab-startbiz" data-tabkey="startbiz" aria-selected="${startSel}" ${startSel ? "focusgroupstart" : ""}>Start firmy</button>
      </div>

      <div role="tabpanel" aria-labelledby="tab-ksef" ${ksefSel ? "" : 'hidden="until-found"'}>
        <div class="tabpanel-inner">${invoicesHtml}</div>
      </div>

      <div role="tabpanel" aria-labelledby="tab-dor" ${dorSel ? "" : 'hidden="until-found"'}>
        <div class="tabpanel-inner">
          <div class="badge-row">
            <button type="button" class="back-chip" data-box="firma" style="${state.doreczeniaBox === "firma" ? "background:#0052cc;color:#fff" : ""}">Skrzynka firmy</button>
            <button type="button" class="back-chip" data-box="prywatna" style="${state.doreczeniaBox === "prywatna" ? "background:#0052cc;color:#fff" : ""}">Skrzynka prywatna</button>
          </div>
          ${dorList}
        </div>
      </div>

      <div role="tabpanel" aria-labelledby="tab-corp" ${corpSel ? "" : 'hidden="until-found"'}>
        <div class="tabpanel-inner">
          <div class="card">
            <span class="kicker">Biuro rachunkowe</span>
            <div class="card-title">SALDO Sp. z o.o. (NIP 584-210-99-12)</div>
            <div class="card-desc">Uprawnienia przypisane do biura jako firmy — nieobecność jednego księgowego nie blokuje wysyłki.</div>
          </div>
          ${delHtml}
          <div class="card card--soft-emerald">
            <div class="card-title">Podpis kwalifikowany QES B2B</div>
            <div class="card-desc">Podpisuj umowy firmowe, pliki XML i paczki dokumentów z weryfikacją konta bankowego kontrahenta.</div>
            <button type="button" class="btn btn--success" id="btn-test-qes-b2b">Podpisz paczkę umów B2B →</button>
          </div>
        </div>
      </div>

      <div role="tabpanel" aria-labelledby="tab-startbiz" ${startSel ? "" : 'hidden="until-found"'}>
        <div class="tabpanel-inner">
          <div class="card ${state.bizCreated ? "card--soft-emerald" : "card--elevated"}">
            <span class="kicker">${state.bizCreated ? "Firma aktywna ✓" : "1 Okienko · Wzorem Diia e-Entrepreneur"}</span>
            <div class="card-title">${state.bizCreated ? "JDG zarejestrowana w 5 rejestrach!" : "Załóż firmę jednym podpisem"}</div>
            <div class="field-group">
              <label for="biz-pkd-input" class="field-label">Czym zajmuje się firma? (AI dobiera PKD 2025)</label>
              <input id="biz-pkd-input" class="field-input" type="text" value="${state.bizPkdDesc}" autocomplete="off">
            </div>
            <div class="card-desc">
              ✓ Wpis CEIDG-1 + PKD 62.10.B<br>
              ✓ Rejestracja VAT-R w Urzędzie Skarbowym<br>
              ✓ Zgłoszenie ZUS ZUA + skrzynka ADE + certyfikat KSeF
            </div>
            ${state.bizCreated
              ? `<span class="status-chip status-chip--ok">Nadano NIP, REGON, ADE i certyfikat KSeF ✓</span>`
              : `<button type="button" class="btn btn--primary" id="btn-create-biz">Załóż firmę (CEIDG + VAT + ZUS + KSeF) →</button>`}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAutoChoice() {
  const isBuyer = state.carRole === "buyer";
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <span class="status-chip status-chip--ok">Bez wizyty w urzędzie</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Kupno lub sprzedaż auta</h1>

    <div class="badge-row" role="group" aria-label="Wybierz swoją rolę">
      <button type="button" class="back-chip" data-car-role="buyer" style="${isBuyer ? "background:#0052cc;color:#fff" : ""}">Kupuję pojazd</button>
      <button type="button" class="back-chip" data-car-role="seller" style="${!isBuyer ? "background:#0052cc;color:#fff" : ""}">Sprzedaję pojazd</button>
    </div>

    <div class="card">
      <span class="kicker">Opcja 1 · Mam papierową umowę</span>
      <h2 class="card-title">Zeskanuj podpisaną umowę</h2>
      <p class="card-desc">Zrób zdjęcie dokumentu. Telefon odczyta VIN, cenę i datę lokalnie bez wysyłania skanu w sieć.</p>
      <button type="button" class="btn btn--secondary" data-go="auto_scan">Skanuj umowę →</button>
    </div>

    <div class="card card--elevated">
      <div class="badge-row"><span class="status-chip status-chip--ok">Polecane · 0 papieru</span></div>
      <h2 class="card-title">Opcja 2 · Utwórz umowę cyfrową</h2>
      <p class="card-desc">
        ${isBuyer
          ? "Zeskanuj mObywatel sprzedającego oraz mPojazd (lub wpisz numer rejestracyjny). Podpiszecie umowę w telefonie i od razu rozliczysz PCC-3."
          : "Zeskanuj mObywatel kupującego oraz wskaż auto z mPojazdu lub po tablicy. Zbycie i OC zgłoszą się automatycznie."}
      </p>
      <button type="button" class="btn btn--primary" data-go="auto_p2p">Utwórz umowę w 60 s →</button>
    </div>
  `;
}

function renderAutoP2P() {
  const v = state.selectedVehicle;
  const isPlateTab = state.p2pVehicleTab === "plate";
  const isBuyer = state.carRole === "buyer";
  const pcc = Math.round(Number(state.contractPrice || 0) * 0.02);

  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="auto_choice">← Wróć</button>
      <span class="status-chip status-chip--ok">${isBuyer ? "Kupujący" : "Sprzedający"}</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Cyfrowa umowa (P2P)</h1>

    <div class="card card--soft-emerald">
      <div class="sub-nav-row">
        <span class="kicker" style="color:var(--status-success)">1. Druga osoba (mObywatel)</span>
        <span class="status-chip status-chip--ok">Zweryfikowano ✓</span>
      </div>
      <div class="card-title">${COUNTERPARTY.name} (${COUNTERPARTY.peselMasked})</div>
      <div class="card-desc">${COUNTERPARTY.peselLock}</div>
    </div>

    <div class="card">
      <span class="kicker">2. Dane pojazdu</span>
      <div class="tabs-container">
        <div class="tablist" role="tablist" focusgroup="tablist nomemory" aria-label="Wybór sposobu pobrania auta">
          <button type="button" role="tab" id="tab-plate" data-tabkey="plate" aria-selected="${isPlateTab}" ${isPlateTab ? "focusgroupstart" : ""}>Wpisz tablicę</button>
          <button type="button" role="tab" id="tab-mpojazd" data-tabkey="mpojazd" aria-selected="${!isPlateTab}" ${!isPlateTab ? "focusgroupstart" : ""}>Skan mPojazdu</button>
        </div>

        <div role="tabpanel" aria-labelledby="tab-plate" ${isPlateTab ? "" : 'hidden="until-found"'}>
          <div class="tabpanel-inner">
            <div class="field-group">
              <label for="plate-input" class="field-label">Numer rejestracyjny</label>
              <span id="plate-hint" class="field-hint">Np. GD 4829X, WA 7712M, KR 9042P</span>
              <div class="sub-nav-row">
                <input id="plate-input" class="field-input" type="text" value="${v.plate}" aria-describedby="plate-hint" autocomplete="off" autocorrect="off" spellcheck="false" style="flex:1">
                <button type="button" class="btn btn--secondary" id="btn-fetch-plate" style="inline-size:auto">Sprawdź</button>
              </div>
            </div>
          </div>
        </div>

        <div role="tabpanel" aria-labelledby="tab-mpojazd" ${!isPlateTab ? "" : 'hidden="until-found"'}>
          <div class="tabpanel-inner">
            <div class="card-desc">Zbliż telefon z dokumentem <strong>mPojazd</strong> lub wybierz pojazd testowy:</div>
            <div class="badge-row">
              <button type="button" class="back-chip" data-quick-plate="GD 4829X">Opel GD 4829X</button>
              <button type="button" class="back-chip" data-quick-plate="WA 7712M">Toyota WA 7712M</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="background:var(--bg-subtle);box-shadow:none">
        <div class="card-title">${v.makeModel} (${v.year}) · ${v.plate}</div>
        <div class="card-desc">VIN ${v.vin} · OC ${v.ocInsurer} do ${v.ocValidTo}</div>
      </div>
    </div>

    <div class="card">
      <span class="kicker">3. Kwota i przebieg</span>
      <div class="grid-2x2">
        <div class="field-group">
          <label for="price-input" class="field-label">Cena (zł)</label>
          <input id="price-input" class="field-input" type="text" inputmode="numeric" pattern="[0-9]*" value="${state.contractPrice}" autocomplete="off">
        </div>
        <div class="field-group">
          <label for="mileage-input" class="field-label">Przebieg (km)</label>
          <input id="mileage-input" class="field-input" type="text" inputmode="numeric" pattern="[0-9]*" value="${state.contractMileage}" autocomplete="off">
        </div>
      </div>
      <div class="card-desc">
        ${isBuyer
          ? `Podatek PCC-3 (2%): <strong>${pcc} zł</strong> · Zachowanie tablic UE: <strong>66,50 zł</strong> (-93,50 zł).`
          : `Godzina przekazania auta zapisana na umowie chroni Cię przed mandatami nabywcy.`}
      </div>
      <button type="button" class="btn btn--primary" id="btn-generate-contract">Utwórz i podpisz umowę →</button>
    </div>
  `;
}

function renderAutoScan() {
  const v = state.selectedVehicle;
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="auto_choice">← Wróć</button>
      <span class="status-chip status-chip--ok">Odczyt w telefonie ✓</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Odczytano umowę</h1>

    <div class="card card--dark">
      <span class="kicker">Dane ze zdjęcia umowy</span>
      <div class="card-title">${v.makeModel} (${v.year}) · ${v.plate}</div>
      <div class="card-desc">
        VIN: ${v.vin}<br>
        Kwota: ${state.contractPrice} zł (PCC-3: ${Math.round(state.contractPrice * 0.02)} zł)<br>
        Polisa ${v.ocInsurer} aktywna · ${v.liens}
      </div>
    </div>

    <div class="card card--soft-emerald">
      <div class="card-title">Zaoszczędzisz 93,50 zł na tablicach</div>
      <div class="card-desc">Zostawiasz obecne tablice ${v.plate} (66,50 zł zamiast 160,00 zł), a twardy dowód odbierzesz w Urzędomacie.</div>
    </div>

    <button type="button" class="btn btn--success" data-go="auto_bundle">Przejdź do opłat 3 w 1 →</button>
  `;
}

function renderAutoBundle() {
  const v = state.selectedVehicle;
  const pcc = Math.round(Number(state.contractPrice || 0) * 0.02);
  const total = (pcc + 66.5).toFixed(2).replace(".", ",");

  if (state.carRole === "seller") {
    return `
      <div class="sub-nav-row">
        <button type="button" class="back-chip" data-back="auto_p2p">← Wróć</button>
        <span class="status-chip status-chip--ok">Podpisano ✓</span>
      </div>
      <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Zgłoszenie sprzedaży</h1>
      <div class="card">
        <span class="kicker">${v.office}</span>
        <div class="card-title">1. Zgłoszenie zbycia ${v.plate}</div>
        <div class="card-desc">Brak ryzyka kary 250 zł i ochrona przed mandatami od godz. 09:41. Opłata: <strong>0,00 zł</strong>.</div>
      </div>
      <div class="card">
        <span class="kicker">${v.ocInsurer}</span>
        <div class="card-title">2. Powiadomienie ubezpieczyciela OC</div>
        <div class="card-desc">Przekazujemy dane nabywcy automatycznie po podpisie.</div>
      </div>
      <button type="button" class="btn btn--success" data-go="auto_done">Wyślij jednym kliknięciem →</button>
    `;
  }

  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="auto_choice">← Wróć</button>
      <span class="status-chip status-chip--info">BLIK 0 zł prowizji</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Załatw 3 sprawy naraz</h1>

    <div class="card">
      <div class="sub-nav-row"><span class="kicker">1 · ${v.taxOffice}</span><strong>${pcc},00 zł</strong></div>
      <div class="card-title">Podatek PCC-3 (2% od ceny auta)</div>
    </div>
    <div class="card">
      <div class="sub-nav-row"><span class="kicker">2 · ${v.office}</span><strong>66,50 zł</strong></div>
      <div class="card-title">Rejestracja ${v.plate} bez wymiany tablic</div>
    </div>
    <div class="card">
      <div class="sub-nav-row"><span class="kicker">3 · ${v.ocInsurer}</span><strong>0,00 zł</strong></div>
      <div class="card-title">Przepisanie polisy OC na kupującego</div>
    </div>
    <div class="card card--elevated">
      <div class="sub-nav-row"><span class="card-title">Razem do zapłaty</span><strong style="font-size:18px;color:var(--brand-cobalt)">${total} zł</strong></div>
      <button type="button" class="btn btn--success" data-go="auto_done">Zatwierdź i opłać BLIK →</button>
    </div>
  `;
}

function renderAutoDone() {
  const v = state.selectedVehicle;
  return `
    <div class="card card--soft-emerald" style="text-align:center;align-items:center;padding:20px">
      <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Załatwione w 1 min 48 s ✓</h1>
      <p class="card-desc">
        ${state.carRole === "seller"
          ? `Zbycie pojazdu ${v.plate} zgłoszone do urzędu i ${v.ocInsurer}. Umowa i UPO czekają w Dokumentach.`
          : `Podatek i rejestracja opłacone. Tymczasowy dowód mPojazd (${v.plate}) jest już w Twoich Dokumentach.`}
      </p>
    </div>
    <div class="card">
      <span class="kicker">Zapisane w Dokumentach</span>
      <div class="card-title">Umowa cyfrowa + Urzędowe potwierdzenie (UPO)</div>
      <div class="card-desc">${v.makeModel} · VIN ${v.vin}</div>
    </div>
    <button type="button" class="btn btn--primary" data-back="hub">Wróć na ekran główny</button>
  `;
}

function renderHospital() {
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <span class="status-chip status-chip--danger">Zbliżenie NFC · 5 s</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Przyjęcie do szpitala</h1>

    <div class="card">
      <span class="kicker">Wykryty terminal: UCK w Gdańsku (SOR)</span>
      <div class="card-desc">Zamiast wypełniać 4 papierowe ankiety, przekażesz lekarzowi gotowy pakiet danych z IKP.</div>
    </div>

    <div class="card card--critical">
      <span class="kicker" style="color:var(--brand-crimson)">Ważny alert ratunkowy (IKP)</span>
      <div class="card-title">Alergia: Penicylina · Grupa krwi A Rh+</div>
      <div class="card-desc">Stałe leki: Bisocard 5 mg (1×1), Metformax 500 mg (2×1).</div>
    </div>

    <div class="card">
      <div class="card-title">Upoważnienie bliskiej osoby</div>
      <div class="card-desc">Anna Kowalska (Żona · 602 ••• 814) — otrzyma dostęp do informacji o Twoim stanie zdrowia.</div>
    </div>

    <button type="button" class="btn btn--crimson" data-go="hospital_done">Przekaż dane szpitalowi przez NFC →</button>
  `;
}

function renderHospitalDone() {
  return `
    <div class="card card--soft-emerald" style="text-align:center;align-items:center">
      <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Przekazano w 4,2 s ✓</h1>
      <p class="card-desc">Zastąpiono 4 papierowe formularze na Izbie Przyjęć.</p>
    </div>
    <div class="card">
      <div class="card-desc">
        <strong>System lekarza</strong> zablokował leki z grupy penicylin.<br>
        <strong>Anna Kowalska</strong> dostała w aplikacji numer sali (204) i cyfrową przepustkę.<br>
        <strong>Po wypisie:</strong> e-Zwolnienie i lista leków pojawią się automatycznie.
      </div>
    </div>
    <div class="card card--dark">
      <span class="kicker">Karta ratunkowa na ekranie blokady</span>
      <div class="card-desc">Widoczna dla ratownika bez odblokowania telefonu (grupa krwi, alergie, numer ICE).</div>
    </div>
    <button type="button" class="btn btn--primary" data-back="hub">Wróć na ekran główny</button>
  `;
}

function renderServicesItems(query) {
  const q = String(query || "").trim().toLowerCase();
  const filtered = q
    ? SERVICES_CATALOG.filter(s => `${s.title} ${s.desc} ${s.keywords}`.toLowerCase().includes(q))
    : SERVICES_CATALOG;

  if (!filtered.length) {
    return `<div class="card"><div class="card-desc">Brak usług pasujących do „${q}”. Wyczyść filtr lub zapytaj Asystenta.</div></div>`;
  }
  return filtered.map(i => `
    <button type="button" class="row-item row-btn" data-go="${i.go}">
      <div style="display:flex;gap:12px;align-items:center">
        <span class="icon-box ${i.colorCls}">${ICONS[i.iconKey] || ICONS.layers}</span>
        <div>
          <div class="card-title" style="font-size:14px">${i.title}</div>
          <div class="card-desc">${i.desc}</div>
        </div>
      </div>
      <span aria-hidden="true" style="color:var(--text-muted)">→</span>
    </button>
  `).join("");
}

function renderZeroHub() {
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <span class="status-chip status-chip--ok">${SERVICES_CATALOG.length} usług · Bez ankiet</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Usługi bez formularzy</h1>

    <search>
      <form class="services-search-box" id="services-search-form">
        <span aria-hidden="true" style="color:var(--text-muted);display:grid;place-items:center">${ICONS.search}</span>
        <label for="services-search-input" class="visually-hidden">Szukaj usługi</label>
        <input id="services-search-input" name="q" class="services-search-input" type="search" value="${state.servicesQuery}" placeholder="Szukaj (np. hipoteka, bank, emerytura, auto)" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
      </form>
    </search>

    <div id="services-list-container" style="display:flex;flex-direction:column;gap:9px">
      ${renderServicesItems(state.servicesQuery)}
    </div>
  `;
}

function renderScenarioDetail(kind) {
  const map = {
    crash: {
      title: "mStłuczka 2.0 (Offline i UE)",
      kicker: "Działa również bez zasięgu i z autem z zagranicy",
      desc: "Połącz telefony kierowców lokalnie przez NFC lub Bluetooth w garażu albo poza miastem — zgłoszenie wyśle się po odzyskaniu sieci.",
      bullets: [
        "Sparowano lokalnie: Opel GD 4829X ⇄ BMW (DE · B-MW 4021)",
        "3 zdjęcia uszkodzeń do wstępnej wyceny szkody",
        "Automatyczne zgłoszenie do OC sprawcy i auto zastępcze"
      ]
    },
    job: {
      title: "Pierwszy dzień w pracy",
      kicker: "Pracodawca: LPP S.A.",
      desc: "Przekaż kadrom komplet dokumentów bez drukowania świadectw pracy i PIT-2.",
      bullets: [
        "Dane osobowe z rejestru PESEL",
        "Dyplom uczelni i staż urlopowy z PUE ZUS",
        "Ważne orzeczenie medycyny pracy z IKP i e-PIT-2"
      ]
    },
    bereave: {
      title: "Wsparcie po stracie bliskiego",
      kicker: "Odebrano e-Kartę zgonu ze szpitala",
      desc: "Jedno zatwierdzenie załatwia formalności w 6 instytucjach bez chodzenia po okienkach.",
      bullets: [
        "Akt zgonu w USC i ochrona numeru PESEL",
        "Zasiłek pogrzebowy ZUS (7 000 zł w 24 h)",
        "Powiadomienie banków oraz przepisanie liczników mediów"
      ]
    },
    birth: {
      title: "Narodziny dziecka (4 w 1)",
      kicker: "Odebrano kartę urodzenia ze szpitala",
      desc: "Zarejestruj dziecko z domu jednym podpisem.",
      bullets: [
        "Wybór imienia i akt urodzenia w USC",
        "Automatyczny numer PESEL i meldunek",
        "Wniosek o świadczenie 800+ w ZUS"
      ]
    }
  };
  const cfg = map[kind];
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="zero_hub">← Usługi</button>
      <span class="status-chip status-chip--ok">Gotowe</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">${cfg.title}</h1>
    <div class="card">
      <span class="kicker">${cfg.kicker}</span>
      <div class="card-desc">${cfg.desc}</div>
    </div>
    <div class="card">
      ${cfg.bullets.map(b => `<div class="card-desc">✓ <strong>${b}</strong></div>`).join("")}
    </div>
    <button type="button" class="btn btn--success" data-go="auto_done">Zatwierdź i wyślij →</button>
  `;
}

function renderTranslator() {
  return `
    <div class="sub-nav-row">
      <button type="button" class="back-chip" data-back="hub">← Wróć</button>
      <span class="status-chip status-chip--info">Wyjaśnienie w 3 pkt</span>
    </div>
    <h1 id="phone-main-heading" tabindex="-1" class="screen-h1">Pismo z urzędu</h1>
    <div class="card">
      <span class="kicker">ZUS Oddział w Gdańsku</span>
      <div class="card-title">Wezwanie do uzupełnienia braków</div>
    </div>
    <div class="card card--elevated">
      <div class="card-desc"><strong>1. O co chodzi?</strong> Urząd prosi o potwierdzenie zarobków za 2018 r. (druk ERP-7), aby wyliczyć wyższe świadczenie.</div>
      <div class="card-desc"><strong>2. Ile masz czasu?</strong> <span style="color:var(--warn-text);font-weight:700">Zostało 5 dni (do 01.12.2026)</span>.</div>
      <div class="card-desc"><strong>3. Co jest gotowe?</strong> Pobraliśmy Twój PIT-11 i raporty z PUE ZUS do gotowej odpowiedzi.</div>
    </div>
    <button type="button" class="btn btn--primary" data-go="auto_done">Wyślij gotową odpowiedź →</button>
  `;
}


export {
  renderPromptPill,
  renderHub,
  renderCallerShield,
  renderKw,
  renderPension,
  renderMFirma,
  renderAutoChoice,
  renderAutoP2P,
  renderAutoScan,
  renderAutoBundle,
  renderAutoDone,
  renderHospital,
  renderHospitalDone,
  renderServicesItems,
  renderZeroHub,
  renderScenarioDetail,
  renderTranslator
};
