function completarTexto() {
    console.log("Función completarTexto() ejecutada");

    //Obtenemos los datos de los input y los asignamos a las variables
    let nombre = document.getElementById('firstname').value;
    let apellido = document.getElementById('lastname').value;
    let dia = document.getElementById('day').value;
    let sucursalSelect = document.getElementById('branch');
    let sucursalSeleccionada = sucursalSelect.options[sucursalSelect.selectedIndex].text;
    let hora = document.getElementById('hour').value;

    // Construir el mensaje
    let mensaje = `Hola ${nombre} ${apellido}! Has reservado un turno el día ${dia} a las ${hora}hs! en la sucursal ${sucursalSeleccionada}. Te esperamos!!!`;
    
    // Asignar el mensaje al párrafo
    document.getElementById('mensaje').innerText = mensaje;
}
