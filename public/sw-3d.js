// Caché sin conexión de beloq.es/3d para la tableta del stand (modo feria).
// Solo la registra /3d?feria (src/app/components/Pantalla3D.tsx), con alcance
// /3d: el resto de la web no pasa por aquí. Al instalarse guarda la página, sus
// ficheros de /_next/static, las fuentes y los dos visores; sin red, los sirve desde aquí,
// así que el 3D sigue aunque la tableta recargue o se cambie de escena.

const CACHE = "beloq-3d-v1";
const PAGINA = "/3d";
const VISORES = ["/3d/visor/modulo.html", "/3d/visor/estacion.html"];

/** Descarga la página, lo que enlaza en /_next/static y sus fuentes, y lo guarda. */
async function guardarTodo() {
  const cache = await caches.open(CACHE);
  const resp = await fetch(PAGINA, { cache: "no-cache" });
  if (!resp.ok) throw new Error(`${PAGINA}: ${resp.status}`);
  const html = await resp.clone().text();
  await cache.put(PAGINA, resp);
  const estaticos = new Set(html.match(/\/_next\/static\/[^"'\\\s)]+/g) || []);
  for (const url of [...estaticos]) {
    if (!url.endsWith(".css")) continue;
    const css = await fetch(url).then((r) => r.text());
    // Lo que enlaza con url(...), como las fuentes de /fonts/.
    for (const [, u] of css.matchAll(/url[(]([^)]+)[)]/g)) {
      const ruta = u.replace(/["' ]/g, "");
      if (ruta.startsWith("/")) estaticos.add(ruta);
    }
  }
  await cache.addAll([...estaticos, ...VISORES]);
}

self.addEventListener("install", (e) => {
  e.waitUntil(guardarTodo().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith("beloq-3d-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

/** Red primero (con límite de tiempo); sin red, lo guardado. */
async function redPrimero(req, clave) {
  const cache = await caches.open(CACHE);
  try {
    const resp = await Promise.race([
      fetch(req),
      new Promise((_, no) => setTimeout(() => no(new Error("sin red")), 4000)),
    ]);
    if (resp.ok) await cache.put(clave, resp.clone());
    return resp;
  } catch {
    const guardada = await cache.match(clave);
    if (guardada) return guardada;
    throw new Error("sin red y sin copia");
  }
}

/**
 * Lo guardado primero. Con `actualizar`, además se renueva la copia en segundo
 * plano cuando hay red (los visores); /_next/static no cambia nunca.
 */
async function guardadoPrimero(req, clave, actualizar) {
  const cache = await caches.open(CACHE);
  const guardada = await cache.match(clave);
  const traer = () =>
    fetch(req).then((resp) => {
      if (resp.ok) cache.put(clave, resp.clone());
      return resp;
    });
  if (guardada) {
    if (actualizar) traer().catch(() => {});
    return guardada;
  }
  return traer();
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname === PAGINA) {
    e.respondWith(redPrimero(req, PAGINA));
  } else if (VISORES.includes(url.pathname)) {
    e.respondWith(guardadoPrimero(req, url.pathname, true));
  } else if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/fonts/")) {
    e.respondWith(guardadoPrimero(req, url.pathname, false));
  }
});
