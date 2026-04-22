// beloq Console — Datos mock para UPV (campus universitario)
// Todo en memoria, sin localStorage. La demo arranca limpia siempre.

const UPV_STATIONS = [
  {
    id: "ST-UPV-01",
    name: "Casa de l'Alumne",
    address: "Camí de Vera, s/n · Edifici 4K",
    lat: 39.48077, lng: -0.34171,
    modules: 12, modulesOccupied: 8,
    battery: 92, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 47, usesWeek: 284, usesMonth: 1189,
    revenueToday: 38.40, revenueMonth: 962.15,
  },
  {
    id: "ST-UPV-02",
    name: "Rectorat",
    address: "Edifici 3A · Accés principal",
    lat: 39.48231, lng: -0.34568,
    modules: 14, modulesOccupied: 10,
    battery: 88, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 54, usesWeek: 326, usesMonth: 1378,
    revenueToday: 43.20, revenueMonth: 1082.40,
  },
  {
    id: "ST-UPV-03",
    name: "Àgora UPV",
    address: "Edifici 6G · Zona central",
    lat: 39.48155, lng: -0.34350,
    modules: 20, modulesOccupied: 16,
    battery: 79, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 82, usesWeek: 487, usesMonth: 1998,
    revenueToday: 66.40, revenueMonth: 1612.70,
  },
  {
    id: "ST-UPV-04",
    name: "ETSIE Edificación",
    address: "Edifici 1B · Escola Tècnica",
    lat: 39.4812548, lng: -0.3482618,
    modules: 8, modulesOccupied: 5,
    battery: 85, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 34, usesWeek: 206, usesMonth: 843,
    revenueToday: 27.30, revenueMonth: 678.50,
  },
  {
    id: "ST-UPV-05",
    name: "Biblioteca General",
    address: "Edifici 4L · Entrada sud",
    lat: 39.48130, lng: -0.34300,
    modules: 16, modulesOccupied: 8,
    battery: 13, signal: "3G", status: "warning",
    incidents: 1,
    usesToday: 56, usesWeek: 344, usesMonth: 1447,
    revenueToday: 43.00, revenueMonth: 1168.40,
  },
  {
    id: "ST-UPV-06",
    name: "ETSIAMN Agronómica",
    address: "Edifici 3P · Escola Tècnica",
    lat: 39.4835034, lng: -0.3441361,
    modules: 8, modulesOccupied: 4,
    battery: 77, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 29, usesWeek: 188, usesMonth: 797,
    revenueToday: 23.70, revenueMonth: 629.50,
  },
  {
    id: "ST-UPV-07",
    name: "Parada Metro UPV",
    address: "Av. Tarongers · Accés L3",
    lat: 39.48050, lng: -0.34480,
    modules: 8, modulesOccupied: 7,
    battery: 94, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 36, usesWeek: 214, usesMonth: 887,
    revenueToday: 29.10, revenueMonth: 713.40,
  },
  {
    id: "ST-UPV-08",
    name: "Diseño ETSIADI",
    address: "Edifici 7E · Escola Tècnica",
    lat: 39.480523, lng: -0.3385443,
    modules: 16, modulesOccupied: 16, alwaysFull: true,
    battery: 86, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 94, usesWeek: 562, usesMonth: 2284,
    revenueToday: 74.20, revenueMonth: 1842.30,
  },
  {
    id: "ST-UPV-09",
    name: "StartUPV",
    address: "Edifici 9B · Ciutat Politècnica de la Innovació",
    lat: 39.4793445, lng: -0.3355211,
    modules: 5, modulesOccupied: 3,
    battery: 91, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 22, usesWeek: 134, usesMonth: 571,
    revenueToday: 17.60, revenueMonth: 452.80,
  },
  {
    id: "ST-UPV-10",
    name: "IDEAS UPV",
    address: "Edifici 8B · Ciutat Politècnica de la Innovació",
    lat: 39.4773857, lng: -0.334989,
    modules: 8, modulesOccupied: 6,
    battery: 83, signal: "4G", status: "online",
    incidents: 0,
    usesToday: 38, usesWeek: 231, usesMonth: 962,
    revenueToday: 30.40, revenueMonth: 762.50,
  },
];

