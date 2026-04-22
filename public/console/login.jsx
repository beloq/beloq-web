// beloq Console — Pantalla Login
// Minimal SaaS clásico. Centrado, sobrio, profesional.

const LoginScreen = ({ onLogin }) => {
  const { t } = useLang();
  const [email, setEmail] = React.useState("movilidad@upv.es");
  const [password, setPassword] = React.useState("••••••••••");
  const [loading, setLoading] = React.useState(false);

  const submit = (e) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin?.(); }, 700);
  };

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg,
      display: "grid", placeItems: "center", padding: 24, position: "relative",
      backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,234,53,0.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,234,53,0.06), transparent 50%)`,
    }}>
      {/* Toggle idioma en esquina superior derecha */}
      <div style={{position: "absolute", top: 24, right: 24}}>
        <LangToggle/>
      </div>
      <div style={{width: "100%", maxWidth: 420}}>
        {/* Logo */}
        <div style={{textAlign: "center", marginBottom: 40}}>
          <img src="assets/logo-black.png" alt="beloq" style={{height: 44}}/>
          <div style={{
            fontSize: 12, fontWeight: 700, letterSpacing: "2px",
            color: COLORS.grey500, marginTop: 14, textTransform: "uppercase",
          }}>Console</div>
        </div>

        {/* Card */}
        <Card padding={32} style={{boxShadow: "0 0 0 1px #EDEDEA, 0 1px 2px rgba(0,0,0,0.04), 0 20px 40px rgba(0,0,0,0.04)"}}>
          <div style={{marginBottom: 24}}>
            <h1 style={{fontSize: 22, fontWeight: 700, color: COLORS.ink, marginBottom: 6, letterSpacing: "-0.01em"}}>
              {t("login_title")}
            </h1>
            <p style={{fontSize: 14, color: COLORS.grey500, fontWeight: 500}}>
              {t("login_sub")}
            </p>
          </div>

          <form onSubmit={submit} style={{display: "flex", flexDirection: "column", gap: 14}}>
            <div>
              <label style={{fontSize: 12, fontWeight: 600, color: COLORS.grey700, display: "block", marginBottom: 6}}>
                {t("login_email")}
              </label>
              <Input icon="mapPin" placeholder="tu@organizacion.es" value={email} onChange={setEmail}
                style={{height: 44}}/>
            </div>
            <div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6}}>
                <label style={{fontSize: 12, fontWeight: 600, color: COLORS.grey700}}>{t("login_pass")}</label>
                <a style={{fontSize: 12, fontWeight: 600, color: COLORS.grey500, cursor: "pointer"}}>{t("login_forgot")}</a>
              </div>
              <Input placeholder="••••••••••" value={password} onChange={setPassword} type="password"
                style={{height: 44}}/>
            </div>

            <label style={{display:"flex", alignItems:"center", gap:8, fontSize: 13, color: COLORS.grey700, fontWeight: 500, marginTop: 2, cursor:"pointer"}}>
              <input type="checkbox" defaultChecked style={{accentColor: COLORS.ink, width: 14, height: 14}}/>
              {t("login_remember")}
            </label>

            <Button variant="dark" size="lg" onClick={submit} disabled={loading}
              style={{marginTop: 6, width: "100%", height: 46, fontSize: 14}}>
              {loading ? "…" : t("login_submit")}
            </Button>
          </form>

          <div style={{
            marginTop: 22, paddingTop: 18, borderTop: `1px solid ${COLORS.borderSoft}`,
            display: "flex", alignItems: "flex-start", gap: 10,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: COLORS.yellow,
              boxShadow: `0 0 0 3px ${COLORS.yellow}44`, marginTop: 6, flexShrink: 0,
            }}/>
            <div>
              <div style={{fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 2}}>
                {t("login_demo_title")}
              </div>
              <div style={{fontSize: 12, color: COLORS.grey500, fontWeight: 500, lineHeight: 1.5}}>
                {t("login_demo_sub")}
              </div>
            </div>
          </div>
        </Card>

        <div style={{marginTop: 22, textAlign: "center", display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.grey500, fontWeight: 500}}>
          <span>© 2026 beloq Movilidad</span>
          <a href="https://www.beloq.es" target="_blank" style={{color: COLORS.grey700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4}}>
            beloq.es <Icon name="externalLink" size={11}/>
          </a>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LoginScreen });
