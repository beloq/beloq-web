// beloq Console — Pantalla Ajustes (perfil, usuarios, facturación)

const SettingsScreen = () => {
  const [tab, setTab] = React.useState("org");

  return (
    <div style={{padding: "24px 28px 32px", display:"flex", flexDirection:"column", gap: 20}}>
      <div>
        <div style={{fontSize: 12, fontWeight: 700, color: COLORS.grey500, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6}}>Ajustes</div>
        <h1 style={{fontSize: 24, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.02em"}}>Configuración de tu organización</h1>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "220px 1fr", gap: 24}}>
        <div style={{display: "flex", flexDirection: "column", gap: 2}}>
          {[
            {id:"org", label:"Organización", icon:"building"},
            {id:"users", label:"Usuarios", icon:"users"},
            {id:"notifications", label:"Notificaciones", icon:"bell"},
            {id:"billing", label:"Facturación", icon:"euro"},
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 14px", border: 0, background: tab === t.id ? "#fff" : "transparent",
              boxShadow: tab === t.id ? `0 0 0 1px ${COLORS.borderSoft}, 0 1px 2px rgba(0,0,0,0.03)` : "none",
              borderRadius: 10, cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 13,
              color: tab === t.id ? COLORS.ink : COLORS.grey700,
            }}>
              <Icon name={t.icon} size={15} color={tab === t.id ? COLORS.ink : COLORS.grey500}/>
              {t.label}
            </button>
          ))}
        </div>

        <div>
          {tab === "org" && (
            <Card padding={28}>
              <div style={{fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 4}}>Datos de la organización</div>
              <div style={{fontSize: 12, color: COLORS.grey500, fontWeight: 500, marginBottom: 24}}>Información que aparece en informes y facturación.</div>
              <div style={{display:"grid", gridTemplateColumns: "1fr 1fr", gap: 16}}>
                <Field label="Nombre legal" value={USER_PROFILE.org}/>
                <Field label="CIF" value="Q-4618002-B"/>
                <Field label="Dirección fiscal" value="Camí de Vera s/n, 46022 València"/>
                <Field label="Persona de contacto" value={USER_PROFILE.name}/>
                <Field label="Email" value={USER_PROFILE.email}/>
                <Field label="Teléfono" value="+34 963 87 70 00"/>
              </div>
              <div style={{marginTop: 24, display: "flex", gap: 8, justifyContent: "flex-end"}}>
                <Button variant="secondary" size="md">Cancelar</Button>
                <Button variant="dark" size="md">Guardar cambios</Button>
              </div>
            </Card>
          )}

          {tab === "users" && (
            <Card padding={0}>
              <div style={{padding: "20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom: `1px solid ${COLORS.borderSoft}`}}>
                <div>
                  <div style={{fontSize: 15, fontWeight: 700, color: COLORS.ink}}>Usuarios con acceso</div>
                  <div style={{fontSize: 12, color: COLORS.grey500, fontWeight: 500, marginTop: 2}}>3 usuarios activos en tu organización</div>
                </div>
                <Button variant="dark" size="md" icon="plus">Invitar usuario</Button>
              </div>
              {[
                {name: "Àlex Company", email: "movilidad@upv.es", role: "Administrador", last: "Hoy, 10:42"},
                {name: "Maria Torrent", email: "m.torrent@upv.es", role: "Gestor", last: "Ayer"},
                {name: "Servei Seguretat", email: "seguretat@upv.es", role: "Solo lectura", last: "Hace 3 días"},
              ].map((u, i, arr) => (
                <div key={u.email} style={{padding: "16px 24px", display:"grid", gridTemplateColumns: "1fr 1fr 1fr auto", alignItems: "center", gap: 16, borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.borderSoft}` : 0}}>
                  <div style={{display:"flex", alignItems:"center", gap: 12}}>
                    <div style={{width: 36, height: 36, borderRadius: "50%", background: COLORS.yellow, color: COLORS.ink, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13}}>
                      {u.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink}}>{u.name}</div>
                      <div style={{fontSize: 11, color: COLORS.grey500, fontWeight: 500}}>{u.email}</div>
                    </div>
                  </div>
                  <Badge tone={u.role === "Administrador" ? "ink" : "neutral"}>{u.role}</Badge>
                  <div style={{fontSize: 12, color: COLORS.grey500, fontWeight: 500}}>Último acceso: {u.last}</div>
                  <Icon name="chevronRight" size={14} color={COLORS.grey400}/>
                </div>
              ))}
            </Card>
          )}

          {tab === "notifications" && (
            <Card padding={24}>
              <div style={{fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 4}}>Preferencias de notificación</div>
              <div style={{fontSize: 12, color: COLORS.grey500, fontWeight: 500, marginBottom: 20}}>Decide cuándo quieres que te avisemos.</div>
              {[
                {label: "Batería baja en alguna estación", email: true, push: true},
                {label: "Módulo sin respuesta > 1h", email: true, push: true},
                {label: "Incidencia resuelta por beloq", email: true, push: false},
                {label: "Resumen diario de actividad", email: true, push: false},
                {label: "Informe mensual listo para descargar", email: true, push: false},
                {label: "Cambios en facturación", email: true, push: false},
              ].map((n, i) => (
                <div key={i} style={{display:"grid", gridTemplateColumns: "1fr auto auto", gap: 24, padding: "12px 0", alignItems:"center", borderTop: i ? `1px solid ${COLORS.borderSoft}` : 0}}>
                  <div style={{fontSize: 13, color: COLORS.ink, fontWeight: 500}}>{n.label}</div>
                  <Toggle defaultOn={n.email} label="Email"/>
                  <Toggle defaultOn={n.push} label="Push"/>
                </div>
              ))}
            </Card>
          )}

          {tab === "billing" && (
            <div style={{display: "flex", flexDirection: "column", gap: 16}}>
              <Card padding={24} style={{background: `linear-gradient(135deg, ${COLORS.ink} 0%, #2A2A28 100%)`, color: "#fff", position: "relative", overflow: "hidden"}}>
                <div style={{position:"absolute", top:-30, right:-30, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.yellow}22, transparent 70%)`}}/>
                <div style={{position: "relative"}}>
                  <div style={{fontSize: 11, fontWeight: 700, color: COLORS.yellow, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 10}}>Tu plan actual</div>
                  <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, alignItems: "end"}}>
                    <div>
                      <div style={{fontSize: 20, fontWeight: 700}}>{USER_PROFILE.plan}</div>
                      <div style={{fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500, marginTop: 4}}>10 estaciones · {USER_PROFILE.modulesContracted} módulos</div>
                    </div>
                    <div>
                      <div style={{fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: 2}}>CUOTA MENSUAL</div>
                      <div style={{fontSize: 22, fontWeight: 700, fontVariantNumeric: "tabular-nums"}}>{USER_PROFILE.monthlyFee.toLocaleString("es-ES")} €</div>
                    </div>
                    <div>
                      <div style={{fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: 2}}>PRÓXIMA FACTURA</div>
                      <div style={{fontSize: 14, fontWeight: 700}}>{USER_PROFILE.nextInvoice}</div>
                    </div>
                    <Button variant="primary" size="md" iconRight="arrowRight">Ver detalles</Button>
                  </div>
                </div>
              </Card>

              <Card padding={0}>
                <div style={{padding: "18px 24px", borderBottom: `1px solid ${COLORS.borderSoft}`}}>
                  <div style={{fontSize: 14, fontWeight: 700, color: COLORS.ink}}>Historial de facturas</div>
                </div>
                {[
                  {mes: "Abril 2026", importe: 15480, estado: "Pendiente"},
                  {mes: "Marzo 2026", importe: 15480, estado: "Pagada"},
                  {mes: "Febrero 2026", importe: 15480, estado: "Pagada"},
                  {mes: "Enero 2026", importe: 11400, estado: "Pagada"},
                ].map((f, i, arr) => (
                  <div key={i} style={{padding: "14px 24px", display:"grid", gridTemplateColumns: "1fr 1fr auto auto", alignItems:"center", gap: 20, borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.borderSoft}` : 0}}>
                    <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink}}>{f.mes}</div>
                    <div style={{fontSize: 13, fontWeight: 700, color: COLORS.ink, fontVariantNumeric:"tabular-nums"}}>{f.importe.toLocaleString("es-ES")} €</div>
                    <Badge tone={f.estado === "Pagada" ? "success" : "warning"} dot>{f.estado}</Badge>
                    <Button variant="ghost" size="sm" icon="download">PDF</Button>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({label, value}) => (
  <div>
    <label style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "0.4px", textTransform: "uppercase", display: "block", marginBottom: 6}}>{label}</label>
    <div style={{padding: "10px 14px", background: COLORS.grey50, borderRadius: 8, fontSize: 13, fontWeight: 600, color: COLORS.ink, boxShadow: `inset 0 0 0 1px ${COLORS.borderSoft}`}}>{value}</div>
  </div>
);

const Toggle = ({defaultOn = false, label}) => {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div style={{display: "flex", alignItems: "center", gap: 8}}>
      <span style={{fontSize: 11, fontWeight: 700, color: COLORS.grey500, letterSpacing: "0.4px", textTransform: "uppercase", minWidth: 36}}>{label}</span>
      <button onClick={() => setOn(!on)} style={{
        width: 36, height: 20, borderRadius: 10, border: 0, padding: 2, cursor: "pointer",
        background: on ? COLORS.ink : COLORS.grey200, transition: "background 180ms",
        display: "flex", alignItems: "center",
      }}>
        <div style={{width: 16, height: 16, borderRadius: "50%", background: "#fff", transform: `translateX(${on ? 16 : 0}px)`, transition: "transform 180ms", boxShadow: "0 1px 2px rgba(0,0,0,0.2)"}}/>
      </button>
    </div>
  );
};

Object.assign(window, { SettingsScreen });
