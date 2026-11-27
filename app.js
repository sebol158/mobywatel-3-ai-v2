import {
  lookupVehicleByPlate,
  COUNTERPARTY,
  SIMULATED_PUSH_INVOICE,
  WALLET_DOCUMENTS,
  CHILDREN_DOCUMENTS,
  SCANNED_DOC_TEMPLATES,
  TOUR_STEPS,
  SVG_EXPORTS
} from "./data.js";
import {
  state,
  screenEl,
  dialogEl,
  dialogContentEl,
  tourPopover,
  toggleColorScheme,
  toggleContrastByMode,
  announce,
  openModal,
  navigateTo,
  updateShellChrome,
  wireAccessibleTabs,
  registerRenderAll
} from "./core.js";
import {
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
} from "./screens-main.js";
import {
  renderZnak,
  renderTracker,
  renderAssistant,
  renderSenior,
  generateSampleSignatureDataUrl,
  buildSignedPdfBlob,
  triggerPdfDownload,
  renderDocScanSign
} from "./screens-wallet.js";

export { navigateTo };

function renderAll() {
  updateShellChrome();

  const renderers = {
    hub: renderHub,
    mfirma: renderMFirma,
    caller_shield: renderCallerShield,
    kw: renderKw,
    pension: renderPension,
    auto_choice: renderAutoChoice,
    auto_p2p: renderAutoP2P,
    auto_scan: renderAutoScan,
    auto_bundle: renderAutoBundle,
    auto_done: renderAutoDone,
    hospital: renderHospital,
    hospital_done: renderHospitalDone,
    zero_hub: renderZeroHub,
    crash: () => renderScenarioDetail("crash"),
    job: () => renderScenarioDetail("job"),
    bereave: () => renderScenarioDetail("bereave"),
    birth: () => renderScenarioDetail("birth"),
    translator: renderTranslator,
    znak: renderZnak,
    tracker: renderTracker,
    assistant: renderAssistant,
    senior: renderSenior,
    doc_scan_sign: renderDocScanSign
  };

  screenEl.innerHTML = (renderers[state.screen] || renderHub)();
  wireAccessibleTabs(screenEl);
  bindScreenEvents();
}

