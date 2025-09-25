// JS/verLista.js
// Lógica para mostrar el menú de lista general y sus acciones

window.obtenerPiezasTotales = function obtenerPiezasTotales() {
  // Las líneas válidas son las claves de piezasEjemplo
  if (!window.piezasEjemplo) return [];
  let resultado = [];
  Object.keys(piezasEjemplo).forEach(linea => {
    const key = linea.toUpperCase();
    const piezas = JSON.parse(localStorage.getItem('piezas_' + key)) || [];
    piezas.forEach(p => {
      // Extraer número de parte del nombre (lo que está entre paréntesis)
      const match = p.nombre.match(/\(([^)]+)\)/);
      resultado.push({
        nombre: p.nombre.replace(/\s*\([^)]*\)/, '').trim(),
        numeroParte: match ? match[1] : '',
        cantidad: p.cantidad,
        linea: linea
      });
    });
  });
  // Solo mostrar piezas con cantidad > 0
  return resultado.filter(p => p.cantidad > 0);
}

window.renderizarListaGeneral = function renderizarListaGeneral() {
  const listaGeneralMenu = document.getElementById('listaGeneralMenu');
  if (!listaGeneralMenu) return;
  const tbody = listaGeneralMenu.querySelector('tbody');
  if (!tbody) return;
  const piezas = obtenerPiezasTotales();
  tbody.innerHTML = '';
  if (piezas.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.textContent = 'No hay piezas en la lista.';
    td.style.textAlign = 'center';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  piezas.forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding:8px; text-align:left;">${p.nombre}</td>
      <td style="padding:8px; text-align:left;">${p.numeroParte}</td>
      <td style="padding:8px; text-align:left; font-weight:bold; color:#fff; min-width:24px;">${p.cantidad}</td>
      <td style="padding:8px; text-align:left;">${p.linea}</td>
      <td style="padding:8px; text-align:center;">
        <div class="lineMenu-piece-controls" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; margin:0;">
          <input type="number" min="1" value="1" style="width:45px; text-align:center; font-size:1rem; border-radius:8px; border:2px solid #fff; background:#000; color:#fff;">
          <button class="button-structure button-skin" data-accion="agregar" data-idx="${idx}" style="text-align:center; display:flex; align-items:center; justify-content:center;">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0;">
              <rect x="7" y="3" width="4" height="12" rx="2" fill="#fff"/>
              <rect x="3" y="7" width="12" height="4" rx="2" fill="#fff"/>
            </svg>
          </button>
          <button class="button-structure button-skin" data-accion="eliminar" data-idx="${idx}" style="text-align:center; display:flex; align-items:center; justify-content:center;">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0;">
              <rect x="3" y="7" width="12" height="4" rx="2" fill="#fff"/>
            </svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    // Eventos de control
    const controls = tr.querySelector('.lineMenu-piece-controls');
    const input = controls.querySelector('input[type="number"]');
    controls.querySelector('[data-accion="agregar"]').onclick = () => {
      let val = parseInt(input.value);
      if (!isNaN(val) && val > 0) {
        // Buscar la línea y el nombre exacto
        const linea = p.linea.toUpperCase();
        let piezasLinea = JSON.parse(localStorage.getItem('piezas_' + linea)) || [];
        let piezaIdx = piezasLinea.findIndex(px => px.nombre.replace(/\s*\([^)]*\)/, '').trim() === p.nombre && (px.nombre.match(/\(([^)]+)\)/)?.[1] === p.numeroParte));
        if (piezaIdx !== -1) {
          piezasLinea[piezaIdx].cantidad += val;
          localStorage.setItem('piezas_' + linea, JSON.stringify(piezasLinea));
          window.renderizarListaGeneral();
          if (typeof window.renderizarPiezas === 'function') window.renderizarPiezas(linea);
        }
      }
    };
    controls.querySelector('[data-accion="eliminar"]').onclick = () => {
      // Buscar la línea y el nombre exacto
      const linea = p.linea.toUpperCase();
      let piezasLinea = JSON.parse(localStorage.getItem('piezas_' + linea)) || [];
      let piezaIdx = piezasLinea.findIndex(px => px.nombre.replace(/\s*\([^)]*\)/, '').trim() === p.nombre && (px.nombre.match(/\(([^)]+)\)/)?.[1] === p.numeroParte));
      if (piezaIdx !== -1) {
        let val = parseInt(input.value);
        if (!isNaN(val) && val > 0) {
          piezasLinea[piezaIdx].cantidad = Math.max(0, piezasLinea[piezaIdx].cantidad - val);
          localStorage.setItem('piezas_' + linea, JSON.stringify(piezasLinea));
          window.renderizarListaGeneral();
          if (typeof window.renderizarPiezas === 'function') window.renderizarPiezas(linea);
        }
      }
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const verListaBtn = document.getElementById('verListaBtn');
  const listaGeneralMenu = document.getElementById('listaGeneralMenu');
  const volverListaBtn = document.getElementById('volverListaBtn');
  const exportarFotoBtn = document.getElementById('exportarFotoBtn');
  const vaciarListaBtn = document.getElementById('vaciarListaBtn');

  if (verListaBtn && listaGeneralMenu) {
    verListaBtn.onclick = () => {
      document.querySelector('.lineMenu-structure').style.display = 'none';
      listaGeneralMenu.style.display = 'flex';
      renderizarListaGeneral();
    };
  }
  if (volverListaBtn) {
    volverListaBtn.onclick = () => {
      listaGeneralMenu.style.display = 'none';
      document.querySelector('.lineMenu-structure').style.display = 'flex';
    };
  }
  if (exportarFotoBtn) {
    exportarFotoBtn.onclick = () => {
      const tabla = listaGeneralMenu.querySelector('table');
      if (!window.html2canvas || !tabla) {
        alert('No se pudo exportar la tabla.');
        return;
      }
      // Ocultar la columna 'Editar' antes de exportar
      const ths = tabla.querySelectorAll('thead th');
      const editarIdx = Array.from(ths).findIndex(th => th.textContent.trim().toUpperCase() === 'EDITAR');
      let ocultar = [];
      if (editarIdx !== -1) {
        // Oculta el th
        ths[editarIdx].style.display = 'none';
        ocultar.push(ths[editarIdx]);
        // Oculta los td de esa columna
        tabla.querySelectorAll('tbody tr').forEach(tr => {
          if (tr.children[editarIdx]) {
            tr.children[editarIdx].style.display = 'none';
            ocultar.push(tr.children[editarIdx]);
          }
        });
      }
      html2canvas(tabla, {backgroundColor: '#000'}).then(canvas => {
        // Restaurar visibilidad
        ocultar.forEach(el => el.style.display = '');
        // Crear un enlace para descargar la imagen
        const link = document.createElement('a');
        link.download = 'lista_general.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    };
  }
  if (vaciarListaBtn) {
    vaciarListaBtn.onclick = () => {
      // Vacía todas las cantidades de piezas en localStorage
      if (window.piezasEjemplo) {
        Object.keys(piezasEjemplo).forEach(linea => {
          const key = linea.toUpperCase();
          const piezas = JSON.parse(localStorage.getItem('piezas_' + key)) || [];
          piezas.forEach(p => p.cantidad = 0);
          localStorage.setItem('piezas_' + key, JSON.stringify(piezas));
        });
      }
      renderizarListaGeneral();
      // Refrescar menú de línea si está visible
      if (typeof window.renderizarPiezas === 'function') {
        Object.keys(window.piezasEjemplo).forEach(linea => {
          window.renderizarPiezas(linea.toUpperCase());
        });
      }
    };
  }
});
