// beloq Console — Mapa real con Leaflet + Stadia Maps
// Usa tiles de Stadia "osm_bright" (vibe amarillo/claro), marcadores custom beloq.

const STADIA_KEY = "a3456413-7193-4f84-82b2-f102ec73e99d";

// Coordenadas reales de Valencia (Campus UPV Camí de Vera)
const STATION_COORDS = {
  "ST-UPV-01": [39.48077, -0.34171],  // Casa de l'Alumne
  "ST-UPV-02": [39.48231, -0.34568],  // Rectorat (3A)
  "ST-UPV-03": [39.48155, -0.34350],  // Àgora UPV
  "ST-UPV-04": [39.4812548, -0.3482618],  // ETSIE Edificación (1B)
  "ST-UPV-05": [39.48130, -0.34300],  // Biblioteca General (4L)
  "ST-UPV-06": [39.4835034, -0.3441361],  // ETSIAMN Agronómica (3P)
  "ST-UPV-07": [39.48050, -0.34480],  // Parada Metro UPV
  "ST-UPV-08": [39.480523, -0.3385443], // Diseño ETSIADI (7E)
  "ST-UPV-09": [39.4793445, -0.3355211], // StartUPV (9B)
  "ST-UPV-10": [39.4773857, -0.334989],  // IDEAS UPV (8B)
};

const CampusMap = ({ stations = [], onStationClick, selectedId, centerBias = "left" }) => {
  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const markersRef = React.useRef({});

  // Init mapa
  React.useEffect(() => {
    if (!window.L || !containerRef.current || mapRef.current) return;

    const L = window.L;

    // Centro provisional; el fit real se hace en el effect de marcadores
    // con fitBounds + padding derecho para el panel de actividad.
    const map = L.map(containerRef.current, {
      center: [39.4815, -0.3430], zoom: 15,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      dragging: true,
    });

    L.tileLayer(`https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=${STADIA_KEY}`, {
      maxZoom: 20, minZoom: 11,
      attribution: '© Stadia Maps · © OpenStreetMap',
      subdomains: "abcd",
    }).addTo(map);

    L.control.attribution({ position: "bottomleft", prefix: false }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapRef.current = map;

    // Forzar resize tras el primer render
    setTimeout(() => map.invalidateSize(), 60);
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Sync marcadores
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.L) return;
    const L = window.L;

    // Limpia viejos
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    const coordsList = [];

    stations.forEach(s => {
      const coords = STATION_COORDS[s.id];
      if (!coords) return;
      coordsList.push(coords);
      const warn = s.status === "warning";
      const full = s.modulesOccupied >= s.modules;
      const isSelected = selectedId === s.id;

      // Estación saturada → marcador negro (brightness 0 sobre el PNG amarillo)
      // Estación con aviso → desaturado
      const fill = full
        ? "brightness(0)"
        : warn ? "grayscale(1) brightness(0.7)" : "none";
      const extraClass = full ? "full" : warn ? "warn" : "";

      const html = `
        <div class="beloq-pin ${extraClass} ${isSelected ? "selected" : ""}">
          <img src="assets/beloq-leaf.png" alt="" style="filter: ${fill}"/>
          <div class="beloq-pin-label">${s.modulesOccupied}</div>
        </div>`;

      const icon = L.divIcon({
        className: "beloq-pin-wrapper",
        html,
        iconSize: [44, 44],
        iconAnchor: [22, 44],  // ancla en la punta inferior del pétalo
        popupAnchor: [0, -44],
      });

      const marker = L.marker(coords, { icon }).addTo(map);
      marker.on("click", () => onStationClick?.(s));

      const statusLabel = full ? "Saturada" : warn ? "Incidencia" : "Operativa";
      const statusClass = full ? "full" : warn ? "warn" : "ok";

      const pop = L.popup({
        closeButton: false,
        className: "beloq-popup",
        offset: [0, -18],
      }).setContent(`
        <div class="beloq-pop">
          <div class="beloq-pop-head">
            <b>${s.name}</b>
            <span class="beloq-pop-status ${statusClass}">${statusLabel}</span>
          </div>
          <div class="beloq-pop-rows">
            <div><span>Módulos</span><b>${s.modulesOccupied}/${s.modulesTotal} ocupados</b></div>
            <div><span>Batería</span><b>${s.batteryAvg}%</b></div>
            <div><span>Último uso</span><b>${s.lastUseRel}</b></div>
          </div>
          <div class="beloq-pop-cta">Ver detalle →</div>
        </div>`);
      marker.bindPopup(pop);

      markersRef.current[s.id] = marker;
    });

    // Encuadre automático: bounding box de todos los pines con padding derecho
    // = 1/3 del ancho del contenedor cuando hay panel lateral (centerBias='left'),
    // de modo que el centro del conjunto de pines cae en el centro del área
    // visible (los 2/3 izquierdos).
    if (coordsList.length > 0 && containerRef.current) {
      const bounds = L.latLngBounds(coordsList);
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      const rightPad = centerBias === "left" ? Math.round(w / 3) + 16 : 40;
      map.fitBounds(bounds, {
        paddingTopLeft: [40, 40],
        paddingBottomRight: [rightPad, 60],
        maxZoom: 16.5,
        animate: true,
      });
    }
  }, [stations, selectedId, onStationClick, centerBias]);

  return (
    <div ref={containerRef} style={{width: "100%", height: "100%", background: "#F5F3EE"}}/>
  );
};

Object.assign(window, { CampusMap, STATION_COORDS });
