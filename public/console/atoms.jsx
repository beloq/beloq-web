// beloq Console — Átomos y helpers compartidos
// Todos los componentes exportados a window.

const COLORS = {
  yellow: "#FFEA35",
  yellowDark: "#F5C800",
  ink: "#0F0F0E",
  inkWarm: "#373736",
  grey900: "#1A1A1A",
  grey700: "#4A4A49",
  grey500: "#757575",
  grey400: "#9E9E9E",
  grey300: "#C4C4C4",
  grey200: "#E8E8E8",
  grey100: "#F0F0F0",
  grey50: "#F7F7F7",
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  borderSoft: "#EDEDEA",
};

// ===== ICONOS (Lucide-style, 1.75px stroke, trazo ink) =====
const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.75, style }) => {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    map: <><polygon points="9 3 3 6 3 21 9 18 15 21 21 18 21 3 15 6 9 3"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></>,
    activity: <polyline points="3 12 7 12 10 4 14 20 17 12 21 12"/>,
    reports: <><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    arrowUp: <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    arrowDown: <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    chevronLeft: <polyline points="15 18 9 12 15 6"/>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    minus: <line x1="5" y1="12" x2="19" y2="12"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    circle: <circle cx="12" cy="12" r="9"/>,
    dot: <circle cx="12" cy="12" r="4" fill={color} stroke="none"/>,
    wifi: <><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
    battery: <><rect x="2" y="7" width="18" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></>,
    alert: <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    info: <><circle cx="12" cy="12" r="9"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    euro: <><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6.41A6.5 6.5 0 0 0 15 5a7 7 0 0 0 0 14 6.5 6.5 0 0 0 4-1.41"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    signal: <><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0, ...style}}>
      {paths[name]}
    </svg>
  );
};

// ===== BOTONES =====
const Button = ({ variant = "primary", size = "md", icon, iconRight, children, onClick, disabled, style, ...rest }) => {
  const heights = { sm: 32, md: 38, lg: 48 };
  const px = { sm: 12, md: 16, lg: 22 };
  const fs = { sm: 12, md: 13, lg: 14 };
  const base = {
    height: heights[size], padding: `0 ${px[size]}px`, fontSize: fs[size],
    fontFamily: "Montserrat, sans-serif", fontWeight: 600,
    letterSpacing: "0.2px", border: 0, cursor: disabled ? "default" : "pointer",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    transition: "background 150ms, transform 100ms, border-color 150ms",
    whiteSpace: "nowrap",
  };
  const variants = {
    primary: { background: COLORS.yellow, color: COLORS.ink, borderRadius: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.04), inset 0 -1px 0 rgba(0,0,0,0.06)" },
    dark: { background: COLORS.ink, color: "#fff", borderRadius: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.12)" },
    secondary: { background: "#fff", color: COLORS.ink, borderRadius: 8, boxShadow: `inset 0 0 0 1px ${COLORS.borderSoft}` },
    ghost: { background: "transparent", color: COLORS.grey700, borderRadius: 8 },
    accent: { background: COLORS.ink, color: COLORS.yellow, borderRadius: 8 },
  };
  if (disabled) Object.assign(variants[variant], { background: COLORS.grey200, color: COLORS.grey400, boxShadow: "none" });
  return (
    <button {...rest} disabled={disabled} onClick={onClick}
      style={{...base, ...variants[variant], ...style}}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />}
    </button>
  );
};

// ===== CARD =====
const Card = ({ children, style, padding = 20, ...rest }) => (
  <div {...rest} style={{
    background: COLORS.surface, borderRadius: 14, padding,
    boxShadow: `0 0 0 1px ${COLORS.borderSoft}, 0 1px 2px rgba(0,0,0,0.03)`,
    ...style,
  }}>{children}</div>
);

