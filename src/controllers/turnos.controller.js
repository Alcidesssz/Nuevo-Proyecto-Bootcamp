

let turnos = [
    {id: 1, Paciente: 'Juan Perez', DNI: '12345678', Especialidad: 'Cardiología'},
    {id: 2, Paciente: 'Maria Lopez', DNI: '87654321', Especialidad: 'Dermatología'},
    {id: 3, Paciente: 'Pedro García', DNI: '11223344', Especialidad: 'Neurología'},
    {id: 4, Paciente: 'Ana Torres', DNI: '55667788', Especialidad: 'Pediatría'},
];

const respuestaEstandar = (res, status, success, message, data = null) => {
    res.status(status).json({
        success,
        timestamp: new Date().toISOString(),
        message,
        total: Array.isArray(data) ? data.length : data ? 1 : 0,
        data
    });
};


const getTurnos = (req, res) => {
    respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);
};

const createTurno = (req, res) => {
    const { Paciente, DNI, Especialidad } = req.body;

    if (!Paciente || !DNI || !Especialidad) {
        return respuestaEstandar(res, 400, false, 'Faltan datos requeridos');
    }

    const nuevoTurno = {
        id: turnos.length + 1,
        Paciente,
        DNI,
        Especialidad
    };

    turnos.push(nuevoTurno);
    respuestaEstandar(res, 201, true, 'Turno creado exitosamente', nuevoTurno);
};

const deleteTurno = (req, res) => {
    const { id } = req.params;
    const turnoExiste = turnos.some(t => t.id === parseInt(id));

    if (!turnoExiste) {
        return respuestaEstandar(res, 404, false, 'Turno no encontrado');
    }
    
    turnos = turnos.filter(t => t.id !== parseInt(id));
    respuestaEstandar(res, 200, true, 'Turno eliminado exitosamente', turnos);
};
    
const getTurnosPorEspecialidad = (req, res) => {
    const { especialidad } = req.params;
    const turnosFiltrados = turnos.filter(t => t.Especialidad.toLowerCase() === especialidad.toLowerCase());

    if (turnosFiltrados.length === 0) { 
        return respuestaEstandar(res, 404, false, `No se encontraron turnos para la especialidad: ${especialidad}`); }

    respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnosFiltrados);
};

module.exports = {
    getTurnos,
    createTurno,
    deleteTurno,
    getTurnosPorEspecialidad
};