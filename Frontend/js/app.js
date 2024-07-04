document.getElementById('get-data').addEventListener('click', fetchData);
document.getElementById('create-form').addEventListener('submit', createNewTurno);

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
}

function fetchData() {
    fetch('http://127.0.0.1:5000/api/turnos/')
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
                `;
                table.appendChild(row);
            });

            const output = document.getElementById('data-output');
            output.innerHTML = '';
            output.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            document.getElementById('data-output').innerHTML = 'Error al obtener los datos';
        });
}

function createNewTurno(event) {
    event.preventDefault();
    
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

    createTurno(turnoData);
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