// beloq Console — Pantalla Resumen (Dashboard ejecutivo)
// KPIs en vivo, mapa del campus, actividad, impacto sostenible, gráficas.

const Sparkline = ({ data, color = COLORS.ink, height = 36, width = 120 }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`).join(" ");
  const area = `0,${height} ${points} ${width},${height}`;
  return (
    <svg width={width} height={height} style={{display:"block"}}>
      <polygon points={area} fill={color} opacity="0.08"/>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MiniBar = ({ data, color = COLORS.yellow, highlightLast = false, height = 64 }) => {
  const max = Math.max(...data.map(d => d.n ?? d.amount));
  return (
    <div style={{display:"flex", alignItems:"flex-end", gap:6, height}}>
      {data.map((d, i) => {
        const v = d.n ?? d.amount;
        const h = (v / max) * (height - 16);
        const isLast = highlightLast && i === data.length - 1;
        return (
          <div key={i} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
            <div style={{
              width: "100%", height: h, borderRadius: "4px 4px 2px 2px",
              background: isLast ? COLORS.ink : color,
              minHeight: 4,
            }}/>
            <span style={{fontSize: 10, fontWeight: 600, color: COLORS.grey400}}>{d.day}</span>
          </div>
        );
      })}
    </div>
  );
};

const KpiCard = ({ label, value, sub, trend, trendLabel, sparkline, color = COLORS.ink, icon }) => (
  <Card padding={18}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 10}}>
      <div style={{fontSize: 12, fontWeight: 600, color: COLORS.grey500, letterSpacing: "0.2px"}}>{label}</div>
      {icon && (
        <div style={{width: 28, height: 28, borderRadius: 8, background: COLORS.grey50, display:"grid", placeItems:"center"}}>
          <Icon name={icon} size={14} color={COLORS.grey500}/>
        </div>
      )}
    </div>
    <div style={{fontSize: 28, fontWeight: 700, color, letterSpacing: "-0.02em", lineHeight: 1.1, fontVariantNumeric: "tabular-nums"}}>
      {value}
    </div>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop: 10, gap: 8}}>
      <div style={{display: "flex", flexDirection:"column", gap: 2}}>
        {sub && <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 500}}>{sub}</div>}
        {trend != null && (
          <div style={{display:"flex", alignItems:"center", gap: 4, fontSize: 11, fontWeight: 700, color: trend >= 0 ? COLORS.success : COLORS.error}}>
            <Icon name={trend >= 0 ? "arrowUp" : "arrowDown"} size={11}/>
            {Math.abs(trend)}% <span style={{color: COLORS.grey400, fontWeight: 500}}>{trendLabel}</span>
          </div>
        )}
      </div>
      {sparkline && <Sparkline data={sparkline} color={color}/>}
    </div>
  </Card>
);

const ActivityRow = ({ ev }) => {
  const cfg = {
    unlock: { color: COLORS.yellowDark, icon: "check", bg: "#FFF7B8" },
    revenue: { color: COLORS.success, icon: "euro", bg: "#ECFDF5" },
    reserve: { color: COLORS.warning, icon: "clock", bg: "#FEF3C7" },
    release: { color: COLORS.grey500, icon: "check", bg: COLORS.grey100 },
    alert: { color: COLORS.error, icon: "alert", bg: "#FEE2E2" },
    subscription: { color: COLORS.info, icon: "users", bg: "#EFF6FF" },
    saturated: { color: "#fff", icon: "dashboard", bg: COLORS.ink },
  }[ev.type] || { color: COLORS.grey500, icon: "dot", bg: COLORS.grey100 };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
      borderBottom: `1px solid ${COLORS.borderSoft}`,
    }}>
      <div style={{width: 30, height: 30, borderRadius: 8, background: cfg.bg, display:"grid", placeItems:"center", flexShrink: 0}}>
        <Icon name={cfg.icon} size={14} color={cfg.color}/>
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{fontSize: 13, fontWeight: 600, color: COLORS.ink, lineHeight: 1.35}}>
          {ev.station}
        </div>
        <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 500, lineHeight: 1.3, marginTop: 1}}>
          {ev.detail}
        </div>
      </div>
      {ev.amount != null ? (
        <div style={{fontSize: 13, fontWeight: 700, color: COLORS.success, fontVariantNumeric: "tabular-nums"}}>
          +{ev.amount.toFixed(2)} €
        </div>
      ) : (
        <div style={{fontSize: 11, color: COLORS.grey400, fontWeight: 500, whiteSpace: "nowrap"}}>
          {formatRel(ev.t)}
        </div>
      )}
    </div>
  );
};

const DashboardScreen = ({ sim, onSelectStation, onNav }) => {
  const { t } = useLang();
  const { activity, revenueToday, usesToday, stationState, avgOccupancy, totalModules, occupiedModules, incidents } = sim;
  const animRev = useCounter(revenueToday, 900, 2);
  const animUses = useCounter(usesToday, 600);
  const animOcc = useCounter(avgOccupancy, 500);
  const animCo2 = useCounter(IMPACT.co2SavedKg, 900);

  return (
    <div style={{padding: "24px 28px 32px", display:"flex", flexDirection:"column", gap: 20}}>
      {/* Saludo + contexto */}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom: 4}}>
        <div>
          <div style={{fontSize: 12, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6}}>
            {t("dash_section")}
          </div>
          <h1 style={{fontSize: 26, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.02em"}}>
            {t("hello")}, {USER_PROFILE.name.split(" ")[0]} 👋
          </h1>
          <p style={{fontSize: 14, color: COLORS.grey500, fontWeight: 500, marginTop: 4}}>
            {t("dash_intro")}
          </p>
        </div>
        <div style={{display:"flex", alignItems:"center", gap: 10}}>
          <Badge tone="success" dot>{t("live")}</Badge>
          <Button variant="secondary" size="sm" icon="download">{t("report_quick")}</Button>
        </div>
      </div>

      {/* KPI row */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14}}>
        <KpiCard label={t("kpi_revenue_today")} icon="euro"
          value={`${animRev.toFixed(2).replace(".", ",")} €`}
          trend={12} trendLabel={t("vs_yesterday")}
          sparkline={WEEK_REVENUE.map(w => w.amount)}
          color={COLORS.ink}/>
        <KpiCard label={t("kpi_uses_today")} icon="activity"
          value={fmt.num(animUses)}
          trend={8} trendLabel={t("vs_yesterday")}
          sparkline={WEEK_USES.map(w => w.n)}
          color={COLORS.ink}/>
        <KpiCard label={t("kpi_occupancy")} icon="dashboard"
          value={`${animOcc}%`}
          sub={`${occupiedModules} ${t("modules_of")} ${totalModules} ${t("modules_label")}`}
          trend={3} trendLabel={t("vs_week")}
          color={COLORS.yellowDark}/>
        <KpiCard label={t("kpi_users_active")} icon="users"
          value="412"
          sub={t("users_sub")}
          trend={18} trendLabel={t("vs_prev_month")}
          color={COLORS.ink}/>
      </div>

      {/* Impacto — tarjeta hero */}
      <div style={{
        borderRadius: 16, overflow: "hidden",
        background: `linear-gradient(135deg, ${COLORS.ink} 0%, #2A2A28 100%)`,
        color: "#fff", position: "relative",
      }}>
        <div style={{position: "absolute", top: -40, right: -40, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.yellow}22, transparent 70%)`}}/>
        <div style={{padding: "24px 28px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr auto", gap: 32, alignItems: "center", position: "relative"}}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap: 10, marginBottom: 6}}>
              <img src="assets/beloq-leaf.png" alt="beloq" style={{width: 36, height: 36, objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(255,234,53,0.4))"}}/>
              <div style={{fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)"}}>
                {t("impact_section")}
              </div>
            </div>
            <div style={{fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500, marginTop: 2}}>
              {t("impact_sub")}
            </div>
          </div>
          <div>
            <div style={{fontSize: 28, fontWeight: 700, color: COLORS.yellow, letterSpacing: "-0.02em", fontVariantNumeric:"tabular-nums"}}>
              {fmt.num(animCo2)} <span style={{fontSize: 14, color: "#fff", fontWeight: 600}}>kg</span>
            </div>
            <div style={{fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 2, letterSpacing: "0.3px"}}>{t("impact_co2")}</div>
          </div>
          <div>
            <div style={{fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", fontVariantNumeric:"tabular-nums"}}>
              {fmt.num(IMPACT.kmSustainable)} <span style={{fontSize: 14, fontWeight: 600, color:"rgba(255,255,255,0.7)"}}>km</span>
            </div>
            <div style={{fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 2, letterSpacing: "0.3px"}}>{t("impact_km")}</div>
          </div>
          <div>
            <div style={{fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", fontVariantNumeric:"tabular-nums"}}>
              {fmt.num(IMPACT.tripsReplaced)}
            </div>
            <div style={{fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 2, letterSpacing: "0.3px"}}>{t("impact_trips")}</div>
          </div>
          <Button variant="primary" size="sm" iconRight="arrowRight" onClick={() => onNav?.("reports")}>
            {t("impact_cta")}
          </Button>
        </div>
      </div>

      {/* Mapa full-width con actividad flotante */}
      <Card padding={0} style={{overflow: "hidden", position: "relative"}}>
        <div style={{padding: "16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom: `1px solid ${COLORS.borderSoft}`}}>
          <div>
            <div style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1px", textTransform:"uppercase"}}>
              {t("map_section")}
            </div>
            <div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink, marginTop: 2}}>
              {t("map_title")}
            </div>
          </div>
          <div style={{display:"flex", alignItems:"center", gap: 14, fontSize: 11, fontWeight: 600, color: COLORS.grey500}}>
            <span style={{display:"flex", alignItems:"center", gap:5}}><span style={{width: 8, height: 8, borderRadius: "50%", background: COLORS.yellow, border: "1.5px solid #1A1A1A"}}/>{t("operative")}</span>
            <span style={{display:"flex", alignItems:"center", gap:5}}><span style={{width: 8, height: 8, borderRadius: "50%", background: COLORS.grey400, border: "1.5px solid #1A1A1A"}}/>{t("incident")}</span>
            <Button variant="ghost" size="sm" onClick={() => onNav?.("stations")}>
              {t("see_list")}
            </Button>
          </div>
        </div>
        <div style={{height: 480, position: "relative"}}>
          <CampusMap stations={stationState} onStationClick={onSelectStation}/>

          {/* Panel flotante de actividad en vivo — 1/3 derecho */}
          <div style={{
            position: "absolute", top: 16, right: 16, bottom: 16,
            width: "calc(33.333% - 24px)",
            zIndex: 500,
            background: "rgba(255,255,255,0.96)", backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: 12, boxShadow: "0 10px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}>
            <div style={{padding: "14px 16px 12px", borderBottom: `1px solid ${COLORS.borderSoft}`, display:"flex", justifyContent: "space-between", alignItems: "center"}}>
              <div>
                <div style={{fontSize: 10, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1px", textTransform:"uppercase"}}>{t("live_section")}</div>
                <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink, marginTop: 2}}>{t("live_title")}</div>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: COLORS.success, padding: "4px 8px", borderRadius: 20, background: "#ECFDF5"}}>
                <span style={{width: 6, height: 6, borderRadius: "50%", background: COLORS.success, boxShadow: `0 0 0 3px ${COLORS.success}33`, animation: "pulse 2s infinite"}}/>
                LIVE
              </div>
            </div>
            <div style={{flex: 1, overflow: "auto"}}>
              {activity.slice(0, 8).map(ev => <ActivityRow key={ev.id} ev={ev}/>)}
            </div>
            <div style={{padding: "10px 16px", borderTop: `1px solid ${COLORS.borderSoft}`, textAlign: "center", background: "#fff"}}>
              <a onClick={() => onNav?.("activity")} style={{fontSize: 12, fontWeight: 600, color: COLORS.grey700, cursor: "pointer"}}>
                {t("see_all_activity")} →
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* Uso semanal + Horas pico */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap: 16}}>
        <Card>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 16}}>
            <div>
              <div style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1px", textTransform:"uppercase"}}>{t("last_7_days")}</div>
              <div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink, marginTop: 2}}>{t("uses_per_day")}</div>
            </div>
            <div style={{display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: COLORS.success}}>
              <Icon name="arrowUp" size={12}/> +14% {t("vs_week")}
            </div>
          </div>
          <MiniBar data={WEEK_USES} color={COLORS.yellow}/>
          <div style={{marginTop: 14, padding: "12px 0 0", borderTop: `1px solid ${COLORS.borderSoft}`, display:"flex", justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 600}}>{t("total_week")}</div>
              <div style={{fontSize: 18, fontWeight: 700, color: COLORS.ink, fontVariantNumeric:"tabular-nums"}}>1.533 {t("uses_unit")}</div>
            </div>
            <div>
              <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 600}}>{t("avg_time")}</div>
              <div style={{fontSize: 18, fontWeight: 700, color: COLORS.ink, fontVariantNumeric:"tabular-nums"}}>42 min</div>
            </div>
            <div>
              <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 600}}>{t("rotation")}</div>
              <div style={{fontSize: 18, fontWeight: 700, color: COLORS.ink, fontVariantNumeric:"tabular-nums"}}>5,8/día</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 16}}>
            <div>
              <div style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1px", textTransform:"uppercase"}}>{t("peak_hour")}</div>
              <div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink, marginTop: 2}}>{t("hourly_occ")}</div>
            </div>
            <Badge tone="yellow">16h–18h · 86%</Badge>
          </div>
          <div style={{display:"flex", alignItems:"flex-end", gap: 4, height: 88}}>
            {HOURLY_OCC.map((h, i) => {
              const isPeak = h.p > 80;
              return (
                <div key={i} style={{flex: 1, display:"flex", flexDirection:"column", alignItems:"center", gap: 4}}>
                  <div style={{
                    width: "100%", height: `${h.p * 0.7}px`,
                    background: isPeak ? COLORS.ink : (h.p > 50 ? COLORS.yellow : "#FFF6B8"),
                    borderRadius: "3px 3px 2px 2px", minHeight: 4,
                  }}/>
                  <span style={{fontSize: 9, fontWeight: 600, color: isPeak ? COLORS.ink : COLORS.grey400}}>{h.h}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

Object.assign(window, { DashboardScreen, Sparkline, MiniBar, KpiCard, ActivityRow });
