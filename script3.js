let menu = document.querySelector('.menu');
let flag = false;
let contador = 0;

function iniciar() {
    let imagenes = document.querySelectorAll('#cajaimagenes img');
    let soltar = document.getElementById('cajasoltar');
    let soltar2 = document.getElementById('cajasoltar2');
    let soltar3 = document.getElementById('cajasoltar3');

    // Agregar eventos de arrastre a las imágenes
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener('dragstart', arrastrado, false);
    }

    // Configurar eventos para las cajas de soltar
    [soltar, soltar2, soltar3].forEach(caja => {
        caja.addEventListener('dragenter', function (e) {
            e.preventDefault();
        }, false);

        caja.addEventListener('dragover', function (e) {
            e.preventDefault();
        }, false);

        caja.addEventListener('drop', soltado, false);
    });
}

function arrastrado(e) {
    elemento = e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
}

function soltado(e) {
    e.preventDefault();

    let id = e.dataTransfer.getData('Text');
    let nuevaImagen = document.getElementById(id);
    let cajaDestino = e.target;

    if (!nuevaImagen) return;

    // Si el destino es una imagen, obtener su contenedor (caja de soltar)
    if (cajaDestino.tagName === "IMG") {
        cajaDestino = cajaDestino.parentElement;
    }

    // Verificar si la caja de destino ya tiene una imagen
    let imagenAnterior = cajaDestino.querySelector("img");

    if (imagenAnterior) {
        // Si hay una imagen en la caja de destino, intercambiar las imágenes
        let cajaOrigen = nuevaImagen.parentElement;
        cajaOrigen.appendChild(imagenAnterior);
        imagenAnterior.style.display = "block";
        imagenAnterior.draggable = true;
        imagenAnterior.addEventListener('dragstart', arrastrado, false);
    }

    // Mover la nueva imagen a la caja de destino
    cajaDestino.innerHTML = ''; // Limpiar la caja de destino
    cajaDestino.appendChild(nuevaImagen);
    nuevaImagen.style.display = "block";
    nuevaImagen.draggable = true;
    nuevaImagen.addEventListener('dragstart', arrastrado, false);
}

function reinicio() {
    window.location.reload();
}

iniciar();