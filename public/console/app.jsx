// beloq Console — Shell principal (header + tabs + router + i18n)

const NAV = [
  {id: "dashboard", labelKey: "nav_dashboard", icon: "dashboard"},
  {id: "stations", labelKey: "nav_stations", icon: "map"},
  {id: "activity", labelKey: "nav_activity", icon: "activity"},
  {id: "reports", labelKey: "nav_reports", icon: "reports"},
  {id: "settings", labelKey: "nav_settings", icon: "settings"},
];

const LangToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div style={{display: "flex", alignItems: "center", padding: 3, borderRadius: 20, background: "#F2F0EA", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)"}}>
      {[{id: "es", label: "ES"}, {id: "val", label: "VAL"}].map(o => (
        <button key={o.id} onClick={() => setLang(o.id)} style={{
          padding: "5px 11px", borderRadius: 16, border: 0, cursor: "pointer",
          background: lang === o.id ? "#1A1A1A" : "transparent",
          color: lang === o.id ? "#fff" : "#717171",
          fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 10,
          letterSpacing: "0.5px", transition: "all 150ms",
        }}>{o.label}</button>
      ))}
    </div>
  );
};

const Header = ({ active, onNav, unread, sim }) => {
  const { t } = useLang();
  return (
    <header style={{
      height: 64, background: "#fff", borderBottom: `1px solid ${COLORS.borderSoft}`,
      display: "flex", alignItems: "center", padding: "0 28px", position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{display: "flex", alignItems: "center", gap: 14, minWidth: 200}}>
        <img src="assets/logo-black.png" alt="beloq" style={{height: 28}}/>
        <div style={{height: 18, width: 1, background: COLORS.borderSoft}}/>
        <div style={{fontSize: 11, fontWeight: 700, letterSpacing: "1.4px", color: COLORS.grey500, textTransform: "uppercase"}}>Console</div>
      </div>
      <nav style={{display: "flex", gap: 4, margin: "0 auto"}}>
        {NAV.map(n => {
          const on = active === n.id || (active === "station-detail" && n.id === "stations");
          return (
            <button key={n.id} onClick={() => onNav(n.id)} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", border: 0, cursor: "pointer",
              background: on ? COLORS.grey50 : "transparent",
              color: on ? COLORS.ink : COLORS.grey500,
              borderRadius: 8, fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 13,
              transition: "all 150ms",
            }}>
              <Icon name={n.icon} size={15}/>
              {t(n.labelKey)}
            </button>
          );
        })}
      </nav>
      <div style={{display: "flex", alignItems: "center", gap: 12, minWidth: 200, justifyContent: "flex-end"}}>
        <LangToggle/>
        <div style={{display:"flex", alignItems:"center", gap: 6, padding:"5px 10px", borderRadius: 20, background: "#ECFDF5"}}>
          <span style={{width: 7, height: 7, borderRadius: "50%", background: COLORS.success, animation: "pulse 2s infinite"}}/>
          <span style={{fontSize: 11, fontWeight: 700, color: "#047857", letterSpacing: "0.3px"}}>
            {fmt.eur(sim.revenueToday).replace(".", ",")}
          </span>
          <span style={{fontSize: 10, fontWeight: 600, color: "#047857", opacity: 0.7}}>{t("header_today")}</span>
        </div>
        <button style={{position:"relative", width: 36, height: 36, borderRadius: 10, background: COLORS.grey50, border: 0, cursor: "pointer", display: "grid", placeItems: "center"}}>
          <Icon name="bell" size={16} color={COLORS.grey700}/>
          {unread > 0 && <span style={{position:"absolute", top: 6, right: 6, width: 14, height: 14, borderRadius: "50%", background: COLORS.error, color: "#fff", fontSize: 9, fontWeight: 700, display: "grid", placeItems: "center", border: "2px solid #fff"}}>{unread}</span>}
        </button>
        <div style={{display: "flex", alignItems: "center", gap: 10, paddingLeft: 10, borderLeft: `1px solid ${COLORS.borderSoft}`}}>
          <div style={{width: 32, height: 32, borderRadius: "50%", background: COLORS.yellow, color: COLORS.ink, display:"grid", placeItems:"center", fontWeight: 700, fontSize: 12, letterSpacing: "0.3px"}}>UPV</div>
          <div style={{textAlign: "left"}}>
            <div style={{fontSize: 12, fontWeight: 700, color: COLORS.ink, lineHeight: 1.2}}>{USER_PROFILE.orgShort}</div>
            <div style={{fontSize: 10, color: COLORS.grey500, fontWeight: 500}}>{t("header_role")}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

const AppFooter = () => {
  const { t } = useLang();
  return (
    <>
      <span>{t("footer_version")}</span>
      <span>{t("footer_demo")}</span>
    </>
  );
};

const App = () => {
  const [logged, setLogged] = React.useState(false);
  const [route, setRoute] = React.useState("dashboard");
  const [selectedStation, setSelectedStation] = React.useState(null);

  const sim = useLiveSim(ACTIVITY_SEED, UPV_STATIONS);

  if (!logged) return <LoginScreen onLogin={() => setLogged(true)}/>;

  const goToStation = (s) => {
    setSelectedStation(s);
    setRoute("station-detail");
  };
  const currentStation = selectedStation
    ? sim.stationState.find(s => s.id === selectedStation.id) || selectedStation
    : null;

  return (
    <div style={{minHeight: "100vh", background: COLORS.bg}}>
      <Header active={route} onNav={setRoute} unread={1} sim={sim}/>
      <main style={{maxWidth: 1480, margin: "0 auto"}}>
        {route === "dashboard" && <DashboardScreen sim={sim} onSelectStation={goToStation} onNav={setRoute}/>}
        {route === "stations" && <StationsScreen stationState={sim.stationState} onSelectStation={goToStation}/>}
        {route === "station-detail" && currentStation && <StationDetailScreen station={currentStation} sim={sim} onBack={() => setRoute("stations")}/>}
        {route === "activity" && <ActivityScreen sim={sim} stationState={sim.stationState} onSelectStation={goToStation}/>}
        {route === "reports" && <ReportsScreen/>}
        {route === "settings" && <SettingsScreen/>}
      </main>
      <footer style={{padding: "20px 28px", borderTop: `1px solid ${COLORS.borderSoft}`, display:"flex", justifyContent:"space-between", fontSize: 11, color: COLORS.grey400, fontWeight: 500, background: "#fff"}}>
        <AppFooter/>
      </footer>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
