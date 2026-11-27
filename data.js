export const VEHICLES = {
  GD4829X: {
    plate: "GD 4829X",
    makeModel: "Opel Astra V 1.4 Turbo",
    year: 2019,
    vin: "W0VBF6EH9JG128490",
    mileage: 84210,
    defaultPrice: 34500,
    ocInsurer: "PZU S.A.",
    ocPolicy: "PZU/2026/9821-442",
    ocValidTo: "14.05.2027",
    inspectionTo: "19.09.2027",
    liens: "Brak zastawów i zajęć w rejestrach",
    euPlatesOk: true,
    regFee: 66.5,
    regSaved: 93.5,
    office: "Urząd Miejski w Gdańsku",
    taxOffice: "Pierwszy Urząd Skarbowy w Gdańsku"
  },
  WA7712M: {
    plate: "WA 7712M",
    makeModel: "Toyota Corolla 1.8 Hybrid",
    year: 2021,
    vin: "SB1K93BE40E219044",
    mileage: 61400,
    defaultPrice: 68900,
    ocInsurer: "TUiR Warta S.A.",
    ocPolicy: "WAR/2026/4410-88",
    ocValidTo: "22.08.2027",
    inspectionTo: "10.10.2027",
    liens: "Brak zastawów i zajęć w rejestrach",
    euPlatesOk: true,
    regFee: 66.5,
    regSaved: 93.5,
    office: "Urząd m.st. Warszawy (Mokotów)",
    taxOffice: "Drugi Urząd Skarbowy Warszawa-Śródmieście"
  },
  KR9042P: {
    plate: "KR 9042P",
    makeModel: "Volkswagen Golf VIII 1.5 TSI",
    year: 2020,
    vin: "WVWZZZCDZLW099312",
    mileage: 92850,
    defaultPrice: 59000,
    ocInsurer: "ERGO Hestia S.A.",
    ocPolicy: "EHE/2026/7712-19",
    ocValidTo: "03.03.2027",
    inspectionTo: "04.06.2027",
    liens: "Brak zastawów i zajęć w rejestrach",
    euPlatesOk: true,
    regFee: 66.5,
    regSaved: 93.5,
    office: "Urząd Miasta Krakowa",
    taxOffice: "Urząd Skarbowy Kraków-Podgórze"
  }
};

export function lookupVehicleByPlate(raw) {
  const clean = String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (VEHICLES[clean]) return { ...VEHICLES[clean] };
  const formatted = String(raw || "PO 5120K").trim().toUpperCase() || "PO 5120K";
  return {
    plate: formatted,
    makeModel: "Škoda Octavia IV 2.0 TDI",
    year: 2021,
    vin: "TMBJJ7NX6MY" + (clean.slice(-6).padEnd(6, "4")),
    mileage: 73500,
    defaultPrice: 64000,
    ocInsurer: "PZU S.A.",
    ocPolicy: "PZU/2026/5520-118",
    ocValidTo: "30.06.2027",
    inspectionTo: "15.08.2027",
    liens: "Brak zastawów i zajęć w rejestrach",
    euPlatesOk: true,
    regFee: 66.5,
    regSaved: 93.5,
    office: "Wydział Komunikacji właściwy dla miejsca zamieszkania",
    taxOffice: "Pierwszy Urząd Skarbowy w Gdańsku"
  };
}

export const COUNTERPARTY = {
  name: "Tomasz Nowak",
  peselMasked: "890412•••••",
  mDowodSeries: "DHC •••412 (mDowód ważny)",
  peselLock: "PESEL niezastrzeżony w chwili umowy ✓",
  address: "ul. Kartuska 84/12, 80-122 Gdańsk"
};

export const INITIAL_KSEF_INVOICES = [
  {
    id: "FA3-77401",
    ksefNo: "5261040827-20261124-A8F120-4C",
    seller: "Energia Pomorze S.A.",
    nip: "583-000-11-29",
    gross: "1 476,00 zł",
    net: "1 200,00 zł",
    due: "05.12.2026",
    attachment: "Rozliczenie_PPE_Listopad_2026.xml (Załącznik FA(3))",
    status: "accepted",
    suspicious: false
  },
  {
    id: "FA3-00419",
    ksefNo: "8990012211-20261125-FF0019-9B",
    seller: "FHU Widmo Consulting",
    nip: "899-001-22-11",
    gross: "12 300,00 zł",
    net: "10 000,00 zł",
    due: "28.11.2026",
    attachment: "Brak załącznika · Nieznany wystawca spoza Twojej bazy",
    status: "flagged",
    suspicious: true
  }
];

