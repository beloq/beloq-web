// beloq Console — Motor de simulación en vivo
// Hook que produce eventos de actividad y cifras que suben cada 8-15s.

const useLiveSim = (seedActivity, stations) => {
  const [activity, setActivity] = React.useState(() =>
    seedActivity.map(a => ({...a, id: Math.random().toString(36).slice(2), t: Date.now() - a.time * 1000}))
  );
  const [revenueToday, setRevenueToday] = React.useState(241.50);
  const [usesToday, setUsesToday] = React.useState(300);
  const [stationState, setStationState] = React.useState(() => stations.map(s => ({...s})));
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    // Avanza el reloj cada segundo para "hace Xs/min"
    const clk = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(clk);
  }, []);

  // Ref al estado actual de las estaciones, para que el loop vea siempre
  // datos frescos sin re-lanzar el intervalo.
  const stationStateRef = React.useRef([]);
  stationStateRef.current = stationState;

  // Momento en el que cada estación entró en estado saturado (null si no lo está).
  // Se inicializa con Diseño ETSIADI ya saturada desde hace unos minutos.
  const saturatedSinceRef = React.useRef(
    Object.fromEntries(stations.map(s => [
      s.id,
      s.modulesOccupied >= s.modules ? Date.now() - (2 + Math.floor(Math.random()*8)) * 60 * 1000 : null
    ]))
  );

  React.useEffect(() => {
    const eventTypes = [
      { type: "unlock", detail: "Desbloqueo", amount: null, weight: 3 },
      { type: "revenue", detail: "Sesión finalizada", amount: () => 0.65 + Math.random()*1.6, weight: 4 },
      { type: "reserve", detail: "Reserva 10min", amount: null, weight: 1 },
      { type: "release", detail: "Liberado", amount: null, weight: 2 },
      { type: "revenue", detail: "Exceso sobre plan Flow", amount: () => 0.18 + Math.random()*0.45, weight: 1 },
    ];
    const weighted = eventTypes.flatMap(e => Array(e.weight).fill(e));

    const run = () => {
      // 1 de cada 3 ticks, si hay alguna estación saturada, emitimos una
      // notificación informativa de saturación (no es una alerta técnica).
      const currentStates = stationStateRef.current;
      const saturated = currentStates.filter(s => s.modulesOccupied >= s.modules);
      if (saturated.length > 0 && Math.random() < 0.33) {
        const st = saturated[Math.floor(Math.random() * saturated.length)];
        const since = saturatedSinceRef.current[st.id] || Date.now();
        const mins = Math.max(1, Math.round((Date.now() - since) / 60000));
        const ev = {
          id: Math.random().toString(36).slice(2),
          type: "saturated",
          station: st.name,
          stationId: st.id,
          detail: `Estación saturada desde hace ${mins} min`,
          amount: null,
          t: Date.now(),
        };
        setActivity(prev => [ev, ...prev].slice(0, 40));
        return;
      }

      const station = stations[Math.floor(Math.random() * stations.length)];
      const tpl = weighted[Math.floor(Math.random() * weighted.length)];
      const mod = Math.floor(Math.random() * station.modules) + 1;
      const amount = tpl.amount ? +tpl.amount().toFixed(2) : null;
      const ev = {
        id: Math.random().toString(36).slice(2),
        type: tpl.type,
        station: station.name,
        stationId: station.id,
        detail: tpl.type === "unlock" || tpl.type === "release" || tpl.type === "reserve"
          ? `Mòd. ${mod} · ${tpl.detail}`
          : tpl.detail,
        amount,
        t: Date.now(),
      };
      setActivity(prev => [ev, ...prev].slice(0, 40));
      if (amount) {
        setRevenueToday(r => +(r + amount).toFixed(2));
      }
      if (tpl.type === "unlock") {
        setUsesToday(u => u + 1);
      }

      // Cambiar ligeramente módulos ocupados (saltando las estaciones
      // marcadas como alwaysFull — Diseño ETSIADI).
      setStationState(ss => ss.map(s => {
        if (s.alwaysFull) return s;
        if (Math.random() > 0.7) {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const next = Math.max(0, Math.min(s.modules, s.modulesOccupied + delta));
          // Registrar transiciones hacia/desde saturación
          const wasFull = s.modulesOccupied >= s.modules;
          const isFull = next >= s.modules;
          if (isFull && !wasFull) saturatedSinceRef.current[s.id] = Date.now();
          if (!isFull && wasFull) saturatedSinceRef.current[s.id] = null;
          return {...s, modulesOccupied: next};
        }
        return s;
      }));
    };

    const loop = () => {
      run();
      const next = 6000 + Math.random() * 8000;
      timeout = setTimeout(loop, next);
    };
    let timeout = setTimeout(loop, 4000);
    return () => clearTimeout(timeout);
  }, []);

  const avgOccupancy = Math.round(
    stationState.reduce((acc, s) => acc + s.modulesOccupied / s.modules, 0) / stationState.length * 100
  );
  const totalModules = stationState.reduce((a, s) => a + s.modules, 0);
  const occupiedModules = stationState.reduce((a, s) => a + s.modulesOccupied, 0);
  const incidents = stationState.filter(s => s.status === "warning").length;

  return {
    activity, revenueToday, usesToday, stationState,
    avgOccupancy, totalModules, occupiedModules, incidents, tick,
  };
};

const formatRel = (t, nowTick) => {
  const sec = Math.floor((Date.now() - t) / 1000);
  if (sec < 5) return "ahora";
  if (sec < 60) return `hace ${sec}s`;
  if (sec < 3600) return `hace ${Math.floor(sec/60)}m`;
  return `hace ${Math.floor(sec/3600)}h`;
};

Object.assign(window, { useLiveSim, formatRel });
