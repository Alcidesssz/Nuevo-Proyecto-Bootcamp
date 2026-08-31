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

        const origenPeticion = req.headers['x-origen'];
        const tokenSeguridad = req.headers['authorization'];

        console.log("🌎 Peticion realizada desde:", origenPeticion);

        if (tokenSeguridad != 'token123') {
            return respuestaEstandar(res, 401, false, 'no tiene permisos');
        }

        const esUrgente = req.query.urgencia === 'true';

        const datosDelTurno = {
            Paciente: req.body.Paciente,
            Especialidad: req.body.Especialidad,
            FechaTurno: req.body.FechaTurno,
            Estado: req.body.Estado
        };

        if (esUrgente) {
            datosDelTurno.estado = 'atendido';
            datosDelTurno.observaciones = 'ingreso por guardia medica';
            console.log("🚨 ALERTA: registrado un turno de urgencia");
        }

        const nuevoTurno = await Turno.create(datosDelTurno);

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

const marcarAtendido = async (req, res) => {
    try {
        const { id } = req.params;

        const turnoActualizado = await Turno.findByIdAndUpdate(
            id,
            { Estado: 'Atendido'},
            { new: true }
        );

        if ( !turnoActualizado) return respuestaEstandar(res, 404, false, 'Turno No Encontrado' , id);
        return respuestaEstandar(res, 200, true, 'Turno Actualizado', turnoActualizado);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error de Servidor', error.message);
    }
};

module.exports = {
    getTurnos,
    createTurno,
    deleteTurno,
    getTurnosPorEspecialidad,
    marcarAtendido
};