function bindScreenEvents() {
  screenEl.querySelectorAll("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => navigateTo(btn.dataset.go, "forward"));
  });
  screenEl.querySelectorAll("[data-back]").forEach(btn => {
    btn.addEventListener("click", () => navigateTo(btn.dataset.back, "backward"));
  });

  const hubThemeBtn = document.getElementById("btn-hub-theme");
  if (hubThemeBtn) hubThemeBtn.addEventListener("click", toggleColorScheme);
  const hubContrastBtn = document.getElementById("btn-hub-contrast");
  if (hubContrastBtn) hubContrastBtn.addEventListener("click", () => toggleContrastByMode());
  const senContrastBtn = document.getElementById("btn-senior-contrast");
  if (senContrastBtn) senContrastBtn.addEventListener("click", () => toggleContrastByMode());

  // Live services filtering without re-rendering input (preserves focus)
  const searchInput = document.getElementById("services-search-input");
  const listContainer = document.getElementById("services-list-container");
  if (searchInput && listContainer) {
    searchInput.addEventListener("input", () => {
      state.servicesQuery = searchInput.value;
      listContainer.innerHTML = renderServicesItems(state.servicesQuery);
      listContainer.querySelectorAll("[data-go]").forEach(btn => {
        btn.addEventListener("click", () => navigateTo(btn.dataset.go, "forward"));
      });
    });
  }
  const searchForm = document.getElementById("services-search-form");
  if (searchForm) searchForm.addEventListener("submit", e => e.preventDefault());

  // Caller shield
  screenEl.querySelectorAll("[data-caller-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.callerIsSpoof = btn.dataset.callerMode === "spoof";
      renderAll();
    });
  });
  const repCallerBtn = document.getElementById("btn-report-caller");
  if (repCallerBtn) {
    repCallerBtn.addEventListener("click", () => {
      state.callerReported = true;
      announce("Numer oszusta zgłoszony do CERT Polska");
      renderAll();
    });
  }

  // KW 2.0
  const kwAlertBtn = document.getElementById("btn-toggle-kw-alert");
  if (kwAlertBtn) {
    kwAlertBtn.addEventListener("click", () => {
      state.kwAlertEnabled = !state.kwAlertEnabled;
      renderAll();
    });
  }
  const clearMortBtn = document.getElementById("btn-clear-mortgage");
  if (clearMortBtn) {
    clearMortBtn.addEventListener("click", () => {
      state.mortgageCleared = true;
      announce("Wniosek o wykreślenie hipoteki wysłany do sądu");
      renderAll();
    });
  }

  // Pension simulator
  screenEl.querySelectorAll("[data-pension-sim]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.pensionPlus2Y = btn.dataset.pensionSim === "plus2";
      renderAll();
    });
  });

  // Start firmy 1 Okienko
  const pkdIn = document.getElementById("biz-pkd-input");
  if (pkdIn) pkdIn.addEventListener("input", (e) => { state.bizPkdDesc = e.target.value; });
  const createBizBtn = document.getElementById("btn-create-biz");
  if (createBizBtn) {
    createBizBtn.addEventListener("click", () => {
      state.bizCreated = true;
      announce("Założono firmę w CEIDG, VAT, ZUS i KSeF");
      renderAll();
    });
  }

  screenEl.querySelectorAll("[data-car-role]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.carRole = btn.dataset.carRole;
      renderAll();
    });
  });

  const fetchPlateBtn = document.getElementById("btn-fetch-plate");
  if (fetchPlateBtn) {
    fetchPlateBtn.addEventListener("click", () => {
      const val = document.getElementById("plate-input").value;
      state.selectedVehicle = lookupVehicleByPlate(val);
      state.contractPrice = state.selectedVehicle.defaultPrice;
      state.contractMileage = state.selectedVehicle.mileage;
      announce(`Pobrano dane pojazdu ${state.selectedVehicle.makeModel}`);
      renderAll();
    });
  }

  screenEl.querySelectorAll("[data-quick-plate]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedVehicle = lookupVehicleByPlate(btn.dataset.quickPlate);
      state.contractPrice = state.selectedVehicle.defaultPrice;
      state.contractMileage = state.selectedVehicle.mileage;
      renderAll();
    });
  });

  const priceIn = document.getElementById("price-input");
  if (priceIn) priceIn.addEventListener("input", (e) => { state.contractPrice = Number(String(e.target.value).replace(/\D/g, "") || 0); });
  const milIn = document.getElementById("mileage-input");
  if (milIn) milIn.addEventListener("input", (e) => { state.contractMileage = Number(String(e.target.value).replace(/\D/g, "") || 0); });

  const genContractBtn = document.getElementById("btn-generate-contract");
  if (genContractBtn) {
    genContractBtn.addEventListener("click", () => {
      const v = state.selectedVehicle;
      openModal("Cyfrowa umowa kupna-sprzedaży", `
        <p><strong>Zawarta 26.11.2026 o godz. 09:41 w Gdańsku</strong></p>
        <p><strong>Strona 1:</strong> Sebastian M. (mDowód)<br>
        <strong>Strona 2:</strong> ${COUNTERPARTY.name} (${COUNTERPARTY.peselMasked})</p>
        <p><strong>Pojazd:</strong> ${v.makeModel} (${v.year}), nr rej. <strong>${v.plate}</strong>, VIN <code>${v.vin}</code>, przebieg <strong>${state.contractMileage} km</strong>.</p>
        <p><strong>Cena:</strong> <strong>${state.contractPrice} zł</strong>. ${v.liens}.</p>
        <button type="button" class="btn btn--success" id="modal-sign-qes">Podpisz bezpłatnym QES i przejdź dalej →</button>
      `);
      document.getElementById("modal-sign-qes").addEventListener("click", () => {
        dialogEl.close();
        navigateTo("auto_bundle", "forward");
      });
    });
  }

  screenEl.querySelectorAll("[data-ksef-preview]").forEach(btn => {
    btn.addEventListener("click", () => {
      const inv = state.ksefInvoices.find(x => x.id === btn.dataset.ksefPreview);
      if (!inv) return;
      openModal(`Faktura KSeF · ${inv.id}`, `
        <p><strong>Numer KSeF:</strong> <code>${inv.ksefNo}</code></p>
        <p><strong>Wystawca:</strong> ${inv.seller} (NIP ${inv.nip})<br>
        <strong>Kwota brutto:</strong> ${inv.gross} (netto: ${inv.net})</p>
        <div class="card" style="background:var(--cobalt-soft)">
          <strong>Załącznik FA(3):</strong><br>${inv.attachment}
        </div>
      `);
    });
  });

  screenEl.querySelectorAll("[data-ksef-pay]").forEach(btn => {
    btn.addEventListener("click", () => {
      const inv = state.ksefInvoices.find(x => x.id === btn.dataset.ksefPay);
      if (inv) {
        inv.status = "paid";
        renderAll();
      }
    });
  });

  screenEl.querySelectorAll("[data-ksef-report]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.ksefInvoices = state.ksefInvoices.filter(x => x.id !== btn.dataset.ksefReport);
      openModal("Zgłoszono fakturę do KAS", `
        <p>Faktura od <strong>FHU Widmo Consulting (12 300,00 zł)</strong> została oznaczona jako podejrzana i zablokowana przed księgowaniem.</p>
      `);
      renderAll();
    });
  });

  screenEl.querySelectorAll("[data-box]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.doreczeniaBox = btn.dataset.box;
      renderAll();
    });
  });

  screenEl.querySelectorAll("[data-toggle-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = state.delegations.find(d => d.id === btn.dataset.toggleDel);
      if (item) {
        item.enabled = !item.enabled;
        renderAll();
      }
    });
  });

  const qesB2bBtn = document.getElementById("btn-test-qes-b2b");
  if (qesB2bBtn) {
    qesB2bBtn.addEventListener("click", () => {
      openModal("Podpisano paczkę dokumentów B2B", `
        <p>Podpisano umowę B2B oraz plik JPK z weryfikacją reprezentacji w KRS i sprawdzeniem numeru konta na Białej Liście VAT.</p>
      `);
    });
  }

  const aiBtn1 = document.getElementById("btn-toggle-ai-mode");
  const aiBtn2 = document.getElementById("btn-toggle-ai-mode-chat");
  [aiBtn1, aiBtn2].forEach(b => {
    if (b) b.addEventListener("click", () => {
      state.aiOptIn = !state.aiOptIn;
      renderAll();
    });
  });

  screenEl.querySelectorAll("[data-report-log]").forEach(btn => {
    btn.addEventListener("click", () => {
      openModal("Zgłoszono nietypowe zapytanie", `
        <p>Zapytanie od <strong>Nieznany Pośrednik Sp. z o.o.</strong> zostało zabezpieczone i zgłoszone do weryfikacji.</p>
      `);
    });
  });

  const replyToPrompt = (q, shouldRender = true) => {
    state.chatMessages.push({ role: "user", text: q });
    let ans = "W trybie z rejestrami mogę od razu otworzyć odpowiednią sprawę bez wpisywania danych ręcznie.";
    if (/auto|umow|pojazd/i.test(q)) ans = "Otwórz „Kupno lub sprzedaż auta”: możesz zeskanować papierową umowę albo utworzyć cyfrową umowę P2P po wpisaniu rejestracji.";
    else if (/bank|blik|dzwon|oszust/i.test(q)) ans = "Użyj Tarczy „Kto dzwoni?” w Usługach — jeśli nie widzisz tam potwierdzenia z banku, to próba oszustwa. Rozłącz się od razu.";
    else if (/dzieck|dzieci|legitymacj/i.test(q)) ans = "W zakładce „Dokumenty” otwórz kartę „Dowody dzieci (2)” — znajdziesz tam mDowód i mLegitymację Zosi i Leona, IKP oraz zgodę na wyjazd/odbiór.";
    else if (/szpital|sor|lek/i.test(q)) ans = "W „Szpital i SOR” przekażesz przez telefon ubezpieczenie, alergie z IKP i upoważnienie bliskiego w 5 sekund.";
    else if (/ksef|faktur|firm/i.test(q)) ans = "Przełącz na „mFirma” u góry ekranu — tam czekają faktury KSeF z załącznikami, e-Doręczenia oraz 1 Okienko startu firmy.";
    state.chatMessages.push({ role: "ai", text: ans });
    if (shouldRender) renderAll();
  };

  screenEl.querySelectorAll("[data-expand-doc]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.expandDoc;
      state.expandedDocId = state.expandedDocId === targetId ? null : targetId;
      renderAll();
    });
  });

  const toggleDataBtn = document.getElementById("btn-toggle-mdowod-data");
  if (toggleDataBtn) {
    toggleDataBtn.addEventListener("click", () => {
      state.showMdowodData = !state.showMdowodData;
      renderAll();
    });
  }

  const togglePeselBtn = document.getElementById("btn-toggle-pesel-lock");
  if (togglePeselBtn) {
    togglePeselBtn.addEventListener("click", () => {
      state.peselLocked = !state.peselLocked;
      renderAll();
    });
  }

  const openZnakModal = () => {
    openModal("Potwierdzenie wieku 18+ (ZKP)", `
      <div class="card card--dark" style="align-items:center;text-align:center">
        <span class="kicker">Podwójnie ślepa weryfikacja wieku</span>
        <div style="font-size:32px;margin:4px 0">18+ TAK ✓</div>
        <div class="card-desc">Sklep widzi wyłącznie potwierdzenie wieku bez imienia i numeru PESEL, a państwo nie zapisuje, gdzie użyto weryfikacji.</div>
      </div>
    `);
  };
  const znakModalBtn = document.getElementById("btn-open-znak-modal");
  const headerZnakBtn = document.getElementById("btn-header-znak-qr");
  if (znakModalBtn) znakModalBtn.addEventListener("click", openZnakModal);
  if (headerZnakBtn) headerZnakBtn.addEventListener("click", openZnakModal);

  screenEl.querySelectorAll("[data-select-child]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedChildId = btn.dataset.selectChild;
      const ch = CHILDREN_DOCUMENTS.find(c => c.id === state.selectedChildId);
      announce(ch ? `Wybrano dokument dziecka: ${ch.fullName}` : "Zmieniono dokument dziecka");
      renderAll();
    });
  });

  const toggleChildBtn = document.getElementById("btn-toggle-child-data");
  if (toggleChildBtn) {
    toggleChildBtn.addEventListener("click", () => {
      state.showChildData = !state.showChildData;
      renderAll();
    });
  }

  const childIkpBtn = document.getElementById("btn-child-ikp");
  if (childIkpBtn) {
    childIkpBtn.addEventListener("click", () => {
      const ch = CHILDREN_DOCUMENTS.find(c => c.id === state.selectedChildId) || CHILDREN_DOCUMENTS[0];
      openModal(`Karta IKP i eWUŚ · ${ch.fullName}`, `
        <div class="card card--soft-emerald">
          <strong>Ubezpieczenie NFZ (eWUŚ): AKTYWNE ✓</strong>
          <div class="card-desc">Zgłoszenie rodzinne rodzica: Sebastian M.</div>
        </div>
        <p><strong>Dane kliniczne dziecka:</strong> ${ch.bloodAndAllergy}</p>
        <p><strong>Placówka oświatowa:</strong> ${ch.schoolBadge}</p>
        <p class="card-desc">Gotowe do bezkontaktowego odczytu NFC w rejestracji przychodni lub na SOR.</p>
      `);
    });
  }

  const childConsentBtn = document.getElementById("btn-child-consent");
  if (childConsentBtn) {
    childConsentBtn.addEventListener("click", () => {
      const ch = CHILDREN_DOCUMENTS.find(c => c.id === state.selectedChildId) || CHILDREN_DOCUMENTS[0];
      openModal(`Zgoda na odbiór / wyjazd · ${ch.firstName}`, `
        <p><strong>Dziecko:</strong> ${ch.fullName} (PESEL <code>${ch.pesel}</code>, ${ch.series})</p>
        <p><strong>Rodzic / Opiekun:</strong> ${ch.guardian}</p>
        <div class="card card--soft-amber">
          <strong>Upoważnienie jednorazowe / wyjazdowe</strong>
          <div class="card-desc">Upoważniona osoba: <strong>Barbara M. (Babcia)</strong> · Zakres: odbiór ze szkoły/przedszkola oraz podróż krajowa PKP do 30.11.2026.</div>
        </div>
        <button type="button" class="btn btn--primary" id="modal-child-pdf">Podpisz Profilem Zaufanym i pobierz PDF →</button>
      `);
      document.getElementById("modal-child-pdf").addEventListener("click", () => {
        dialogEl.close();
        navigateTo("doc_scan_sign", "forward");
      });
    });
  }

  const allDocsBtn = document.getElementById("btn-all-docs-modal");
  if (allDocsBtn) {
    allDocsBtn.addEventListener("click", () => {
      openModal("Wszystkie dokumenty (7)", `
        <div style="display:flex;flex-direction:column;gap:6px">
          ${WALLET_DOCUMENTS.map(d => `
            <button type="button" class="row-item row-btn" data-pick-doc="${d.id}" style="min-block-size:48px">
              <strong>${d.title}</strong>
              <span>${state.expandedDocId === d.id ? "Aktywny ✓" : "Pokaż"}</span>
            </button>
          `).join("")}
          <div class="row-item card--soft-emerald">
            <div>
              <div class="card-title" style="font-size:13px">mKarta Pobytu / CUKR ✓</div>
              <div class="card-desc" style="font-size:11.5px">Cyfrowy dokument dla legalnych rezydentów</div>
            </div>
            <span class="status-chip status-chip--ok">EUDI</span>
          </div>
          <button type="button" class="row-item row-btn card--critical" id="btn-modal-go-ekuz" style="min-block-size:48px">
            <strong>EKUZ i Karta Ratunkowa ICE</strong>
            <span>Szpital 5 s →</span>
          </button>
        </div>
      `);
      dialogContentEl.querySelectorAll("[data-pick-doc]").forEach(b => {
        b.addEventListener("click", () => {
          state.expandedDocId = b.dataset.pickDoc;
          dialogEl.close();
          renderAll();
        });
      });
      const goEkuz = document.getElementById("btn-modal-go-ekuz");
      if (goEkuz) {
        goEkuz.addEventListener("click", () => {
          dialogEl.close();
          navigateTo("hospital", "forward");
        });
      }
    });
  }

  screenEl.querySelectorAll('[data-prompt-form="true"]').forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = form.querySelector("input");
      const val = inp ? inp.value.trim() : "";
      if (val) replyToPrompt(val, false);
      navigateTo("assistant", "forward");
    });
  });

  screenEl.querySelectorAll("[data-ask]").forEach(btn => {
    btn.addEventListener("click", () => replyToPrompt(btn.dataset.ask));
  });

  const chatForm = document.getElementById("chat-form");
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = document.getElementById("chat-input");
      if (inp && inp.value.trim()) replyToPrompt(inp.value.trim());
    });
  }

  const exitSen = document.getElementById("btn-exit-senior");
  if (exitSen) {
    exitSen.addEventListener("click", () => {
      state.seniorMode = false;
      navigateTo("hub", "backward");
    });
  }

  const proxyBtn = document.getElementById("btn-senior-proxy");
  if (proxyBtn) {
    proxyBtn.addEventListener("click", () => {
      openModal("Jednorazowy podgląd dla bliskiego", `
        <p>Wysłano bezpieczną prośbę o pomoc do: <strong>Marek Kowalski (Syn)</strong>.</p>
        <p>Bliski widzi tylko roboczy wniosek — bez dostępu do Twojego dowodu, PIN-u i banku.</p>
      `);
    });
  }

  // Skaner dokumentów -> PDF + ręczny podpis + Profil Zaufany + Wyślij do
  screenEl.querySelectorAll("[data-scan-tpl]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.scanDoc.templateId = btn.dataset.scanTpl;
      state.scanDoc.uploadedImageUrl = null;
      state.scanDoc.uploadedFileName = null;
      state.scanDoc.pzSigned = false;
      state.scanDoc.sentStatus = null;
      renderAll();
    });
  });

  const scanFileIn = document.getElementById("scan-file-input");
  if (scanFileIn) {
    scanFileIn.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      state.scanDoc.uploadedImageUrl = URL.createObjectURL(file);
      state.scanDoc.uploadedFileName = file.name;
      state.scanDoc.pzSigned = false;
      state.scanDoc.sentStatus = null;
      announce(`Wczytano skan dokumentu ${file.name}`);
      renderAll();
    });
  }

  const sigPad = document.getElementById("sig-pad");
  if (sigPad) {
    const ctx = sigPad.getContext("2d");
    let drawing = false;
    const getPt = (ev) => {
      const rect = sigPad.getBoundingClientRect();
      return {
        x: ((ev.clientX - rect.left) / rect.width) * sigPad.width,
        y: ((ev.clientY - rect.top) / rect.height) * sigPad.height
      };
    };
    sigPad.addEventListener("pointerdown", (ev) => {
      if (ev.button !== 0) return;
      drawing = true;
      sigPad.setPointerCapture(ev.pointerId);
      const pt = getPt(ev);
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
    });
    sigPad.addEventListener("pointermove", (ev) => {
      if (!drawing) return;
      const pt = getPt(ev);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
    });
    const finishStroke = () => {
      if (!drawing) return;
      drawing = false;
      state.scanDoc.sigDataUrl = sigPad.toDataURL("image/png");
      const stampImg = document.querySelector("#sig-stamp-handle img");
      if (stampImg) stampImg.src = state.scanDoc.sigDataUrl;
    };
    sigPad.addEventListener("pointerup", finishStroke);
    sigPad.addEventListener("lostpointercapture", finishStroke);
  }

  const clearSigBtn = document.getElementById("btn-sig-clear");
  if (clearSigBtn && sigPad) {
    clearSigBtn.addEventListener("click", () => {
      const ctx = sigPad.getContext("2d");
      ctx.clearRect(0, 0, sigPad.width, sigPad.height);
      state.scanDoc.sigDataUrl = sigPad.toDataURL("image/png");
      const stampImg = document.querySelector("#sig-stamp-handle img");
      if (stampImg) stampImg.src = state.scanDoc.sigDataUrl;
      announce("Wyczyszczono pole podpisu");
    });
  }

  const sampleSigBtn = document.getElementById("btn-sig-sample");
  if (sampleSigBtn) {
    sampleSigBtn.addEventListener("click", () => {
      state.scanDoc.sigDataUrl = generateSampleSignatureDataUrl();
      const stampImg = document.querySelector("#sig-stamp-handle img");
      if (stampImg) stampImg.src = state.scanDoc.sigDataUrl;
      announce("Przywrócono przykładowy podpis Sebastian M.");
    });
  }

  // Przeciąganie pieczęci podpisu na arkuszu A4 + klawiatura + przyciski narożne
  const sheetEl = document.getElementById("pdf-sheet-preview");
  const stampEl = document.getElementById("sig-stamp-handle");
  if (sheetEl && stampEl) {
    const clampStamp = (nx, ny) => {
      const maxX = Math.max(8, sheetEl.clientWidth - stampEl.offsetWidth - 8);
      const maxY = Math.max(8, sheetEl.clientHeight - stampEl.offsetHeight - 8);
      state.scanDoc.sigX = Math.max(8, Math.min(maxX, nx));
      state.scanDoc.sigY = Math.max(8, Math.min(maxY, ny));
      stampEl.style.left = `${state.scanDoc.sigX}px`;
      stampEl.style.top = `${state.scanDoc.sigY}px`;
    };

    let dragState = null;
    stampEl.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      stampEl.setPointerCapture(e.pointerId);
      stampEl.classList.add("dragging");
      dragState = {
        startX: e.clientX,
        startY: e.clientY,
        originX: state.scanDoc.sigX,
        originY: state.scanDoc.sigY
      };
    });
    stampEl.addEventListener("pointermove", (e) => {
      if (!dragState) return;
      clampStamp(
        dragState.originX + (e.clientX - dragState.startX),
        dragState.originY + (e.clientY - dragState.startY)
      );
    });
    const endDrag = () => {
      if (!dragState) return;
      dragState = null;
      stampEl.classList.remove("dragging");
      announce(`Ustawiono podpis na pozycji X ${Math.round(state.scanDoc.sigX)}, Y ${Math.round(state.scanDoc.sigY)}`);
    };
    stampEl.addEventListener("pointerup", endDrag);
    stampEl.addEventListener("lostpointercapture", endDrag);

    stampEl.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 16 : 6;
      if (e.key === "ArrowLeft") { e.preventDefault(); clampStamp(state.scanDoc.sigX - step, state.scanDoc.sigY); }
      else if (e.key === "ArrowRight") { e.preventDefault(); clampStamp(state.scanDoc.sigX + step, state.scanDoc.sigY); }
      else if (e.key === "ArrowUp") { e.preventDefault(); clampStamp(state.scanDoc.sigX, state.scanDoc.sigY - step); }
      else if (e.key === "ArrowDown") { e.preventDefault(); clampStamp(state.scanDoc.sigX, state.scanDoc.sigY + step); }
      else return;
      announce(`Przesunięto podpis na X ${Math.round(state.scanDoc.sigX)}, Y ${Math.round(state.scanDoc.sigY)}`);
    });

    const posLeftBtn = document.getElementById("btn-pos-left");
    if (posLeftBtn) {
      posLeftBtn.addEventListener("click", () => {
        clampStamp(12, sheetEl.clientHeight - stampEl.offsetHeight - 10);
        announce("Przeniesiono podpis w lewy dolny róg dokumentu");
      });
    }
    const posRightBtn = document.getElementById("btn-pos-right");
    if (posRightBtn) {
      posRightBtn.addEventListener("click", () => {
        clampStamp(sheetEl.clientWidth - stampEl.offsetWidth - 10, sheetEl.clientHeight - stampEl.offsetHeight - 10);
        announce("Przeniesiono podpis w prawy dolny róg dokumentu");
      });
    }
  }

  const signPzBtn = document.getElementById("btn-sign-pz");
  if (signPzBtn) {
    signPzBtn.addEventListener("click", () => {
      state.scanDoc.pzSigned = true;
      announce("Podpisano dokument Profilem Zaufanym i wygenerowano plik PDF");
      renderAll();
    });
  }

  const dlPdfBtn = document.getElementById("btn-download-signed-pdf");
  if (dlPdfBtn) {
    dlPdfBtn.addEventListener("click", () => {
      const sd = state.scanDoc;
      const fname = `${sd.uploadedFileName ? sd.uploadedFileName.replace(/\.[^.]+$/, "") : sd.templateId}_podpisany_PZ.pdf`;
      triggerPdfDownload(buildSignedPdfBlob(), fname);
      announce(`Pobrano podpisany plik ${fname}`);
    });
  }

  const sendPdfBtn = document.getElementById("btn-send-signed-pdf");
  if (sendPdfBtn) {
    sendPdfBtn.addEventListener("click", () => {
      const sd = state.scanDoc;
      const fname = `${sd.uploadedFileName ? sd.uploadedFileName.replace(/\.[^.]+$/, "") : sd.templateId}_podpisany_PZ.pdf`;
      openModal("Wyślij podpisany dokument PDF", `
        <p class="card-desc">Plik <code>${fname}</code> z podpisem odręcznym oraz pieczęcią Profilu Zaufanego jest gotowy do wysyłki:</p>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button type="button" class="row-item row-btn" id="btn-send-edoreczenia">
            <div>
              <strong>🏛️ Urząd / e-Doręczenia (UPO)</strong><br>
              <span class="field-hint">Doręczenie rejestrowane + potwierdzenie UPO</span>
            </div>
            <span>Wyślij →</span>
          </button>

          <form id="send-email-form" class="row-item" style="flex-direction:column;align-items:stretch;gap:8px">
            <label for="send-email-input" class="field-label">✉️ Wyślij na adres e-mail</label>
            <div class="sub-nav-row">
              <input id="send-email-input" class="field-input" type="email" value="urzad@gdansk.pl" autocomplete="email" required style="flex:1">
              <button type="submit" class="btn btn--primary" style="inline-size:auto">Wyślij</button>
            </div>
          </form>

          <button type="button" class="row-item row-btn" id="btn-send-office">
            <div>
              <strong>💼 Księgowość / Kadry (SALDO)</strong><br>
              <span class="field-hint">Bezpośrednio do teczki biura lub działu HR</span>
            </div>
            <span>Wyślij →</span>
          </button>

          <button type="button" class="row-item row-btn" id="btn-send-native-share">
            <div>
              <strong>📱 Udostępnij systemowo (WhatsApp / Pliki)</strong><br>
              <span class="field-hint">Web Share API z bezpiecznym pobraniem PDF</span>
            </div>
            <span>Udostępnij →</span>
          </button>
        </div>
      `);

      const markSent = (msg) => {
        state.scanDoc.sentStatus = msg;
        dialogEl.close();
        announce(msg);
        renderAll();
      };

      document.getElementById("btn-send-edoreczenia").addEventListener("click", () => {
        markSent("✓ Wysłano przez e-Doręczenia · UPO nr EPUAP-2026-99412");
      });
      document.getElementById("send-email-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const addr = document.getElementById("send-email-input").value.trim() || "urzad@gdansk.pl";
        markSent(`✓ Wysłano PDF na adres: ${addr}`);
      });
      document.getElementById("btn-send-office").addEventListener("click", () => {
        markSent("✓ Przekazano do Księgowości / Kadr (SALDO)");
      });
      document.getElementById("btn-send-native-share").addEventListener("click", async () => {
        const blob = buildSignedPdfBlob();
        const file = new File([blob], fname, { type: "application/pdf" });
        if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
          try {
            await navigator.share({ title: fname, files: [file] });
            markSent("✓ Udostępniono PDF przez menu systemowe");
            return;
          } catch {
            // Anulowano lub brak obsługi plików -> pobranie PDF
          }
        }
        triggerPdfDownload(blob, fname);
        markSent(`✓ Pobrano PDF do udostępnienia (${fname})`);
      });
    });
  }
}

