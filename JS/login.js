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
  return JSON.parse(localStorage.getItem('piezas_' + linea)) || [];
}
function setPiezasLinea(linea, piezas) {
  localStorage.setItem('piezas_' + linea, JSON.stringify(piezas));
}

// Mostrar menú principal

function mostrarMenuPrincipal() {
  // El video de fondo siempre debe mostrarse
  // background.style.display = "";
  login.style.display = "";
  lineMenu.style.display = "none";
}

// Mostrar submenú de línea

function mostrarMenuLinea(linea) {
  // El video de fondo siempre debe mostrarse
  // background.style.display = "none";
  login.style.display = "none";
  lineMenu.style.display = "flex";
  lineaSeleccionadaTitulo.textContent = linea;
  renderizarPiezas(linea);
}

// Renderizar lista de piezas y contador
function renderizarPiezas(linea) {
  let piezas = getPiezasLinea(linea);
  let total = piezas.reduce((acc, p) => acc + p.cantidad, 0);
  contadorPiezas.textContent = total;
  listaPiezas.innerHTML = "";
  piezas.forEach((pieza, idx) => {
    let li = document.createElement('li');
    li.innerHTML = `
      <span>${pieza.nombre}</span>
      <div class="lineMenu-piece-controls">
        <input type="number" min="1" value="1" style="width:45px; text-align:center; font-size:1rem;">
        <button data-accion="agregar" data-idx="${idx}">AÑADIR</button>
        <button data-accion="eliminar" data-idx="${idx}">ELIMINAR</button>
      </div>
    `;
    listaPiezas.appendChild(li);
    // Eventos de control
    let controls = li.querySelector('.lineMenu-piece-controls');
    controls.querySelector('[data-accion="agregar"]').onclick = () => {
      let input = controls.querySelector('input[type="number"]');
      let val = parseInt(input.value);
      if (!isNaN(val) && val > 0) {
        piezas[idx].cantidad += val;
        setPiezasLinea(linea, piezas);
        renderizarPiezas(linea);
      }
    };
    controls.querySelector('[data-accion="eliminar"]').onclick = () => {
      piezas.splice(idx, 1);
      setPiezasLinea(linea, piezas);
      renderizarPiezas(linea);
    };
  });
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
    alert('Funcionalidad de "Ver lista" aún no implementada.');
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