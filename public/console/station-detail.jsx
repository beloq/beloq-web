// beloq Console — Detalle de estación

const ModuleGrid = ({ station, sim }) => {
  // Simular estado individual de cada módulo
  const modules = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < station.modules; i++) {
      let state = "free";
      if (i < station.modulesOccupied) state = "occupied";
      else if (i === station.modulesOccupied) state = "reserved";
      arr.push({ id: i + 1, state, time: state === "occupied" ? Math.floor(Math.random() * 180) + 10 : 0 });
    }
    return arr;
  }, [station.id, station.modulesOccupied]);

  const stateCfg = {
    occupied: { bg: COLORS.yellow, label: "Ocupado", border: COLORS.ink },
    free: { bg: "#fff", label: "Libre", border: COLORS.borderSoft },
    reserved: { bg: COLORS.warning, label: "Reservado", border: COLORS.warning },
    alert: { bg: COLORS.error, label: "Alerta", border: COLORS.error },
  };

  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 10}}>
      {modules.map(m => {
        const c = stateCfg[m.state];
        return (
          <div key={m.id} style={{
            background: c.bg, borderRadius: 12, padding: "14px 12px",
            border: `2px solid ${c.border}`,
            display: "flex", flexDirection: "column", gap: 4, minHeight: 84,
            boxShadow: m.state === "occupied" ? "0 2px 6px rgba(245,200,0,0.25)" : "none",
          }}>
            <div style={{fontSize: 10, fontWeight: 700, color: m.state === "occupied" ? COLORS.ink : COLORS.grey500, letterSpacing: "0.3px"}}>
              MÒD. {String(m.id).padStart(2, "0")}
            </div>
            <div style={{fontSize: 12, fontWeight: 700, color: m.state === "free" ? COLORS.grey500 : (m.state === "reserved" ? "#fff" : COLORS.ink), marginTop: 2}}>
              {c.label}
            </div>
            {m.state === "occupied" && (
              <div style={{fontSize: 11, fontWeight: 600, color: COLORS.ink, marginTop: "auto", fontVariantNumeric:"tabular-nums"}}>
                ⏱ {Math.floor(m.time/60) ? `${Math.floor(m.time/60)}h ${m.time%60}m` : `${m.time} min`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const StationDetailScreen = ({ station, sim, onBack }) => {
  const occPct = (station.modulesOccupied / station.modules) * 100;
  const events = sim.activity.filter(e => e.stationId === station.id).slice(0, 8);

  return (
    <div style={{padding: "24px 28px 32px", display:"flex", flexDirection:"column", gap: 20}}>
      {/* Breadcrumb + título */}
      <div>
        <div style={{display:"flex", alignItems:"center", gap: 6, fontSize: 12, fontWeight: 600, color: COLORS.grey500, marginBottom: 8}}>
          <a onClick={onBack} style={{cursor: "pointer", color: COLORS.grey500}}>Estaciones</a>
          <Icon name="chevronRight" size={12} color={COLORS.grey400}/>
          <span style={{color: COLORS.ink}}>{station.name}</span>
        </div>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap: 12}}>
              <h1 style={{fontSize: 26, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.02em"}}>{station.name}</h1>
              {station.status === "warning"
                ? <Badge tone="warning" dot>Aviso</Badge>
                : <Badge tone="success" dot>Operativa</Badge>}
            </div>
            <p style={{fontSize: 13, color: COLORS.grey500, fontWeight: 500, marginTop: 4, display:"flex", alignItems:"center", gap: 6}}>
              <Icon name="mapPin" size={13}/> {station.address} · <span style={{fontVariantNumeric:"tabular-nums"}}>{station.id}</span>
            </p>
          </div>
          <div style={{display: "flex", gap: 8}}>
            <Button variant="secondary" size="md" icon="alert">Reportar incidencia</Button>
            <Button variant="secondary" size="md" icon="download">Exportar datos</Button>
          </div>
        </div>
      </div>

      {/* KPI row estación */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 12}}>
        <Card padding={16}>
          <div style={{fontSize: 11, fontWeight: 600, color: COLORS.grey500, marginBottom: 4}}>Ocupación</div>
          <div style={{fontSize: 22, fontWeight: 700, color: COLORS.ink, fontVariantNumeric:"tabular-nums"}}>
            {station.modulesOccupied}<span style={{color: COLORS.grey400, fontSize: 15}}>/{station.modules}</span>
          </div>
          <div style={{height: 4, background: COLORS.grey100, borderRadius: 2, marginTop: 8, overflow:"hidden"}}>
            <div style={{width: `${occPct}%`, height: "100%", background: COLORS.yellow}}/>
          </div>
        </Card>
        <Card padding={16}>
          <div style={{fontSize: 11, fontWeight: 600, color: COLORS.grey500, marginBottom: 4}}>Batería</div>
          <div style={{fontSize: 22, fontWeight: 700, color: station.battery < 20 ? COLORS.error : COLORS.ink, fontVariantNumeric:"tabular-nums"}}>{station.battery}%</div>
          <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 500, marginTop: 4, display:"flex", alignItems:"center", gap: 4}}>
            <Icon name="signal" size={11}/> {station.signal} · Online
          </div>
        </Card>
        <Card padding={16}>
          <div style={{fontSize: 11, fontWeight: 600, color: COLORS.grey500, marginBottom: 4}}>Usos hoy</div>
          <div style={{fontSize: 22, fontWeight: 700, color: COLORS.ink, fontVariantNumeric:"tabular-nums"}}>{station.usesToday}</div>
          <div style={{fontSize: 11, color: COLORS.success, fontWeight: 700, marginTop: 4, display:"flex", alignItems:"center", gap: 4}}>
            <Icon name="arrowUp" size={11}/> +11%
          </div>
        </Card>
        <Card padding={16}>
          <div style={{fontSize: 11, fontWeight: 600, color: COLORS.grey500, marginBottom: 4}}>Ingresos hoy</div>
          <div style={{fontSize: 22, fontWeight: 700, color: COLORS.ink, fontVariantNumeric:"tabular-nums"}}>
            {station.revenueToday.toFixed(2).replace(".", ",")} €
          </div>
          <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 500, marginTop: 4}}>Mes: {station.revenueMonth.toFixed(0)} €</div>
        </Card>
        <Card padding={16}>
          <div style={{fontSize: 11, fontWeight: 600, color: COLORS.grey500, marginBottom: 4}}>Tiempo medio</div>
          <div style={{fontSize: 22, fontWeight: 700, color: COLORS.ink, fontVariantNumeric:"tabular-nums"}}>48 min</div>
          <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 500, marginTop: 4}}>Rotación 4,9/día</div>
        </Card>
      </div>

      {/* Incidencia banner si aplica */}
      {station.status === "warning" && (
        <div style={{
          background: "#FEF3C7", borderRadius: 12, padding: "14px 18px",
          border: `1px solid #FBBF24`,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{width: 36, height: 36, borderRadius: 10, background: COLORS.warning, display:"grid", placeItems:"center", flexShrink: 0}}>
            <Icon name="alert" size={18} color="#fff"/>
          </div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 13, fontWeight: 700, color: "#92400E"}}>Batería por debajo del 15%</div>
            <div style={{fontSize: 12, color: "#78350F", fontWeight: 500, marginTop: 2}}>
              El equipo técnico de beloq ha sido notificado. Recibirás actualizaciones en Actividad. No se requiere acción por tu parte.
            </div>
          </div>
          <Badge tone="warning">Abierta · Hace 2h</Badge>
        </div>
      )}

      {/* Módulos + Gráfica horaria */}
      <div style={{display:"grid", gridTemplateColumns: "1.3fr 1fr", gap: 16}}>
        <Card>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 16}}>
            <div>
              <div style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1px", textTransform:"uppercase"}}>Estado de módulos</div>
              <div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink, marginTop: 2}}>En tiempo real</div>
            </div>
            <div style={{display: "flex", alignItems: "center", gap: 14, fontSize: 11, fontWeight: 600, color: COLORS.grey500}}>
              <span style={{display:"flex", alignItems:"center", gap:5}}><span style={{width: 10, height: 10, borderRadius: 2, background: COLORS.yellow, border: `1.5px solid ${COLORS.ink}`}}/>Ocupado</span>
              <span style={{display:"flex", alignItems:"center", gap:5}}><span style={{width: 10, height: 10, borderRadius: 2, background: "#fff", border: `1.5px solid ${COLORS.borderSoft}`}}/>Libre</span>
              <span style={{display:"flex", alignItems:"center", gap:5}}><span style={{width: 10, height: 10, borderRadius: 2, background: COLORS.warning}}/>Reservado</span>
            </div>
          </div>
          <ModuleGrid station={station} sim={sim}/>
        </Card>

        <Card>
          <div style={{marginBottom: 14}}>
            <div style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1px", textTransform:"uppercase"}}>Hora pico</div>
            <div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink, marginTop: 2}}>Ocupación por franja</div>
          </div>
          <div style={{display:"flex", alignItems:"flex-end", gap: 4, height: 110}}>
            {HOURLY_OCC.map((h, i) => {
              const isPeak = h.p > 80;
              return (
                <div key={i} style={{flex: 1, display:"flex", flexDirection:"column", alignItems:"center", gap: 4}}>
                  <div style={{width: "100%", height: `${h.p * 0.9}px`, background: isPeak ? COLORS.ink : (h.p > 50 ? COLORS.yellow : "#FFF6B8"), borderRadius: "3px 3px 2px 2px", minHeight: 4}}/>
                  <span style={{fontSize: 9, fontWeight: 600, color: isPeak ? COLORS.ink : COLORS.grey400}}>{h.h}</span>
                </div>
              );
            })}
          </div>
          <div style={{marginTop: 16, paddingTop: 14, borderTop: `1px solid ${COLORS.borderSoft}`, display: "flex", justifyContent:"space-between"}}>
            <div><div style={{fontSize: 10, color: COLORS.grey500, fontWeight: 600}}>Mañana</div><div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink}}>68%</div></div>
            <div><div style={{fontSize: 10, color: COLORS.grey500, fontWeight: 600}}>Tarde</div><div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink}}>79%</div></div>
            <div><div style={{fontSize: 10, color: COLORS.grey500, fontWeight: 600}}>Noche</div><div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink}}>21%</div></div>
          </div>
        </Card>
      </div>

      {/* Historial eventos */}
      <Card padding={0}>
        <div style={{padding: "14px 20px", borderBottom: `1px solid ${COLORS.borderSoft}`}}>
          <div style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1px", textTransform:"uppercase"}}>Actividad reciente</div>
          <div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink, marginTop: 2}}>Historial de eventos</div>
        </div>
        {events.length ? events.map(ev => <ActivityRow key={ev.id} ev={ev}/>)
          : <div style={{padding: 30, textAlign: "center", color: COLORS.grey400, fontSize: 13, fontWeight: 500}}>Sin eventos recientes en esta estación</div>}
      </Card>
    </div>
  );
};

Object.assign(window, { StationDetailScreen, ModuleGrid });
