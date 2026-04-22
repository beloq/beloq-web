// beloq Console — Pantalla Informes (generador de PDF simulado)

const ReportsScreen = () => {
  const [period, setPeriod] = React.useState("month");
  const [motivo, setMotivo] = React.useState("ejecutivo");
  const [kpis, setKpis] = React.useState(["ingresos", "usos", "ocupacion", "co2", "peak"]);
  const [format, setFormat] = React.useState("pdf");
  const [generating, setGenerating] = React.useState(false);
  const [generated, setGenerated] = React.useState(false);

  const toggleKpi = (k) => {
    setKpis(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);
    setGenerated(false);
  };

  const allKpis = [
    {id: "ingresos", label: "Ingresos (totales, por tipo, por estación)"},
    {id: "usos", label: "Usos totales (sesiones)"},
    {id: "ocupacion", label: "Ocupación media"},
    {id: "tiempo", label: "Tiempo medio de uso"},
    {id: "usuarios", label: "Usuarios únicos activos"},
    {id: "rotacion", label: "Rotación por módulo"},
    {id: "peak", label: "Horas pico de demanda"},
    {id: "co2", label: "CO₂ evitado / km sostenibles"},
    {id: "incidencias", label: "Incidencias abiertas / resueltas"},
  ];

  const periods = [
    {id: "week", label: "Última semana"},
    {id: "month", label: "Último mes"},
    {id: "quarter", label: "Último trimestre"},
    {id: "year", label: "Anual (año en curso)"},
    {id: "custom", label: "Rango personalizado"},
  ];

  const motivos = [
    {id: "ejecutivo", label: "Informe ejecutivo / pleno"},
    {id: "operativo", label: "Informe operativo"},
    {id: "sostenibilidad", label: "Informe de sostenibilidad"},
    {id: "prensa", label: "Nota de prensa"},
    {id: "interno", label: "Uso interno / archivo"},
  ];

  const generate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1400);
  };

  return (
    <div style={{padding: "24px 28px 32px", display:"flex", flexDirection:"column", gap: 20}}>
      <div>
        <div style={{fontSize: 12, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6}}>Informes</div>
        <h1 style={{fontSize: 24, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.02em"}}>Generar informe automatizado</h1>
        <p style={{fontSize: 13, color: COLORS.grey500, fontWeight: 500, marginTop: 2}}>
          Configura periodo, KPIs y motivo. beloq genera un PDF listo para presentar.
        </p>
      </div>

      <div style={{display:"grid", gridTemplateColumns: "1fr 380px", gap: 16}}>
        {/* Form */}
        <Card padding={24}>
          <div style={{display:"flex", flexDirection:"column", gap: 24}}>

            <div>
              <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink, marginBottom: 10}}>Periodo</div>
              <div style={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8}}>
                {periods.map(p => (
                  <button key={p.id} onClick={() => setPeriod(p.id)} style={{
                    padding: "12px 14px", borderRadius: 10, border: 0, cursor: "pointer", textAlign: "left",
                    background: period === p.id ? COLORS.ink : "#fff",
                    color: period === p.id ? "#fff" : COLORS.ink,
                    boxShadow: period === p.id ? "none" : `inset 0 0 0 1px ${COLORS.borderSoft}`,
                    fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 12,
                    transition: "all 150ms",
                  }}>{p.label}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink, marginBottom: 10}}>Motivo del informe</div>
              <select value={motivo} onChange={e => {setMotivo(e.target.value); setGenerated(false);}} style={{
                width: "100%", height: 44, borderRadius: 10, padding: "0 14px",
                fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 13, color: COLORS.ink,
                border: 0, boxShadow: `inset 0 0 0 1px ${COLORS.borderSoft}`, background: "#fff", cursor: "pointer",
              }}>
                {motivos.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>

            <div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10}}>
                <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink}}>KPIs a incluir</div>
                <span style={{fontSize: 11, color: COLORS.grey500, fontWeight: 600}}>{kpis.length} seleccionados</span>
              </div>
              <div style={{display:"grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8}}>
                {allKpis.map(k => {
                  const on = kpis.includes(k.id);
                  return (
                    <label key={k.id} onClick={() => toggleKpi(k.id)} style={{
                      display:"flex", alignItems:"center", gap: 10, padding: "10px 12px", cursor: "pointer",
                      borderRadius: 10, border: 0,
                      background: on ? "#FFF9D9" : "#fff",
                      boxShadow: `inset 0 0 0 1px ${on ? COLORS.yellowDark : COLORS.borderSoft}`,
                    }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 4,
                        background: on ? COLORS.ink : "#fff",
                        boxShadow: on ? "none" : `inset 0 0 0 1.5px ${COLORS.grey300}`,
                        display:"grid", placeItems:"center", flexShrink: 0,
                      }}>
                        {on && <Icon name="check" size={11} color={COLORS.yellow} strokeWidth={3}/>}
                      </div>
                      <span style={{fontSize: 12, fontWeight: 600, color: COLORS.ink}}>{k.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink, marginBottom: 10}}>Formato de salida</div>
              <div style={{display: "flex", gap: 8}}>
                {[{id:"pdf", label:"PDF", icon:"download"}, {id:"xlsx", label:"Excel", icon:"download"}, {id:"csv", label:"CSV", icon:"download"}].map(f => (
                  <button key={f.id} onClick={() => setFormat(f.id)} style={{
                    flex: 1, padding: "10px 14px", borderRadius: 10, border: 0, cursor: "pointer",
                    background: format === f.id ? COLORS.ink : "#fff",
                    color: format === f.id ? "#fff" : COLORS.ink,
                    boxShadow: format === f.id ? "none" : `inset 0 0 0 1px ${COLORS.borderSoft}`,
                    fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 12,
                    display:"flex", alignItems:"center", justifyContent:"center", gap: 6,
                  }}>
                    <Icon name={f.icon} size={12}/> {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Preview */}
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
          <Card padding={0} style={{overflow: "hidden"}}>
            <div style={{padding: "14px 18px", borderBottom: `1px solid ${COLORS.borderSoft}`, display: "flex", justifyContent: "space-between", alignItems:"center"}}>
              <div style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1px", textTransform: "uppercase"}}>Vista previa</div>
              <Badge tone="neutral">{format.toUpperCase()}</Badge>
            </div>
            <div style={{
              padding: 24, background: "#FAFAF8", minHeight: 400,
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              <div style={{background: "#fff", padding: 20, borderRadius: 6, boxShadow: "0 4px 14px rgba(0,0,0,0.08)", border: `1px solid ${COLORS.borderSoft}`, minHeight: 380, display:"flex", flexDirection:"column", gap: 12}}>
                <img src="assets/logo-black.png" alt="" style={{height: 22, width: "auto"}}/>
                <div style={{fontSize: 10, fontWeight: 700, color: COLORS.grey400, letterSpacing: "1px", marginTop: 10}}>{motivos.find(m => m.id === motivo).label.toUpperCase()}</div>
                <div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink}}>{USER_PROFILE.org}</div>
                <div style={{fontSize: 10, color: COLORS.grey500, fontWeight: 500}}>{periods.find(p => p.id === period).label} · Generado 22 abr 2026</div>
                <div style={{height: 1, background: COLORS.borderSoft, margin: "6px 0"}}/>
                <div style={{fontSize: 10, fontWeight: 700, color: COLORS.ink, marginBottom: 4}}>Contenido:</div>
                {kpis.length ? kpis.map(k => {
                  const label = allKpis.find(x => x.id === k)?.label;
                  return <div key={k} style={{fontSize: 9, color: COLORS.grey700, fontWeight: 500, display:"flex", gap: 6, alignItems: "center"}}><Icon name="check" size={9} color={COLORS.success}/>{label}</div>;
                }) : <div style={{fontSize: 10, color: COLORS.grey400}}>Selecciona al menos un KPI</div>}
                <div style={{flex: 1, display:"flex", alignItems:"center", justifyContent:"center", opacity: 0.25}}>
                  <Icon name="reports" size={60} color={COLORS.grey400} strokeWidth={1}/>
                </div>
              </div>
            </div>
          </Card>

          <Button variant="dark" size="lg" icon={generated ? "check" : "download"} onClick={generate} disabled={!kpis.length || generating}>
            {generating ? "Generando…" : (generated ? "Descargar informe" : "Generar informe")}
          </Button>
          {generated && (
            <div style={{fontSize: 12, textAlign: "center", color: COLORS.success, fontWeight: 600, display:"flex", alignItems:"center", justifyContent:"center", gap: 6}}>
              <Icon name="check" size={13}/> Informe listo · beloq-informe-upv-{period}.{format}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ReportsScreen });