/* Guided Jury Tour (modern-web-guidance: persistent-app-tours) */
function renderTourStep() {
  const step = TOUR_STEPS[state.tourStep];
  document.getElementById("tour-step-counter").textContent = `POKAZ DLA JURY · KROK ${state.tourStep + 1} Z ${TOUR_STEPS.length}`;
  document.getElementById("tour-step-title").textContent = step.title;
  document.getElementById("tour-step-body").textContent = step.body;
  const prevBtn = document.getElementById("btn-tour-prev");
  const nextBtn = document.getElementById("btn-tour-next");
  prevBtn.disabled = state.tourStep === 0;
  nextBtn.textContent = state.tourStep === TOUR_STEPS.length - 1 ? "Zakończ ✓" : "Dalej →";
  navigateTo(step.screen, "forward");
}

function openTour() {
  state.tourStep = 0;
  state.tourOpen = true;
  renderTourStep();
  if (tourPopover && typeof tourPopover.showPopover === "function") {
    try { tourPopover.showPopover(); } catch {}
  } else if (tourPopover) {
    tourPopover.classList.add(":popover-open");
  }
  document.getElementById("btn-tour-next").focus();
}

function closeTour() {
  state.tourOpen = false;
  if (tourPopover && typeof tourPopover.hidePopover === "function") {
    try { tourPopover.hidePopover(); } catch {}
  } else if (tourPopover) {
    tourPopover.classList.remove(":popover-open");
  }
  document.getElementById("btn-start-tour").focus();
}

