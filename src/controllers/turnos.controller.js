const Turno = require('../models/Turno');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find({activo: true}).populate('Paciente');

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

        const turnoBorrado = await Turno.findByIdAndUpdate(
            id, 
            { activo: false },
            {estado: 'Cancelado'},
            { new: true }
        );

        if (!turnoBorrado) {
            return respuestaEstandar(res, 404, false, `Turno no encontrado con ID ${id}`);
        }
        respuestaEstandar(res, 200, true, 'Turno eliminado exitosamente', turnoBorrado);
    } catch (error) {
        respuestaEstandar(res, 500, false, 'Error interno del servidor');
    }
};

const getTurnosPorEspecialidad = async (req, res) => {
    const { especialidad } = req.params;
    try {
        const turnosFiltrados = await Turno.find({ Especialidad: especialidad, activo: true });
        if (turnosFiltrados.length === 0) {
            return respuestaEstandar(res, 404, false, `No se encontraron turnos para la especialidad: ${especialidad}`);
        }
        respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnosFiltrados);
    } catch (error) {
        respuestaEstandar(res, 500, false, 'Error interno del servidor');
    }
};

module.exports = {
    getTurnos,
    createTurno,
    deleteTurno,
    getTurnosPorEspecialidad
};