export const SIMULATED_PUSH_INVOICE = {
  id: "FA3-88912",
  ksefNo: "5252811099-20261126-C9012E-1A",
  seller: "CloudPol Infrastruktura Sp. z o.o.",
  nip: "525-281-10-99",
  gross: "4 920,00 zł",
  net: "4 000,00 zł",
  due: "10.12.2026",
  attachment: "Specyfikacja_Serwerow_SLA_11_2026.pdf (Załącznik FA(3))",
  status: "new",
  suspicious: false
};

export const MDORECZENIA_ITEMS = {
  firma: [
    {
      sender: "Pierwszy Urząd Skarbowy w Gdańsku",
      title: "Wyjaśnienie JPK_V7M za październik 2026",
      ade: "AE:PL-58331-94402-JDG-01",
      daysElapsed: 12,
      daysLimit: 14,
      urgent: true,
      summary: "Urząd prosi o wyjaśnienie różnicy 240 zł. Zostało 47 godzin do automatycznego uznania pisma za doręczone."
    },
    {
      sender: "ZUS Inspektorat w Gdańsku",
      title: "Potwierdzenie salda składek (DRA)",
      ade: "AE:PL-58331-94402-JDG-01",
      daysElapsed: 3,
      daysLimit: 14,
      urgent: false,
      summary: "Wszystkie składki rozliczone — brak zaległości."
    }
  ],
  prywatna: [
    {
      sender: "ZUS Oddział w Gdańsku",
      title: "Brak druku ERP-7 do wniosku",
      ade: "AE:PL-11092-88412-CIT-01",
      daysElapsed: 2,
      daysLimit: 7,
      urgent: true,
      summary: "Brak zaświadczenia o zarobkach za 2018 r. Pobraliśmy Twój PIT-11 z PUE ZUS do gotowej odpowiedzi."
    }
  ]
};

export const INITIAL_DELEGATIONS = [
  { id: "upl1", label: "Podatki i JPK (UPL-1)", sub: "Dostęp nadany na NIP biura rachunkowego, nie na jedną osobę", enabled: true },
  { id: "ksef", label: "Faktury KSeF 2.0", sub: "Odbieranie i wysyłka faktur (certyfikat ważny od 2027 r.)", enabled: true },
  { id: "zus", label: "ZUS Płatnik (DRA / ZCNA)", sub: "Rozliczenia składek bez osobnej aplikacji mZUS dla Płatnika", enabled: true },
  { id: "bae", label: "Firmowe e-Doręczenia", sub: "Alerty 7., 12. i 13. dnia dla właściciela i księgowości", enabled: false }
];

export const DATA_TRACKER_LOGS = [
  { time: "Dziś, 08:41", inst: "CEPiK + UFG", reg: "Rejestr Pojazdów", reason: "Sprawdzenie auta GD 4829X przy umowie", legal: "Twoja zgoda", suspicious: false },
  { time: "25.11, 19:14", inst: "UCK w Gdańsku (SOR)", reg: "IKP i ubezpieczenie NFZ", reason: "Przekazanie karty alergii i leków przez telefon", legal: "Zbliżenie NFC", suspicious: false },
  { time: "24.11, 14:22", inst: "Sąd Rejonowy Gdańsk-Północ", reg: "Księgi Wieczyste", reason: "Wzmianka o wykreśleniu hipoteki", legal: "Czynność sądu", suspicious: false },
  { time: "22.11, 11:05", inst: "Nieznany Pośrednik Sp. z o.o.", reg: "Rejestr PESEL", reason: "Sprawdzenie numeru PESEL w nietypowych godzinach", legal: "Zapytanie zewnętrzne", suspicious: true }
];

