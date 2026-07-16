const Turno = require('../models/Turno');

const respuestaEstandar = (res, status, success, message, data = null) => {
    res.status(status).json({
        success,
        timestamp: new Date().toISOString(),
        message,
        total: Array.isArray(data) ? data.length : data ? 1 : 0,
        data
    });
};


const getTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find();
        respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);
    } catch (error) {
        respuestaEstandar(res, 500, false, 'Error interno del servidor');
    }
};

const createTurno = async (req, res) => {
    try {
        const nuevoTurno = await Turno.create(req.body);
        return respuestaEstandar(res, 201, true, 'Turno creado exitosamente', nuevoTurno);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }
        return respuestaEstandar(res, 500, false, 'Error interno del servidor');
    }
};

const deleteTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const turnoEliminado = await Turno.findByIdAndDelete(id);
        if (!turnoEliminado) {
            return respuestaEstandar(res, 404, false, `Turno no encontrado con ID ${id}`);
        }
        respuestaEstandar(res, 200, true, 'Turno eliminado exitosamente', turnoEliminado);
    } catch (error) {
        respuestaEstandar(res, 500, false, 'Error interno del servidor');
    }
};

const getTurnosPorEspecialidad = async (req, res) => {
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