document.getElementById("btn-start-tour").addEventListener("click", openTour);
document.getElementById("btn-tour-prev").addEventListener("click", () => {
  if (state.tourStep > 0) {
    state.tourStep -= 1;
    renderTourStep();
  }
});
document.getElementById("btn-tour-next").addEventListener("click", () => {
  if (state.tourStep < TOUR_STEPS.length - 1) {
    state.tourStep += 1;
    renderTourStep();
  } else {
    closeTour();
  }
});
document.getElementById("btn-tour-close").addEventListener("click", closeTour);

/* Global Shell Controls */
document.getElementById("ctx-citizen").addEventListener("click", () => {
  state.context = "obywatel";
  navigateTo("hub", "backward");
});
document.getElementById("ctx-business").addEventListener("click", () => {
  state.context = "mfirma";
  navigateTo("mfirma", "forward");
});

document.querySelectorAll(".tab-item").forEach(btn => {
  btn.addEventListener("click", () => navigateTo(btn.dataset.nav, "forward"));
});

document.querySelectorAll(".flow-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.flow === "contrast_by") {
      toggleContrastByMode(true);
      navigateTo("hub", "forward");
      return;
    }
    if (btn.dataset.flow === "senior") state.seniorMode = true;
    navigateTo(btn.dataset.flow, "forward");
  });
});