export const WALLET_DOCUMENTS = [
  {
    id: "pojazdy",
    title: "Moje pojazdy",
    theme: "amber",
    emblem: "eagle",
    rows: [
      { label: "Pojazd", value: "Opel Astra V 1.4 Turbo (2019)" },
      { label: "Rejestracja", value: "GD 4829X" },
      { label: "VIN", value: "W0VBF6EH9JG128490" },
      { label: "Polisa OC", value: "PZU S.A. do 14.05.2027 ✓" },
      { label: "Przegląd SKP", value: "Ważny do 19.09.2027 ✓" }
    ],
    ctaScreen: "auto_choice",
    ctaLabel: "Sprzedaj lub kup pojazd →"
  },
  {
    id: "prawo_jazdy",
    title: "mPrawo jazdy",
    theme: "plum",
    emblem: "eu_pl",
    rows: [
      { label: "Kategorie", value: "B, B1, AM · Bezterminowo" },
      { label: "Numer", value: "C0492/21/0084" },
      { label: "Punkty karne", value: "0 pkt ✓" }
    ],
    ctaScreen: "crash",
    ctaLabel: "Zgłoś stłuczkę (także offline) →"
  },
  {
    id: "kdr",
    title: "Karta Dużej Rodziny",
    theme: "violet",
    emblem: "kdr",
    rows: [
      { label: "Numer karty", value: "22019940281000421 · Aktywna ✓" },
      { label: "Zniżki", value: "PKP 37% · Paszport 50% · Parki 0 zł" }
    ],
    ctaScreen: "zero_hub",
    ctaLabel: "Usługi dla rodziny →"
  },
  {
    id: "dzieci",
    title: "Dowody dzieci (2)",
    theme: "teal",
    emblem: "kids"
  },
  {
    id: "mdowod",
    title: "mDowód",
    theme: "sapphire",
    emblem: "seal",
    holderFirst: "SEBASTIAN",
    holderFull: "SEBASTIAN M.",
    pesel: "92041804912",
    series: "DHC 849201",
    validTo: "14.08.2034",
    certStatus: "Ważny również offline ✓"
  }
];

export const CHILDREN_DOCUMENTS = [
  {
    id: "zosia",
    firstName: "ZOSIA",
    fullName: "Zosia M. (9 lat)",
    birthDate: "14.05.2017",
    pesel: "17251408224",
    series: "DKA 412908",
    validTo: "12.05.2030",
    schoolBadge: "mLegitymacja · SP nr 14 w Gdańsku (ulga 37% ✓)",
    bloodAndAllergy: "Grupa A Rh+ · Brak alergii · Szczepienia aktualne ✓",
    guardian: "Sebastian M. (władza rodzicielska z PESEL ✓)"
  },
  {
    id: "leon",
    firstName: "LEON",
    fullName: "Leon M. (4 lata)",
    birthDate: "03.09.2022",
    pesel: "22290304119",
    series: "DKB 774120",
    validTo: "03.09.2029",
    schoolBadge: "Przedszkole Publiczne nr 8 w Gdańsku",
    bloodAndAllergy: "Grupa 0 Rh+ · Alergia: białko mleka krowiego (!)",
    guardian: "Sebastian M. (władza rodzicielska z PESEL ✓)"
  }
];

export const SCANNED_DOC_TEMPLATES = {
  oswiadczenie: {
    id: "oswiadczenie",
    title: "Oświadczenie mieszkańca (PDF)",
    recipient: "Urząd Miejski w Gdańsku",
    refNo: "UMG/WOO/2026/1184",
    lines: [
      "Ja, niżej podpisany Sebastian M. (PESEL 92041804912),",
      "zam. ul. Długa 14/6, 80-831 Gdańsk, oświadczam pod",
      "rygorem art. 233 § 1 k.k., że przedkładany załącznik",
      "jest zgodny ze stanem faktycznym na dzień 26.11.2026."
    ]
  },
  pelnomocnictwo: {
    id: "pelnomocnictwo",
    title: "Pełnomocnictwo ogólne (PDF)",
    recipient: "Kancelaria / Biuro Rachunkowe",
    refNo: "PEL/2026/0419",
    lines: [
      "Udzielam pełnomocnictwa szczególnego Pani Annie Nowak",
      "(DOR-PL-294810) do reprezentowania mnie oraz",
      "składania dokumentów i odbioru korespondencji",
      "w systemie e-Doręczeń na okres 12 miesięcy."
    ]
  }
};