// ===== BADGE / CHIP =====
const Badge = ({ tone = "neutral", children, dot, style }) => {
  const tones = {
    neutral: { bg: COLORS.grey100, fg: COLORS.grey700, dot: COLORS.grey400 },
    success: { bg: "#ECFDF5", fg: "#047857", dot: COLORS.success },
    warning: { bg: "#FEF3C7", fg: "#92400E", dot: COLORS.warning },
    error:   { bg: "#FEE2E2", fg: "#B91C1C", dot: COLORS.error },
    info:    { bg: "#EFF6FF", fg: "#1D4ED8", dot: COLORS.info },
    yellow:  { bg: "#FFF7B8", fg: "#6E5200", dot: COLORS.yellowDark },
    ink:     { bg: COLORS.ink, fg: "#fff", dot: COLORS.yellow },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 9px", borderRadius: 20,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.3px",
      textTransform: "uppercase", lineHeight: 1.4, ...style,
    }}>
      {dot && <span style={{width: 6, height: 6, borderRadius: "50%", background: t.dot}}/>}
      {children}
    </span>
  );
};

// ===== INPUT =====
const Input = ({ icon, placeholder, value, onChange, type = "text", style, suffix, ...rest }) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{
      background: "#fff", borderRadius: 8, height: 38,
      display: "flex", alignItems: "center", padding: "0 10px", gap: 8,
      boxShadow: focused ? `inset 0 0 0 2px ${COLORS.ink}` : `inset 0 0 0 1px ${COLORS.borderSoft}`,
      transition: "box-shadow 150ms",
      ...style,
    }}>
      {icon && <Icon name={icon} size={14} color={focused ? COLORS.ink : COLORS.grey400} />}
      <input {...rest} type={type} value={value ?? ""} onChange={e => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{border:0, outline:0, flex:1, font:"inherit", fontSize:13, fontWeight:500, color:COLORS.ink, background:"transparent"}}
      />
      {suffix}
    </div>
  );
};

// ===== STATUS DOT =====
const StatusDot = ({ status = "online", size = 8 }) => {
  const map = {
    online: COLORS.success, warning: COLORS.warning,
    offline: COLORS.grey400, error: COLORS.error, reserved: COLORS.warning,
  };
  return (
    <span style={{
      width: size, height: size, borderRadius: "50%",
      background: map[status], display: "inline-block",
      boxShadow: `0 0 0 3px ${map[status]}22`, flexShrink: 0,
    }}/>
  );
};

// ===== TABS (inline) =====
const InlineTabs = ({ tabs, value, onChange }) => (
  <div style={{display:"flex", gap:4, background: COLORS.grey100, borderRadius:8, padding:3}}>
    {tabs.map(t => (
      <button key={t.value} onClick={() => onChange(t.value)} style={{
        padding: "5px 12px", borderRadius: 6, border: 0, cursor: "pointer",
        background: value === t.value ? "#fff" : "transparent",
        color: value === t.value ? COLORS.ink : COLORS.grey500,
        fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 12,
        boxShadow: value === t.value ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
        transition: "all 150ms",
      }}>{t.label}</button>
    ))}
  </div>
);

// ===== Hook para animación de contadores =====
const useCounter = (target, duration = 800, decimals = 0) => {
  const [val, setVal] = React.useState(target);
  const ref = React.useRef(target);
  React.useEffect(() => {
    const from = ref.current;
    const start = performance.now();
    let raf;
    const step = (t) => {
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const v = from + (target - from) * eased;
      setVal(v);
      if (progress < 1) raf = requestAnimationFrame(step);
      else ref.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return Number(val.toFixed(decimals));
};

// Formatters
const fmt = {
  eur: (n, dec = 2) => n.toLocaleString("es-ES", {minimumFractionDigits: dec, maximumFractionDigits: dec}) + " €",
  num: (n) => n.toLocaleString("es-ES"),
  pct: (n) => `${Math.round(n)}%`,
  rel: (sec) => {
    if (sec < 60) return `hace ${sec}s`;
    if (sec < 3600) return `hace ${Math.floor(sec/60)} min`;
    return `hace ${Math.floor(sec/3600)}h`;
  },
};

Object.assign(window, {
  COLORS, Icon, Button, Card, Badge, Input, StatusDot, InlineTabs, useCounter, fmt,
});
