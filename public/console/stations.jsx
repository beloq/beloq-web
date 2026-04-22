// beloq Console — Pantalla Estaciones (listado)

// Mini-visualización de módulos: cubos que se rellenan de amarillo cuando están
// ocupados. Distribución aleatoria pero estable por estación (seed = id). Si la
// estación tiene 10+ módulos, se reparten en 2 filas (mitad y mitad).
const ModuleMiniGrid = ({ station }) => {
  const { id, modules: total, modulesOccupied } = station;
  const cols = total >= 10 ? total / 2 : total;

  const perm = React.useMemo(() => {
    let seed = 0;
    for (let i = 0; i < id.length; i++) seed = ((seed << 5) - seed + id.charCodeAt(i)) | 0;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) | 0;
      return ((seed >>> 0) % 100000) / 100000;
    };
    const arr = Array.from({length: total}, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [id, total]);

  const occupiedSet = React.useMemo(() => new Set(perm.slice(0, modulesOccupied)), [perm, modulesOccupied]);

  return (
    <div style={{display: "inline-grid", gridTemplateColumns: `repeat(${cols}, 9px)`, gridAutoRows: "9px", gap: 2}}>
      {Array.from({length: total}, (_, i) => {
        const occ = occupiedSet.has(i);
        return (
          <div key={i} style={{
            width: 9, height: 9,
            borderRadius: 2,
            background: occ ? COLORS.yellow : "#fff",
            border: occ ? `1px solid ${COLORS.yellow}` : `1px solid ${COLORS.borderSoft}`,
            boxSizing: "border-box",
            transition: "background 200ms, border-color 200ms",
          }}/>
        );
      })}
    </div>
  );
};

const StationsScreen = ({ stationState, onSelectStation }) => {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  const filtered = stationState.filter(s => {
    if (filter === "warning" && s.status !== "warning") return false;
    if (filter === "online" && s.status !== "online") return false;
    if (q && !s.name.toLowerCase().includes(q.toLowerCase()) && !s.address.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{padding: "24px 28px 32px", display:"flex", flexDirection:"column", gap: 18}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
        <div>
          <div style={{fontSize: 12, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6}}>Estaciones</div>
          <h1 style={{fontSize: 24, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.02em"}}>Tus 10 estaciones</h1>
          <p style={{fontSize: 13, color: COLORS.grey500, fontWeight: 500, marginTop: 2}}>115 módulos desplegados · 1 incidencia activa</p>
        </div>
        <div style={{display:"flex", gap: 10}}>
          <div style={{width: 260}}><Input icon="search" placeholder="Buscar estación, edificio…" value={q} onChange={setQ}/></div>
          <InlineTabs value={filter} onChange={setFilter} tabs={[
            {value: "all", label: "Todas"},
            {value: "online", label: "Operativas"},
            {value: "warning", label: "Con aviso"},
          ]}/>
        </div>
      </div>

      <Card padding={0} style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns: "2fr 1.6fr 1.2fr 1fr 1fr 1fr 40px", padding: "12px 20px", borderBottom: `1px solid ${COLORS.borderSoft}`, fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "0.6px", textTransform:"uppercase"}}>
          <div>Estación</div><div>Ubicación</div><div>Módulos</div><div>Batería</div><div>Usos hoy</div><div>Estado</div><div></div>
        </div>
        {filtered.map((s, i) => {
          const battColor = s.battery < 20 ? COLORS.error : s.battery < 50 ? COLORS.warning : COLORS.success;
          return (
            <div key={s.id} onClick={() => onSelectStation(s)} style={{
              display:"grid", gridTemplateColumns: "1.8fr 1.4fr 1.5fr 1fr 1fr 1fr 40px",
              padding: "14px 20px", alignItems: "center", cursor: "pointer",
              borderBottom: i < filtered.length - 1 ? `1px solid ${COLORS.borderSoft}` : 0,
              transition: "background 120ms",
            }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.grey50}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div>
                <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink}}>{s.name}</div>
                <div style={{fontSize: 11, color: COLORS.grey400, fontWeight: 500, marginTop: 2, fontVariantNumeric: "tabular-nums"}}>{s.id}</div>
              </div>
              <div style={{fontSize: 12, color: COLORS.grey700, fontWeight: 500}}>{s.address}</div>
              <div>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                  <ModuleMiniGrid station={s}/>
                  <span style={{fontSize: 12, fontWeight: 700, color: COLORS.ink, fontVariantNumeric: "tabular-nums", whiteSpace:"nowrap"}}>
                    {s.modulesOccupied}/{s.modules}
                  </span>
                </div>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: 6}}>
                <Icon name="battery" size={14} color={battColor}/>
                <span style={{fontSize: 12, fontWeight: 700, color: COLORS.ink, fontVariantNumeric: "tabular-nums"}}>{s.battery}%</span>
              </div>
              <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink, fontVariantNumeric: "tabular-nums"}}>{s.usesToday}</div>
              <div>
                {s.status === "warning"
                  ? <Badge tone="warning" dot>Aviso</Badge>
                  : <Badge tone="success" dot>Operativa</Badge>}
              </div>
              <Icon name="chevronRight" size={16} color={COLORS.grey400}/>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

Object.assign(window, { StationsScreen });