export const SERVICES_CATALOG = [
  { go: "doc_scan_sign", iconKey: "scanSign", colorCls: "icon-box--cobalt", title: "Skanuj i podpisz dokument", desc: "Papier → PDF + podpis odręczny i Profil Zaufany", keywords: "skan skaner pdf podpis profil zaufany wyslij doreczenia dokument" },
  { go: "dzieci_id", iconKey: "baby", colorCls: "icon-box--emerald", title: "Dowody dzieci (mDowód + IKP)", desc: "mDowód dziecka, mLegitymacja szkolna i zgoda na wyjazd/odbiór", keywords: "dziecko dzieci dowód mlegitymacja szkoła przedszkole ikp zgoda wyjazd" },
  { go: "caller_shield", iconKey: "phone", colorCls: "icon-box--crimson", title: "Tarcza „Kto dzwoni?”", desc: "Sprawdź, czy dzwoni prawdziwy bank lub Policja", keywords: "oszustwo spoofing telefon bank policja alarm cert" },
  { go: "hospital", iconKey: "hospital", colorCls: "icon-box--crimson", title: "Szpital i SOR w 5 sekund", desc: "IKP, alergie, leki i upoważnienie bliskiego", keywords: "sor lekarz recepta alergia nfc karta ice" },
  { go: "kw", iconKey: "home", colorCls: "icon-box--cobalt", title: "Księgi Wieczyste 2.0", desc: "Alert zmian w KW i wykreślenie hipoteki 1-klik", keywords: "mieszkanie dom hipoteka kw sąd bank kredyt" },
  { go: "pension", iconKey: "chart", colorCls: "icon-box--emerald", title: "Moja Emerytura 360°", desc: "Łącznie ZUS, PPK, OFE i IKE w jednym widoku", keywords: "emerytura zus ppk ofe ike ikze kapitał" },
  { go: "auto_choice", iconKey: "car", colorCls: "icon-box--cobalt", title: "Kupno / sprzedaż auta", desc: "Skan papierowej umowy lub cyfrowa umowa P2P", keywords: "samochód pojazd umowa pcc3 rejestracja oc cepik" },
  { go: "crash", iconKey: "car", colorCls: "icon-box--amber", title: "mStłuczka 2.0 (Offline i UE)", desc: "Spisanie kolizji bez sieci i z autem zagranicznym", keywords: "kolizja wypadek stłuczka offline ue oc" },
  { go: "job", iconKey: "briefcase", colorCls: "icon-box--cobalt", title: "Pierwszy dzień w pracy", desc: "Cyfrowa teczka HR, dyplom i e-PIT-2", keywords: "praca kadry hr dyplom pit zus" },
  { go: "bereave", iconKey: "heart", colorCls: "icon-box--indigo", title: "Wsparcie po stracie (6 w 1)", desc: "Akt zgonu, zasiłek ZUS 7 000 zł, banki i media", keywords: "zgon pogrzeb zasiłek zus spadek media" },
  { go: "birth", iconKey: "baby", colorCls: "icon-box--emerald", title: "Narodziny dziecka (4 w 1)", desc: "Imię w USC, PESEL, meldunek i 800+", keywords: "dziecko narodziny usc pesel 800+" }
];

export const PENSION_DATA = {
  total: "418 640 zł",
  monthlyNow: "5 420 zł",
  monthlyPlus2Y: "6 310 zł",
  pillars: [
    { name: "ZUS (konto + subkonto)", amount: "312 400 zł", share: "75%" },
    { name: "PPK (Pracownicze Plany Kapitałowe)", amount: "48 900 zł", share: "12%" },
    { name: "IKE / IKZE (dobrowolne)", amount: "31 200 zł", share: "7%" },
    { name: "OFE", amount: "26 140 zł", share: "6%" }
  ]
};

