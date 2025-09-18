// Inicializar ejemplos de piezas por línea si no existen
window.piezasEjemplo = {
  NUEVO: [
    { nombre: 'PIEZA A (N1234)', cantidad: 0 },
    { nombre: 'PIEZA B (N5678)', cantidad: 0 },
    { nombre: 'PIEZA C (N9012)', cantidad: 0 },
    { nombre: 'PIEZA D (N3456)', cantidad: 0 },
    { nombre: 'PIEZA E (N7890)', cantidad: 0 },
    { nombre: 'PIEZA F (N1122)', cantidad: 0 },
    { nombre: 'PIEZA G (N3344)', cantidad: 0 },
    { nombre: 'PIEZA H (N5566)', cantidad: 0 },
    { nombre: 'PIEZA I (N7788)', cantidad: 0 },
    { nombre: 'PIEZA J (N9900)', cantidad: 0 },
    { nombre: 'PIEZA K (N2233)', cantidad: 0 },
    { nombre: 'PIEZA L (N4455)', cantidad: 0 }
  ],
  VIEJO: [
    { nombre: 'PIEZA C (V1234)', cantidad: 0 },
    { nombre: 'PIEZA D (V5678)', cantidad: 0 },
    { nombre: 'PIEZA E (V9012)', cantidad: 0 },
    { nombre: 'PIEZA F (V3456)', cantidad: 0 },
    { nombre: 'PIEZA G (V7890)', cantidad: 0 },
    { nombre: 'PIEZA H (V1122)', cantidad: 0 },
    { nombre: 'PIEZA I (V3344)', cantidad: 0 },
    { nombre: 'PIEZA J (V5566)', cantidad: 0 },
    { nombre: 'PIEZA K (V7788)', cantidad: 0 },
    { nombre: 'PIEZA L (V9900)', cantidad: 0 },
    { nombre: 'PIEZA M (V2233)', cantidad: 0 },
    { nombre: 'PIEZA N (V4455)', cantidad: 0 }
  ],
  CONCHA: [
    { nombre: 'CONCHA COMPLETA (44153.A)', cantidad: 0 },
    { nombre: 'CONCHA (P25212)', cantidad: 0 },
    { nombre: 'CONCHA B (C1001)', cantidad: 0 },
    { nombre: 'CONCHA C (C1002)', cantidad: 0 },
    { nombre: 'CONCHA D (C1003)', cantidad: 0 },
    { nombre: 'CONCHA E (C1004)', cantidad: 0 },
    { nombre: 'CONCHA F (C1005)', cantidad: 0 },
    { nombre: 'CONCHA G (C1006)', cantidad: 0 },
    { nombre: 'CONCHA H (C1007)', cantidad: 0 },
    { nombre: 'CONCHA I (C1008)', cantidad: 0 },
    { nombre: 'CONCHA J (C1009)', cantidad: 0 },
    { nombre: 'CONCHA K (C1010)', cantidad: 0 }
  ],
  TAPÓN: [
    { nombre: 'TAPÓN A (T1111)', cantidad: 0 },
    { nombre: 'TAPÓN B (T2222)', cantidad: 0 },
    { nombre: 'TAPÓN C (T3333)', cantidad: 0 },
    { nombre: 'TAPÓN D (T4444)', cantidad: 0 },
    { nombre: 'TAPÓN E (T5555)', cantidad: 0 },
    { nombre: 'TAPÓN F (T6666)', cantidad: 0 },
    { nombre: 'TAPÓN G (T7777)', cantidad: 0 },
    { nombre: 'TAPÓN H (T8888)', cantidad: 0 },
    { nombre: 'TAPÓN I (T9999)', cantidad: 0 },
    { nombre: 'TAPÓN J (T0000)', cantidad: 0 },
    { nombre: 'TAPÓN K (T1212)', cantidad: 0 },
    { nombre: 'TAPÓN L (T3434)', cantidad: 0 }
  ],
  VASO: [
    { nombre: 'VASO A (V1111)', cantidad: 0 },
    { nombre: 'VASO B (V2222)', cantidad: 0 },
    { nombre: 'VASO C (V3333)', cantidad: 0 },
    { nombre: 'VASO D (V4444)', cantidad: 0 },
    { nombre: 'VASO E (V5555)', cantidad: 0 },
    { nombre: 'VASO F (V6666)', cantidad: 0 },
    { nombre: 'VASO G (V7777)', cantidad: 0 },
    { nombre: 'VASO H (V8888)', cantidad: 0 },
    { nombre: 'VASO I (V9999)', cantidad: 0 },
    { nombre: 'VASO J (V0000)', cantidad: 0 },
    { nombre: 'VASO K (V1212)', cantidad: 0 },
    { nombre: 'VASO L (V3434)', cantidad: 0 }
  ]
};