const ACTIVITY_SEED = [
  { type: "unlock", station: "Parada Metro UPV", detail: "Mòd. 3 · Desbloqueo", time: 3, amount: null },
  { type: "revenue", station: "Àgora UPV", detail: "Sesión finalizada", time: 5, amount: 1.20 },
  { type: "unlock", station: "ETSIE Edificación", detail: "Mòd. 7 · Desbloqueo", time: 8, amount: null },
  { type: "revenue", station: "Casa de l'Alumne", detail: "Sesión finalizada", time: 12, amount: 0.85 },
  { type: "reserve", station: "Rectorat", detail: "Mòd. 2 · Reserva 10min", time: 15, amount: null },
  { type: "alert", station: "Biblioteca General", detail: "Batería por debajo del 15%", time: 18, amount: null, severity: "high" },
  { type: "release", station: "Parada Metro UPV", detail: "Mòd. 8 · Liberado", time: 22, amount: null },
  { type: "revenue", station: "Àgora UPV", detail: "Exceso 32min plan Flow", time: 27, amount: 0.24 },
  { type: "subscription", station: "UPV Campus", detail: "Suscripciones Flow ×8 usuarios", time: 31, amount: 1.04 },
  { type: "unlock", station: "ETSIAMN Agronómica", detail: "Mòd. 2 · Desbloqueo", time: 35, amount: null },
  { type: "revenue", station: "ETSIE Edificación", detail: "Sesión finalizada", time: 41, amount: 1.60 },
  { type: "release", station: "Casa de l'Alumne", detail: "Mòd. 5 · Liberado", time: 48, amount: null },
];

// Uso últimos 7 días (campus: valle los fines de semana, pico martes/miércoles)
const WEEK_USES = [
  { day: "Lun", n: 248 }, { day: "Mar", n: 312 }, { day: "Mié", n: 301 },
  { day: "Jue", n: 284 }, { day: "Vie", n: 218 }, { day: "Sáb", n: 94 },
  { day: "Dom", n: 76 },
];

// Usos últimos 30 días (para informes)
const MONTH_USES = [
  165, 198, 231, 287, 295, 124, 102,  // semana 1
  248, 312, 301, 284, 218, 94, 76,     // semana 2 (actual, parcial más real)
  172, 241, 268, 294, 275, 108, 88,    // semana 3
  189, 253, 289, 301, 267, 112, 95,    // semana 4
  201, 278,                             // semana 5 parcial
];

// Ocupación por franja horaria (campus: pico 10-14h y 16-20h)
const HOURLY_OCC = [
  { h: "08", p: 22 }, { h: "09", p: 58 }, { h: "10", p: 82 },
  { h: "11", p: 91 }, { h: "12", p: 76 }, { h: "13", p: 48 },
  { h: "14", p: 55 }, { h: "15", p: 68 }, { h: "16", p: 84 },
  { h: "17", p: 88 }, { h: "18", p: 79 }, { h: "19", p: 52 },
  { h: "20", p: 28 }, { h: "21", p: 14 },
];

// Ingresos últimos 7 días (€)
const WEEK_REVENUE = [
  { day: "Lun", amount: 198.40 }, { day: "Mar", amount: 241.80 },
  { day: "Mié", amount: 234.60 }, { day: "Jue", amount: 218.90 },
  { day: "Vie", amount: 174.20 }, { day: "Sáb", amount: 84.30 },
  { day: "Dom", amount: 68.50 },
];

const USER_PROFILE = {
  org: "Universitat Politècnica de València",
  orgShort: "UPV",
  role: "Responsable de Movilidad Sostenible",
  name: "Àlex Company",
  email: "movilidad@upv.es",
  avatar: "assets/upv-avatar.svg",
  plan: "beloq Operador Campus",
  modulesContracted: 115,
  monthlyFee: 20700,
  nextInvoice: "01/05/2026",
};

// Perfil ecológico — para la tarjeta Impacto
const IMPACT = {
  co2SavedKg: 1847,          // kg CO2 evitados este mes
  co2SavedKgYTD: 18420,      // año hasta la fecha
  kmSustainable: 28640,      // km sostenibles registrados este mes
  tripsReplaced: 2391,       // viajes que sustituyen al coche estimados
  treesEquivalent: 84,       // árboles equivalentes YTD
};

Object.assign(window, {
  UPV_STATIONS, ACTIVITY_SEED, WEEK_USES, MONTH_USES,
  HOURLY_OCC, WEEK_REVENUE, USER_PROFILE, IMPACT,
});
