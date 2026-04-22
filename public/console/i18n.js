// beloq Console — Internacionalización ES / VAL (valenciano AVL)

const I18N = {
  es: {
    // Nav
    nav_dashboard: "Resumen",
    nav_stations: "Estaciones",
    nav_activity: "Actividad",
    nav_reports: "Informes",
    nav_settings: "Ajustes",

    // Login
    login_title: "Accede a tu panel",
    login_sub: "Gestiona la movilidad de tu organización",
    login_email: "Email",
    login_pass: "Contraseña",
    login_forgot: "¿Olvidaste?",
    login_remember: "Mantener sesión iniciada",
    login_submit: "Iniciar sesión",
    login_demo_title: "Acceso de demostración",
    login_demo_sub: "Estás viendo una demo interactiva con datos simulados del campus UPV. Cualquier credencial funciona.",

    // Header
    header_today: "hoy",
    header_role: "Responsable de Movilidad Sostenible",

    // Dashboard
    hello: "Hola",
    dash_section: "Resumen · Campus UPV",
    dash_intro: "Tus 10 estaciones están operando con normalidad. 1 incidencia de batería abierta en Biblioteca.",
    live: "En vivo",
    report_quick: "Informe rápido",

    kpi_revenue_today: "Ingresos hoy",
    kpi_uses_today: "Usos hoy",
    kpi_occupancy: "Ocupación media",
    kpi_users_active: "Usuarios activos",
    vs_yesterday: "vs. ayer",
    vs_week: "vs. semana",
    vs_prev_month: "vs. mes anterior",
    modules_of: "de",
    modules_label: "módulos",
    users_sub: "este mes · 38 Flow · 12 Max",

    // Impacto
    impact_section: "Impacto sostenible",
    impact_sub: "Este mes, tu campus ha evitado equivalentes a",
    impact_co2: "CO₂ evitados",
    impact_km: "Movilidad sostenible",
    impact_trips: "Viajes en coche sustituidos",
    impact_cta: "Ver informe",

    // Mapa
    map_section: "Mapa del campus",
    map_title: "Estado de estaciones en tiempo real",
    operative: "Operativa",
    incident: "Incidencia",
    pending: "Pendiente",
    see_list: "Ver listado",

    // Actividad en vivo
    live_section: "Actividad en vivo",
    live_title: "Últimos eventos",
    see_all_activity: "Ver toda la actividad",

    // Uso semanal
    last_7_days: "Últimos 7 días",
    uses_per_day: "Usos por día",
    total_week: "Total semana",
    avg_time: "Tiempo medio",
    rotation: "Rotación/mód",
    uses_unit: "usos",
    peak_hour: "Hora pico",
    hourly_occ: "Ocupación por franja horaria",

    // Popup estación
    pop_modules: "Módulos",
    pop_occupied: "ocupados",
    pop_battery: "Batería",
    pop_lastuse: "Último uso",
    pop_cta: "Ver detalle",

    // Estaciones
    stations_h1: "Tus 10 estaciones",
    stations_sub: "115 módulos desplegados · 1 incidencia activa",
    stations_search: "Buscar por nombre o dirección…",
    filter_all: "Todas",
    filter_online: "Operativas",
    filter_warning: "Con incidencias",
    col_station: "Estación",
    col_status: "Estado",
    col_modules: "Módulos",
    col_battery: "Batería",
    col_uses_today: "Usos hoy",
    col_revenue_today: "Ingresos hoy",
    col_last_use: "Último uso",

    // Detalle estación
    back_to_stations: "Volver a estaciones",
    station_modules_grid: "Estado de los módulos",
    station_health: "Salud técnica",
    signal: "Señal",
    battery: "Batería",
    firmware: "Firmware",
    temperature: "Temperatura",
    module: "Módulo",
    mod_free: "Libre",
    mod_busy: "Ocupado",
    mod_reserved: "Reservado",
    mod_offline: "Sin conexión",
    last_uses: "Últimos usos",
    report_issue: "Reportar incidencia",

    // Actividad
    activity_h1: "Todo lo que está pasando",
    activity_sub: "Notificaciones informativas en tiempo real. El equipo de beloq gestiona cualquier incidencia técnica.",
    live_feed: "Feed en vivo",
    all: "Todo",
    tab_operation: "Operación",
    tab_revenue: "Ingresos",
    tab_alert: "Avisos",
    all_stations: "Todas las estaciones",
    events_count: "eventos",
    no_events: "Sin eventos para el filtro aplicado",

    // Informes
    reports_h1: "Generar informe automatizado",
    reports_sub: "Configura periodo, KPIs y motivo. beloq genera un PDF listo para presentar.",
    period: "Periodo",
    period_week: "Última semana",
    period_month: "Último mes",
    period_quarter: "Último trimestre",
    period_year: "Anual (año en curso)",
    period_custom: "Rango personalizado",
    motive: "Motivo del informe",
    motive_exec: "Informe ejecutivo / pleno",
    motive_op: "Informe operativo",
    motive_sust: "Informe de sostenibilidad",
    motive_press: "Nota de prensa",
    motive_internal: "Uso interno / archivo",
    kpis_to_include: "KPIs a incluir",
    selected: "seleccionados",
    output_format: "Formato de salida",
    preview: "Vista previa",
    content_: "Contenido:",
    select_kpi: "Selecciona al menos un KPI",
    generate_report: "Generar informe",
    generating: "Generando…",
    download_report: "Descargar informe",
    report_ready: "Informe listo",

    // Ajustes
    settings_h1: "Configuración de tu organización",
    tab_org: "Organización",
    tab_users: "Usuarios",
    tab_notifications: "Notificaciones",
    tab_billing: "Facturación",
    org_data: "Datos de la organización",
    org_data_sub: "Información que aparece en informes y facturación.",
    legal_name: "Nombre legal",
    cif: "CIF",
    address: "Dirección fiscal",
    contact: "Persona de contacto",
    email: "Email",
    phone: "Teléfono",
    cancel: "Cancelar",
    save_changes: "Guardar cambios",
    users_with_access: "Usuarios con acceso",
    invite_user: "Invitar usuario",
    role_admin: "Administrador",
    role_manager: "Gestor",
    role_readonly: "Solo lectura",
    last_access: "Último acceso",
    notif_prefs: "Preferencias de notificación",
    notif_sub: "Decide cuándo quieres que te avisemos.",
    your_plan: "Tu plan actual",
    monthly_fee: "Cuota mensual",
    next_invoice: "Próxima factura",
    see_details: "Ver detalles",
    invoices_history: "Historial de facturas",
    paid: "Pagada",
    unpaid: "Pendiente",

    // Footer
    footer_version: "beloq Console v1.0 · © 2026 beloq Movilidad",
    footer_demo: "Demo interactiva · Datos simulados",

    // Tiempos relativos
    just_now: "ahora",
    minutes_ago: "min",
    hours_ago: "h",
    yesterday: "ayer",
  },

  val: {
    // Nav
    nav_dashboard: "Resum",
    nav_stations: "Estacions",
    nav_activity: "Activitat",
    nav_reports: "Informes",
    nav_settings: "Ajustos",

    // Login
    login_title: "Accedix al teu panell",
    login_sub: "Gestiona la mobilitat de la teua organització",
    login_email: "Correu",
    login_pass: "Contrasenya",
    login_forgot: "L'has oblidada?",
    login_remember: "Mantín la sessió iniciada",
    login_submit: "Inicia sessió",
    login_demo_title: "Accés de demostració",
    login_demo_sub: "Estàs veient una demo interactiva amb dades simulades del campus UPV. Qualsevol credencial funciona.",

    // Header
    header_today: "hui",
    header_role: "Responsable de Mobilitat Sostenible",

    // Dashboard
    hello: "Hola",
    dash_section: "Resum · Campus UPV",
    dash_intro: "Les teues 10 estacions estan operant amb normalitat. 1 incidència de bateria oberta a Biblioteca.",
    live: "En directe",
    report_quick: "Informe ràpid",

    kpi_revenue_today: "Ingressos hui",
    kpi_uses_today: "Usos hui",
    kpi_occupancy: "Ocupació mitjana",
    kpi_users_active: "Usuaris actius",
    vs_yesterday: "vs. ahir",
    vs_week: "vs. setmana",
    vs_prev_month: "vs. mes anterior",
    modules_of: "de",
    modules_label: "mòduls",
    users_sub: "este mes · 38 Flow · 12 Max",

    // Impacto
    impact_section: "Impacte sostenible",
    impact_sub: "Este mes, el teu campus ha evitat equivalents a",
    impact_co2: "CO₂ evitats",
    impact_km: "Mobilitat sostenible",
    impact_trips: "Viatges en cotxe substituïts",
    impact_cta: "Veure informe",

    // Mapa
    map_section: "Mapa del campus",
    map_title: "Estat d'estacions en temps real",
    operative: "Operativa",
    incident: "Incidència",
    pending: "Pendent",
    see_list: "Veure llistat",

    // Actividad en vivo
    live_section: "Activitat en directe",
    live_title: "Últims esdeveniments",
    see_all_activity: "Veure tota l'activitat",

    // Uso semanal
    last_7_days: "Últims 7 dies",
    uses_per_day: "Usos per dia",
    total_week: "Total setmana",
    avg_time: "Temps mitjà",
    rotation: "Rotació/mòd",
    uses_unit: "usos",
    peak_hour: "Hora punta",
    hourly_occ: "Ocupació per franja horària",

    // Popup estación
    pop_modules: "Mòduls",
    pop_occupied: "ocupats",
    pop_battery: "Bateria",
    pop_lastuse: "Últim ús",
    pop_cta: "Veure detall",

    // Estaciones
    stations_h1: "Les teues 10 estacions",
    stations_sub: "74 mòduls desplegats · 1 incidència activa",
    stations_search: "Cerca per nom o adreça…",
    filter_all: "Totes",
    filter_online: "Operatives",
    filter_warning: "Amb incidències",
    col_station: "Estació",
    col_status: "Estat",
    col_modules: "Mòduls",
    col_battery: "Bateria",
    col_uses_today: "Usos hui",
    col_revenue_today: "Ingressos hui",
    col_last_use: "Últim ús",

    // Detalle estación
    back_to_stations: "Tornar a estacions",
    station_modules_grid: "Estat dels mòduls",
    station_health: "Salut tècnica",
    signal: "Senyal",
    battery: "Bateria",
    firmware: "Firmware",
    temperature: "Temperatura",
    module: "Mòdul",
    mod_free: "Lliure",
    mod_busy: "Ocupat",
    mod_reserved: "Reservat",
    mod_offline: "Sense connexió",
    last_uses: "Últims usos",
    report_issue: "Reportar incidència",

    // Actividad
    activity_h1: "Tot el que està passant",
    activity_sub: "Notificacions informatives en temps real. L'equip de beloq gestiona qualsevol incidència tècnica.",
    live_feed: "Canal en directe",
    all: "Tot",
    tab_operation: "Operació",
    tab_revenue: "Ingressos",
    tab_alert: "Avisos",
    all_stations: "Totes les estacions",
    events_count: "esdeveniments",
    no_events: "Cap esdeveniment per al filtre aplicat",

    // Informes
    reports_h1: "Generar informe automatitzat",
    reports_sub: "Configura període, KPIs i motiu. beloq genera un PDF llest per a presentar.",
    period: "Període",
    period_week: "Última setmana",
    period_month: "Últim mes",
    period_quarter: "Últim trimestre",
    period_year: "Anual (any en curs)",
    period_custom: "Rang personalitzat",
    motive: "Motiu de l'informe",
    motive_exec: "Informe executiu / ple",
    motive_op: "Informe operatiu",
    motive_sust: "Informe de sostenibilitat",
    motive_press: "Nota de premsa",
    motive_internal: "Ús intern / arxiu",
    kpis_to_include: "KPIs a incloure",
    selected: "seleccionats",
    output_format: "Format d'eixida",
    preview: "Vista prèvia",
    content_: "Contingut:",
    select_kpi: "Selecciona almenys un KPI",
    generate_report: "Generar informe",
    generating: "Generant…",
    download_report: "Descarregar informe",
    report_ready: "Informe llest",

    // Ajustes
    settings_h1: "Configuració de la teua organització",
    tab_org: "Organització",
    tab_users: "Usuaris",
    tab_notifications: "Notificacions",
    tab_billing: "Facturació",
    org_data: "Dades de l'organització",
    org_data_sub: "Informació que apareix en informes i facturació.",
    legal_name: "Nom legal",
    cif: "CIF",
    address: "Adreça fiscal",
    contact: "Persona de contacte",
    email: "Correu",
    phone: "Telèfon",
    cancel: "Cancel·lar",
    save_changes: "Guardar canvis",
    users_with_access: "Usuaris amb accés",
    invite_user: "Convidar usuari",
    role_admin: "Administrador",
    role_manager: "Gestor",
    role_readonly: "Només lectura",
    last_access: "Últim accés",
    notif_prefs: "Preferències de notificació",
    notif_sub: "Decideix quan vols que t'avisem.",
    your_plan: "El teu pla actual",
    monthly_fee: "Quota mensual",
    next_invoice: "Pròxima factura",
    see_details: "Veure detalls",
    invoices_history: "Historial de factures",
    paid: "Pagada",
    unpaid: "Pendent",

    // Footer
    footer_version: "beloq Console v1.0 · © 2026 beloq Mobilitat",
    footer_demo: "Demo interactiva · Dades simulades",

    // Tiempos
    just_now: "ara",
    minutes_ago: "min",
    hours_ago: "h",
    yesterday: "ahir",
  },
};

// Hook + global singleton. Escucha cambios entre componentes.
const LANG_LISTENERS = new Set();
let CURRENT_LANG = (typeof localStorage !== "undefined" && localStorage.getItem("beloq_lang")) || "es";

const setLang = (l) => {
  CURRENT_LANG = l;
  try { localStorage.setItem("beloq_lang", l); } catch {}
  LANG_LISTENERS.forEach(fn => fn(l));
};

const useLang = () => {
  const [lang, setLocalLang] = React.useState(CURRENT_LANG);
  React.useEffect(() => {
    const fn = (l) => setLocalLang(l);
    LANG_LISTENERS.add(fn);
    return () => LANG_LISTENERS.delete(fn);
  }, []);
  const t = React.useCallback((key) => (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key, [lang]);
  return { lang, setLang, t };
};

Object.assign(window, { I18N, useLang, setLang });
