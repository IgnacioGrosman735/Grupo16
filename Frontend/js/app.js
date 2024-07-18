document.getElementById('get-data').addEventListener('click', fetchData);
document.getElementById('create-form').addEventListener('submit', createNewTurno);

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
}

function fetchData() {
    fetch('http://127.0.0.1:5000/api/turnos',)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Verifica los datos en la consola

            // Ordenar los turnos por ID (ascendente)
            data.sort((a, b) => a.id_turno - b.id_turno);

            const table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Día</th>
                    <th>Acciones</th>
                </tr>
            `;
            data.forEach(turno => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${turno.id_turno}</td>
                    <td>${turno.nombre}</td>
                    <td>${turno.apellido}</td>
                    <td>${turno.telefono}</td>
                    <td>${turno.email}</td>
                    <td>${formatDate(turno.dia)}</td>
                    <td>
                        <button class="delete-btn" data-id="${turno.id_turno}">Borrar</button>
                        <button class="editar-btn" data-id="${turno.id_turno}">Editar</button>
                    </td>
                `;
                table.appendChild(row);
            });

            const output = document.getElementById('data-output');
            output.innerHTML = '';
            output.appendChild(table);

            // Agregar event listener a todos los botones de borrar
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const idTurno = this.getAttribute('data-id');
                    deleteTurno(idTurno);
                });
            });

            // Agregar event listener a todos los botones de editar
            document.querySelectorAll('.editar-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const idTurno = this.getAttribute('data-id');
                    updateTurno(idTurno);
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            document.getElementById('data-output').innerHTML = 'Error al obtener los datos';
        });
}

function createNewTurno(event) {
    event.preventDefault();
    
    const id_turno = document.getElementById('id_turno').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const dia = document.getElementById('dia').value;

    const turnoData = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email,
        dia: dia
    };

    if (id_turno) {
        // Si hay un id_turno, actualizamos el turno existente
        saveTurno(id_turno, turnoData);
    } else {
        // Si no hay id_turno, creamos un nuevo turno
        createTurno(turnoData);
    }
}

function createTurno(turnoData) {
    fetch('http://127.0.0.1:5000/api/turnos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turnoData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el turno');
        }
        return response.json();
    })
    .then(data => {
        console.log('Turno creado:', data);
        fetchData();  // Actualizar la tabla después de crear el turno
    })
    .catch(error => {
        console.error('Error al crear el turno:', error);
    });
}

function deleteTurno(idTurno) {
    fetch(`http://127.0.0.1:5000/api/turnos/${idTurno}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el turno');
        }
        return response.json();
    })
    .then(data => {
        console.log('Turno eliminado:', data);
        fetchData();  // Recargar los datos después de eliminar el turno
    })
    .catch(error => {
        console.error('Error al eliminar el turno:', error);
    });
}

function updateTurno(idTurno) {
    fetch(`http://127.0.0.1:5000/api/turnos/${idTurno}`,)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        return response.json();
    })
    .then(data => {
        // Asignar los datos del turno a los campos del formulario
        document.getElementById('id_turno').value = data.id_turno;
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('apellido').value = data.apellido;
        document.getElementById('telefono').value = data.telefono;
        document.getElementById('email').value = data.email;
        document.getElementById('dia').value = data.dia;
    })
    .catch(error => {
        console.error('Hubo un problema con la operación de fetch:', error);
    });
}

function saveTurno(idTurno, turnoData) {
    fetch(`http://127.0.0.1:5000/api/turnos/${idTurno}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turnoData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el turno');
        }
        return response.json();
    })
    .then(data => {
        console.log('Turno creado:', data);
        fetchData();  // Actualizar la tabla después de crear el turno
    })
    .catch(error => {
        console.error('Error al crear el turno:', error);
    });
}