export const TOUR_STEPS = [
  {
    screen: "hub",
    title: "1. Ekran główny (Calm UI 2026)",
    body: "Zero duplikatów: mFirma jest tylko w górnym przełączniku, karty są czyste i czytelne, a na dole działa lekka pigułka Asystenta AI."
  },
  {
    screen: "znak",
    title: "2. Stos Dokumentów + żywy hologram",
    body: "Nakładające się karty (mDowód, Pojazdy, mPrawo jazdy, KDR) z tykającym zegarem co do sekundy, zastrzeżeniem PESEL i Znak 18+ ZKP."
  },
  {
    screen: "caller_shield",
    title: "3. Tarcza „Kto do mnie dzwoni?”",
    body: "Ochrona przed oszustwami „na pracownika banku lub policjanta”: obywatel od razu widzi, czy połączenie jest zweryfikowane kryptograficznie."
  },
  {
    screen: "auto_p2p",
    title: "4. Umowa auta P2P bez urzędu",
    body: "Skan mObywatela drugiej osoby + wpisanie tablicy rejestracyjnej lub skan mPojazdu. Podpis QES, PCC-3 i oszczędność 93,50 zł na tablicach UE."
  },
  {
    screen: "kw",
    title: "5. Księgi Wieczyste 2.0 (Hipoteka)",
    body: "Bank wysyła cyfrową zgodę, a obywatel 1 kliknięciem wykreśla hipotekę w sądzie oraz ma darmowy Alert KW przed nieuprawnionym wpisem."
  },
  {
    screen: "mfirma",
    title: "6. Tryb mFirma (KSeF + Start firmy)",
    body: "Powiadomienia o fakturach FA(3), tarcza 14 dni dla e-Doręczeń, delegacje na NIP biura rachunkowego oraz pełne 1 Okienko założenia firmy."
  }
];

export const SVG_EXPORTS = [
  { file: "09_Portfel_Dokumenty_Stack_mDowod.svg", title: "09A • Dokumenty: Stos kart + zegar (v2)" },
  { file: "01_Hub_DualContext_OfflineFirst.svg", title: "01 • Start: Obywatel ⇄ mFirma (v2)" },
  { file: "23_Tarcza_Kto_Dzwoni_AntySpoofing.svg", title: "23 • NOWOŚĆ: Tarcza „Kto dzwoni?” (Anty-Oszustwo)" },
  { file: "24_Ksiegi_Wieczyste_2_0_Hipoteka_AlertKW.svg", title: "24 • NOWOŚĆ: Księgi Wieczyste 2.0 (Hipoteka + Alert KW)" },
  { file: "25_Moja_Emerytura_360_ZUS_PPK_IKE.svg", title: "25 • NOWOŚĆ: Moja Emerytura 360° (ZUS + PPK + IKE)" },
  { file: "19_mFirma_KSeF_Alert_mDoreczenia.svg", title: "19 • mFirma: Faktury KSeF & e-Doręczenia" },
  { file: "20_mFirma_Corppass_QES_B2B.svg", title: "20 • mFirma: Uprawnienia biura & Podpis B2B" },
  { file: "21_Auto_Kupno_Sprzedaz_2Opcje.svg", title: "21 • Auto: Kupno / Sprzedaż (2 opcje)" },
  { file: "22_Auto_Generator_Umowy_P2P.svg", title: "22 • Auto: Cyfrowa umowa P2P" },
  { file: "16_mStluczka_2_0_Offline_EU.svg", title: "16 • mStłuczka 2.0: Tryb offline i auta z UE" },
  { file: "09_mWiek_DoubleBlind_ZKP_mKartaPobytu.svg", title: "09 • Potwierdzenie wieku 18+ i mKarta Pobytu" },
  { file: "10_Slad_Danych_DataTracker_PLLuM_OptIn.svg", title: "10 • Ślad Danych i tryb prywatności AI" },
  { file: "26_Skaner_Dokumentow_PDF_Profil_Zaufany_WyslijDo.svg", title: "26 • NOWOŚĆ: Skaner PDF + Podpis PZ + Wyślij do" },
  { file: "27_Tryb_Wysokiego_Kontrastu_Czarno_Zolty_WCAG_AAA.svg", title: "27 • NOWOŚĆ: Kontrast Czarno-Żółty (Black & Yellow AAA)" },
  { file: "28_Dowody_Dzieci_mDowod_mLegitymacja_IKP.svg", title: "28 • NOWOŚĆ: Dowody dzieci (mDowód + mLegitymacja + IKP)" }
];