document.getElementById("btn-sim-ksef").addEventListener("click", () => {
  if (!state.ksefInvoices.some(i => i.id === SIMULATED_PUSH_INVOICE.id)) {
    state.ksefInvoices.unshift({ ...SIMULATED_PUSH_INVOICE });
  }
  const toast = document.getElementById("phone-toast");
  toast.innerHTML = `<strong>Nowa faktura w KSeF:</strong> CloudPol Sp. z o.o. (4 920,00 zł) z załącznikiem PDF. Kliknij, aby otworzyć →`;
  toast.hidden = false;
  toast.onclick = () => {
    toast.hidden = true;
    state.mfirmaTab = "ksef";
    navigateTo("mfirma", "forward");
  };
  updateShellChrome();
});

document.getElementById("btn-sim-call").addEventListener("click", () => {
  state.callerIsSpoof = true;
  state.callerReported = false;
  const toast = document.getElementById("phone-toast");
  toast.innerHTML = `<strong>Połączenie przychodzące:</strong> „Dział Bezpieczeństwa Banku (+48 800 302 302)” — sprawdź w Tarczy!`;
  toast.hidden = false;
  toast.onclick = () => {
    toast.hidden = true;
    navigateTo("caller_shield", "forward");
  };
  navigateTo("caller_shield", "forward");
});

document.getElementById("btn-sim-dark").addEventListener("click", toggleColorScheme);
document.getElementById("btn-sim-contrast-by").addEventListener("click", () => toggleContrastByMode());

document.getElementById("btn-sim-offline").addEventListener("click", () => {
  state.offlineMode = !state.offlineMode;
  updateShellChrome();
});

document.getElementById("btn-sim-senior").addEventListener("click", () => {
  state.seniorMode = !state.seniorMode;
  if (state.seniorMode) navigateTo("senior", "forward");
  else renderAll();
});

document.getElementById("btn-open-svgs").addEventListener("click", () => {
  openModal("15 makiet .svg (Wersja 2.0 Calm UI) do Figmy", `
    <p>Przeciągnij pliki z <code>mobywatel-3-ai-v2/figma-svg/</code> na kanwę Figmy:</p>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${SVG_EXPORTS.map(s => `
        <a href="./figma-svg/${s.file}" download="${s.file}" class="row-item" style="text-decoration:none;color:var(--brand-cobalt);font-weight:700">
          <span>${s.title}</span>
          <span>Pobierz ↓</span>
        </a>
      `).join("")}
    </div>
  `);
});

registerRenderAll(renderAll);
renderAll();