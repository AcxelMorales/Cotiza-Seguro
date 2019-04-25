'use strict';

// constructores para seguro
function Seguro(marca, anio, tipo) {

    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(seguro) {

    /**
     * 1 - americano = $1.15
     * 2 - asiatico = $1.05
     * 3 - europeo = $1.35
    */

     let cantidad;
     const base = 2000;

     // calculamos la cantidad dependiendo la marca
     switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
        break;
        case '2':
            cantidad = base * 1.05;
        break;
        case '3':
            cantidad = base * 1.35;
        break;
    }

    console.log(cantidad);

    // leer el año
    const diferencia = new Date().getFullYear() - this.anio;

    // calculamos la cantidad dependiendo el año cada año menos se le resta 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    // calculamos la cantidad dependiendo el tipo de seguro
    /**
     * 1 - basico = * 30%
     * 2 - completo = * 50%
    */
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    
    return cantidad;
}

// Todo lo que se muestras
function Interfaz() { }

// mensaje en el HTML
Interfaz.prototype.mostrarError = function(mensaje, tipo) {

    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }

    div.innerHTML = mensaje;
    form.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 3000);
}

// Resultado de la cotización
Interfaz.prototype.mostrarResultado = function(seguro, cantidad) {

    const resultado = document.getElementById('resultado');
    let marca;

    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
        break;
        case '2':
            marca = 'Asiatico';
        break;
        case '3':
            marca = 'Europeo';
        break;
    }

    // creamos un div
    const div = document.createElement('div');
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo de seguro: ${seguro.tipo}</p>
        <p><strong>Total: $${cantidad}</strong></p>
    `;

    // spinner
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';

    setTimeout(function() {

        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);
}

// eventlistener
const form = document.getElementById('cotizar-seguro');

form.addEventListener('submit', e => {

    e.preventDefault();
    
    // leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    console.log(marcaSeleccionada);

    // leer el año seleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    console.log(anioSeleccionado);

    // leer el valor de los radio button
    const radioBtn = document.querySelector('input[name="tipo"]:checked').value;
    console.log(radioBtn);

    // crear instancia de interfaz
    const interfaz = new Interfaz();

    if (marcaSeleccionada === '' || anioSeleccionado === '' || radioBtn === '') {
        // mandamos un error
        interfaz.mostrarError('Faltan datos.<br>LLena el formulario adecuadamente', 'error');
    } else {
        // ocultamos el div con los resultados
        const resultados = document.querySelector('#resultado div');

        if (resultados != null) {
            resultados.remove();
        }

        // Instamciamos y mostramos interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, radioBtn);
        
        // cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        // mostramos el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarError('Cotizando', 'correcto');
    }
});

// años de los automoviles los ultimos 20 años apartir de la fecha actual
// y rellenamos las opciones
const max = new Date().getFullYear(),
      min = max - 20;

const selectAnios = document.getElementById('anio');

for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}