Object.entries(piezasEjemplo).forEach(([linea, piezas]) => {
  if (!localStorage.getItem('piezas_' + linea)) {
    localStorage.setItem('piezas_' + linea, JSON.stringify(piezas));
  }
});
//using gsap 3.11.4


// Variables para el nuevo menú principal

let novaresTitle = document.querySelector(".novaresTitle-skin");
let mainMenuButtons = document.querySelectorAll('.mainMenuButtons-skin .button-structure');
let background = document.querySelector(".background-skin");
let login = document.querySelector(".login-skin");
let bodyContainer = document.querySelector(".bodyContainer-skin");
let lineMenu = document.querySelector('.lineMenu-structure');
let lineaSeleccionadaTitulo = document.getElementById('lineaSeleccionadaTitulo');
let contadorPiezas = document.getElementById('contadorPiezas');
let listaPiezas = document.getElementById('listaPiezas');
let verListaBtn = document.getElementById('verListaBtn');
let volverBtn = document.getElementById('volverBtn');

// Estado de piezas por línea (en localStorage)
function getPiezasLinea(linea) {
  // Siempre devolver la lista completa de piezasEjemplo, sincronizando cantidades desde localStorage si existen
  const key = linea.toUpperCase();
  const ejemplo = piezasEjemplo[key] || [];
  const guardadas = JSON.parse(localStorage.getItem('piezas_' + key)) || [];
  // Sincronizar cantidades
  return ejemplo.map(ej => {
    const found = guardadas.find(g => g.nombre === ej.nombre);
    return found ? { ...ej, cantidad: found.cantidad } : { ...ej };
  });
}
function setPiezasLinea(linea, piezas) {
  // Solo guardar cantidades, nunca eliminar piezas
  const key = linea.toUpperCase();
  const ejemplo = piezasEjemplo[key] || [];
  // Mantener el orden y nombres del ejemplo, solo actualizar cantidades
  const piezasParaGuardar = ejemplo.map(ej => {
    const found = piezas.find(p => p.nombre === ej.nombre);
    return found ? { ...ej, cantidad: found.cantidad } : { ...ej };
  });
  localStorage.setItem('piezas_' + key, JSON.stringify(piezasParaGuardar));
}

// Mostrar menú principal

function mostrarMenuPrincipal() {
  // El video de fondo siempre debe mostrarse
  // background.style.display = "";
  login.style.display = "";
  lineMenu.style.display = "none";
  // Refrescar listas al mostrar menú principal
  if (typeof window.renderizarListaGeneral === 'function') window.renderizarListaGeneral();
  if (typeof window.renderizarPiezas === 'function') {
    const linea = localStorage.getItem('lineaSeleccionada');
    if (linea) window.renderizarPiezas(linea.toUpperCase());
  }
}

// Mostrar submenú de línea

function mostrarMenuLinea(linea) {
  // El video de fondo siempre debe mostrarse
  // background.style.display = "none";
  login.style.display = "none";
  lineMenu.style.display = "flex";
  lineaSeleccionadaTitulo.textContent = linea;
  renderizarPiezas(linea.toUpperCase());
  // Refrescar lista general también
  if (typeof window.renderizarListaGeneral === 'function') window.renderizarListaGeneral();
}

