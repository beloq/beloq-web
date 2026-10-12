// beloq.es/3d: la cámara no puede entrar en el módulo, su barra ni la
// estación, para no enseñar el interior (el electrocierre y su fijación).
// scripts/parchear-visor-3d.mjs lo mete en el visor exportado de Claude Design.
//
// - Sin desplazamiento: siempre se gira alrededor del modelo.
// - La persona puede acercarse hasta casi tocar una pieza, pero no atravesarla.
//   Se comprueba el punto y también el trayecto desde la última posición
//   buena: el módulo es de chapa hueca y un zoom rápido podría saltar una
//   chapa fina. Cada pieza lleva un margen de 5 cm, que tapa también la
//   ranura de la barra y los agujeros.
// - Los movimientos de cámara del propio visor (encuadre inicial, cambio de
//   vehículo) no se frenan: solo se limita lo que hace la persona.
(function () {
  var MARGEN = 0.05;
  var OBSTACULO = /^(cuerpo|pivote_barra|estacion)(_\d+)?$/;
  var st, ctl, cam;
  var obstaculos = [];
  var listaHecha = 0;
  var ultimo = null;
  var activo = false;
  var finActivo = 0;

  function esObstaculo(o) {
    for (var a = o; a; a = a.parent) {
      if (OBSTACULO.test(a.name || "")) return true;
    }
    return false;
  }

  function hacerLista() {
    obstaculos = [];
    st._scene.traverse(function (o) {
      if (!o.isMesh || !o.geometry || !esObstaculo(o)) return;
      if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      obstaculos.push(o);
    });
    listaHecha = Date.now();
  }

  // Caja alineada con los ejes de la pieza, en el mundo y con el margen.
  function caja(o) {
    var b = o.geometry.boundingBox, e = o.matrixWorld.elements;
    var mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
    for (var i = 0; i < 8; i++) {
      var x = i & 1 ? b.max.x : b.min.x;
      var y = i & 2 ? b.max.y : b.min.y;
      var z = i & 4 ? b.max.z : b.min.z;
      var w = [
        e[0] * x + e[4] * y + e[8] * z + e[12],
        e[1] * x + e[5] * y + e[9] * z + e[13],
        e[2] * x + e[6] * y + e[10] * z + e[14],
      ];
      for (var k = 0; k < 3; k++) {
        if (w[k] < mn[k]) mn[k] = w[k];
        if (w[k] > mx[k]) mx[k] = w[k];
      }
    }
    for (var j = 0; j < 3; j++) {
      mn[j] -= MARGEN;
      mx[j] += MARGEN;
    }
    return [mn, mx];
  }

  function dentro(p, c) {
    return (
      p[0] > c[0][0] && p[0] < c[1][0] &&
      p[1] > c[0][1] && p[1] < c[1][1] &&
      p[2] > c[0][2] && p[2] < c[1][2]
    );
  }

  // ¿El segmento a→b atraviesa la caja? (método de las franjas)
  function cruza(a, b, c) {
    var t0 = 0, t1 = 1;
    for (var k = 0; k < 3; k++) {
      var d = b[k] - a[k];
      if (Math.abs(d) < 1e-12) {
        if (a[k] <= c[0][k] || a[k] >= c[1][k]) return false;
        continue;
      }
      var u = (c[0][k] - a[k]) / d, v = (c[1][k] - a[k]) / d;
      if (u > v) { var s = u; u = v; v = s; }
      if (u > t0) t0 = u;
      if (v < t1) t1 = v;
      if (t0 > t1) return false;
    }
    return true;
  }

  function bloqueado(desde, hasta) {
    for (var i = 0; i < obstaculos.length; i++) {
      var c = caja(obstaculos[i]);
      if (dentro(hasta, c) || (desde && cruza(desde, hasta, c))) return true;
    }
    return false;
  }

  function posicion() {
    return [cam.position.x, cam.position.y, cam.position.z];
  }

  /** Guarda la posición actual como buena si está fuera de todo. */
  function anotarSiEstaFuera() {
    if (!obstaculos.length || Date.now() - listaHecha > 3000) hacerLista();
    var p = posicion();
    if (!bloqueado(null, p)) ultimo = p;
  }

  function alCambiar() {
    if (!obstaculos.length || Date.now() - listaHecha > 3000) hacerLista();
    var p = cam.position, ahora = [p.x, p.y, p.z];
    var usuario = activo || Date.now() < finActivo;
    if (!usuario) {
      if (!bloqueado(null, ahora)) ultimo = ahora;
      return;
    }
    if (!ultimo) return; // sin posición buena conocida no se puede comparar
    if (bloqueado(ultimo, ahora)) {
      p.set(ultimo[0], ultimo[1], ultimo[2]);
      cam.lookAt(ctl.target);
      return;
    }
    ultimo = ahora;
  }

  function preparar() {
    st = document.querySelector("three-d-stage");
    if (!st || !st._controls || !st._camera || !st._scene) {
      setTimeout(preparar, 200);
      return;
    }
    ctl = st._controls;
    cam = st._camera;
    ctl.enablePan = false;
    anotarSiEstaFuera();
    // «start» llega al tocar, antes de que la cámara se mueva: punto de partida.
    ctl.addEventListener("start", function () {
      activo = true;
      anotarSiEstaFuera();
    });
    ctl.addEventListener("end", function () {
      activo = false;
      finActivo = Date.now() + 1500; // la inercia sigue moviendo la cámara un rato
    });
    ctl.addEventListener("change", alCambiar);
  }

  preparar();
})();
