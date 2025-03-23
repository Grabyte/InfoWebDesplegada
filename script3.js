let elementoArrastrado = null;
let primeraImagenSeleccionada = null;
let timeoutResize = null; // Para manejar el retraso en el evento resize

function iniciar() {
    const imagenes = document.querySelectorAll('#cajaimagenes img, .caja img');
    const cajas = document.querySelectorAll('.caja');

    // Detectar si es un dispositivo móvil
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Si es móvil, mover las imágenes a las cajas de destino y ocultar el texto
    if (esMovil) {
        const cajasSoltar = document.querySelectorAll('.caja');
        const imagenes = document.querySelectorAll('#cajaimagenes img');

        imagenes.forEach((img, index) => {
            if (cajasSoltar[index]) {
                cajasSoltar[index].appendChild(img);
            }
        });

        // Ocultar el texto en las cajas de destino
        cajasSoltar.forEach(caja => {
            const texto = caja.querySelector('p');
            if (texto) {
                texto.style.display = 'none';
            }
        });
    }

    // Eventos para PC (drag and drop)
    imagenes.forEach(img => {
        img.addEventListener('dragstart', arrastrado);
    });

    cajas.forEach(caja => {
        caja.addEventListener('dragover', e => e.preventDefault());
        caja.addEventListener('drop', soltado);
    });

    // Eventos para móviles (touch)
    imagenes.forEach(img => {
        img.addEventListener('touchstart', tocarInicio, { passive: false });
    });

    cajas.forEach(caja => {
        caja.addEventListener('touchend', tocarSoltar, { passive: false });
    });

    // Evento adicional para intercambio táctil
    imagenes.forEach(img => {
        img.addEventListener('touchend', intercambioTactil, { passive: false });
    });

    // Detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', manejarResize);
}

// Manejar cambios en el tamaño de la pantalla
function manejarResize() {
    // Limpiar el timeout anterior (si existe)
    if (timeoutResize) {
        clearTimeout(timeoutResize);
    }

    // Establecer un nuevo timeout para reiniciar después de 200ms de inactividad
    timeoutResize = setTimeout(() => {
        reinicio(); // Reiniciar la página cuando cambia el tamaño de la pantalla
    }, 200);
}

// Funcionalidad de arrastrar y soltar (PC)
function arrastrado(e) {
    elementoArrastrado = e.target;
    e.dataTransfer.setData('text', e.target.id);
}

function soltado(e) {
    e.preventDefault();
    if (!elementoArrastrado) return;

    const cajaDestino = e.target.closest('.caja');
    if (!cajaDestino) return;

    if (cajaDestino === elementoArrastrado.parentElement) {
        elementoArrastrado = null;
        return;
    }

    const imagenExistente = cajaDestino.querySelector('img');
    if (imagenExistente) {
        elementoArrastrado.parentElement.appendChild(imagenExistente);
    }

    cajaDestino.innerHTML = '';
    cajaDestino.appendChild(elementoArrastrado);
    elementoArrastrado = null;
}

// Funcionalidad de tocar y soltar (móviles)
function tocarInicio(e) {
    elementoArrastrado = e.target;
    e.preventDefault();
}

function tocarSoltar(e) {
    e.preventDefault();
    if (!elementoArrastrado) return;

    const cajaDestino = e.target.closest('.caja');
    if (!cajaDestino) return;

    if (cajaDestino === elementoArrastrado.parentElement) {
        elementoArrastrado = null;
        return;
    }

    const imagenExistente = cajaDestino.querySelector('img');
    if (imagenExistente) {
        elementoArrastrado.parentElement.appendChild(imagenExistente);
    }

    cajaDestino.innerHTML = '';
    cajaDestino.appendChild(elementoArrastrado);
    elementoArrastrado = null;
}

// Funcionalidad de intercambio táctil (móviles)
function intercambioTactil(e) {
    e.preventDefault();

    if (!primeraImagenSeleccionada) {
        primeraImagenSeleccionada = e.target;
        primeraImagenSeleccionada.style.border = "2px solid red";
    } else {
        const segundaImagenSeleccionada = e.target;

        if (primeraImagenSeleccionada !== segundaImagenSeleccionada) {
            intercambiarImagenes(primeraImagenSeleccionada, segundaImagenSeleccionada);
        }

        // Restablecer la selección en todos los casos
        primeraImagenSeleccionada.style.border = "";
        primeraImagenSeleccionada = null;
    }
}

function intercambiarImagenes(imagen1, imagen2) {
    const contenedor1 = imagen1.parentElement;
    const contenedor2 = imagen2.parentElement;

    // Intercambiar las imágenes
    contenedor1.appendChild(imagen2);
    contenedor2.appendChild(imagen1);
}

function reinicio() {
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', iniciar);