// Renderizar lista de piezas y contador
function renderizarPiezas(linea) {
  let piezas = getPiezasLinea(linea.toUpperCase());
  let total = piezas.reduce((acc, p) => acc + p.cantidad, 0);
  contadorPiezas.textContent = total;
  // Generar tabla con columnas: Nombre, No. Parte, Cantidad, Editar
  let tabla = document.createElement('table');
  tabla.style.width = '100%';
  tabla.style.borderCollapse = 'collapse';
  tabla.style.color = 'var(--fourth-color)';
  tabla.style.background = 'transparent';
  let thead = document.createElement('thead');
  thead.innerHTML = `
    <tr style="background:rgba(255,255,255,0.08);">
      <th style="padding:6px; border-bottom:1px solid var(--fourth-color); text-align:left;">Nombre</th>
      <th style="padding:6px; border-bottom:1px solid var(--fourth-color); text-align:left;">No. Parte</th>
      <th style="padding:6px; border-bottom:1px solid var(--fourth-color); text-align:left;">Cantidad</th>
      <th style="padding:6px; border-bottom:1px solid var(--fourth-color); text-align:center;">Editar</th>
    </tr>
  `;
  tabla.appendChild(thead);
  let tbody = document.createElement('tbody');
  piezas.forEach((pieza, idx) => {
    // Separar nombre y no. parte
    let nombre = pieza.nombre;
    let noParte = '';
    let match = nombre.match(/\(([^)]+)\)$/);
    if (match) {
      noParte = match[1];
      nombre = nombre.replace(/\s*\([^)]+\)$/, '');
    }
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding:6px; text-align:left;">${nombre}</td>
      <td style="padding:6px; text-align:left;">${noParte}</td>
      <td style="padding:6px; text-align:left; font-weight:bold;">${pieza.cantidad}</td>
      <td style="padding:6px; text-align:center;">
        <div class="lineMenu-piece-controls" style="display:inline-flex; gap:5px; margin:0;">
          <input type="number" min="1" value="1" style="width:38px; text-align:center; font-size:0.95rem;">
          <button data-accion="agregar" data-idx="${idx}" style="text-align:center; display:flex; align-items:center; justify-content:center;">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0;">
              <rect x="7" y="3" width="4" height="12" rx="2" fill="#fff"/>
              <rect x="3" y="7" width="12" height="4" rx="2" fill="#fff"/>
            </svg>
          </button>
          <button data-accion="eliminar" data-idx="${idx}" style="text-align:center; display:flex; align-items:center; justify-content:center;">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0;">
              <rect x="3" y="7" width="12" height="4" rx="2" fill="#fff"/>
            </svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
    // Eventos de control
    let controls = tr.querySelector('.lineMenu-piece-controls');
    controls.querySelector('[data-accion="agregar"]').onclick = () => {
      let input = controls.querySelector('input[type="number"]');
      let val = parseInt(input.value);
      if (!isNaN(val) && val > 0) {
        piezas[idx].cantidad += val;
        setPiezasLinea(linea.toUpperCase(), piezas);
        renderizarPiezas(linea.toUpperCase());
      }
    };
    controls.querySelector('[data-accion="eliminar"]').onclick = () => {
      let input = controls.querySelector('input[type="number"]');
      let val = parseInt(input.value);
      if (!isNaN(val) && val > 0) {
        piezas[idx].cantidad = Math.max(0, piezas[idx].cantidad - val);
        setPiezasLinea(linea.toUpperCase(), piezas);
        renderizarPiezas(linea.toUpperCase());
      }
    };
  });
  tabla.appendChild(tbody);
  listaPiezas.innerHTML = "";
  listaPiezas.appendChild(tabla);
  // Ya no se permite añadir nuevas piezas manualmente
}

// Evento para seleccionar línea y mostrar submenú
mainMenuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const linea = btn.getAttribute('data-linea').toUpperCase();
    localStorage.setItem('lineaSeleccionada', linea);
    mostrarMenuLinea(linea);
  });
});

// Botón volver
if (volverBtn) {
  volverBtn.onclick = () => {
    mostrarMenuPrincipal();
  };
}

// Botón ver lista (puedes personalizar su función)
if (verListaBtn) {
  verListaBtn.onclick = () => {
    // Refrescar ambas listas antes de mostrar la general
    if (typeof window.renderizarListaGeneral === 'function') window.renderizarListaGeneral();
    if (typeof window.renderizarPiezas === 'function') {
      const linea = localStorage.getItem('lineaSeleccionada');
      if (linea) window.renderizarPiezas(linea.toUpperCase());
    }
  };
}


// >>> >>> >>> >>> >>> novaresTitle redireccion en nueva ventana <<< <<< <<< <<< <<<
novaresTitle.addEventListener("click", () => {
  window.open("https://www.novaresteam.com/", "_blank");
});



// Animación de los botones del menú principal
mainMenuButtons.forEach(button => {
  button.addEventListener("mouseover", () => {
    gsap.to(button, { duration: 0.3, backgroundColor: "#ffffff", color: "#000000", boxShadow: "#ffffff 0px 0px 10px 0px" });
  });
  button.addEventListener("mouseout", () => {
    gsap.to(button, { duration: 0.3, backgroundColor: "#000000", color: "#ffffff", boxShadow: "none" });
  });
});

/* >>> >>> >>> >>> >>> Animacion del los boton download <<< <<< <<< <<< <<< */
downloads.forEach(download => {
  download.addEventListener("mouseover", () => {
    gsap.to(download, { duration: 0.3, backgroundColor: "#ffffff", color: "#000000", boxShadow: "#ffffff 0px 0px 10px 0px" });
  });

  download.addEventListener("mouseout", () => {
    gsap.to(download, { duration: 0.3, backgroundColor: "#000000", color: "#ffffff", boxShadow: "none" });
  });
});


// (Inputs eliminados, no se requiere animación)


// (LoginTitle eliminado, no se requiere animación)


// (Login eliminado, no se requiere petición)


// Cerrar sesión (mantener funcionalidad si se usa en el siguiente menú)
if (endSession) {
  endSession.addEventListener("click", () => {
    localStorage.setItem("login", "false");
    window.location.reload();
  });
}

/* >>> >>> >>> >>> >>> Preloader <<< <<< <<< <<< <<< */
let preloader = document.getElementById('preloader-container');
let ocultarPreloader = () => {
  gsap.to(preloader, { duration: 0.5, opacity: 0, display: "none" });
}

window.addEventListener("load", ocultarPreloader);