function completarTexto() {
    console.log("Función completarTexto() ejecutada");

    //Obtenemos los datos de los input y los asignamos a las variables
    let nombre = document.getElementById('firstname').value;
    let apellido = document.getElementById('lastname').value;
    let dia = document.getElementById('day').value;
    let sucursalSelect = document.getElementById('branch');
    let sucursalSeleccionada = sucursalSelect.options[sucursalSelect.selectedIndex].text;
    let hora = document.getElementById('hour').value;

    // Llamas a la función de validación
    if (validarDatos(nombre, apellido, dia, hora, sucursalSeleccionada)) {
        // Construyes el mensaje
        let mensaje = `Hola ${nombre} ${apellido}! Has reservado un turno el día ${dia} a las ${hora}hs! en la sucursal ${sucursalSeleccionada}. Te esperamos!!!`;
        
        // Asignas el mensaje al párrafo
        document.getElementById('mensaje').innerText = mensaje;
    }
}

function validarDatos(nombre, apellido, dia, hora, sucursal) {

    // Verificar si los campos están vacíos
    if (nombre === '' || apellido === '' || dia === '' || sucursal === '' || hora === '') {
        // Mostrar mensaje de error
        alert('Por favor completa todos los campos del formulario.');
        return false; // Los datos no son válidos
    }

    // Si todos los campos están completos, retornar true
    return true;
}


