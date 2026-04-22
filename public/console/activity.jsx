// beloq Console — Pantalla Actividad (notificaciones informativas)

const ActivityScreen = ({ sim, onSelectStation, stationState }) => {
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [stationFilter, setStationFilter] = React.useState("all");

  const typeMap = {
    all: null, operation: ["unlock", "release", "reserve"],
    revenue: ["revenue", "subscription"], alert: ["alert", "saturated"],
  };
  const filtered = sim.activity.filter(e => {
    if (typeFilter !== "all" && !typeMap[typeFilter].includes(e.type)) return false;
    if (stationFilter !== "all" && e.stationId !== stationFilter) return false;
    return true;
  });

  return (
    <div style={{padding: "24px 28px 32px", display:"flex", flexDirection:"column", gap: 18}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
        <div>
          <div style={{fontSize: 12, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6}}>Actividad</div>
          <h1 style={{fontSize: 24, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.02em"}}>Todo lo que está pasando</h1>
          <p style={{fontSize: 13, color: COLORS.grey500, fontWeight: 500, marginTop: 2}}>
            Notificaciones informativas en tiempo real. El equipo de beloq gestiona cualquier incidencia técnica.
          </p>
        </div>
        <div style={{display:"flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#ECFDF5", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#047857"}}>
          <span style={{width: 8, height: 8, borderRadius: "50%", background: COLORS.success, boxShadow: `0 0 0 4px ${COLORS.success}33`, animation: "pulse 2s infinite"}}/>
          Feed en vivo
        </div>
      </div>

      <div style={{display:"flex", gap: 12, alignItems: "center"}}>
        <InlineTabs value={typeFilter} onChange={setTypeFilter} tabs={[
          {value:"all", label:"Todo"},
          {value:"operation", label:"Operación"},
          {value:"revenue", label:"Ingresos"},
          {value:"alert", label:"Avisos"},
        ]}/>
        <select value={stationFilter} onChange={e => setStationFilter(e.target.value)} style={{
          height: 34, borderRadius: 8, padding: "0 12px",
          fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 12, color: COLORS.ink,
          border: 0, boxShadow: `inset 0 0 0 1px ${COLORS.borderSoft}`, background: "#fff", cursor: "pointer",
        }}>
          <option value="all">Todas las estaciones</option>
          {stationState.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <div style={{marginLeft: "auto", fontSize: 12, color: COLORS.grey500, fontWeight: 500}}>
          {filtered.length} eventos
        </div>
      </div>

      <Card padding={0} style={{overflow:"hidden"}}>
        {filtered.length ? filtered.map(ev => <ActivityRow key={ev.id} ev={ev}/>)
          : <div style={{padding: 40, textAlign:"center", color: COLORS.grey400, fontSize: 13, fontWeight: 500}}>Sin eventos para el filtro aplicado</div>}
      </Card>
    </div>
  );
};

Object.assign(window, { ActivityScreen });
