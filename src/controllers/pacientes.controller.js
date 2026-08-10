const Paciente = require('../models/Paciente');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getPacientes = async (req, res) => {
    try {

        // ?ObraSocial=OSDE&DNI=12345678
        const {ObraSocial, DNI} = req.query;

        const filtro = {};

        if (ObraSocial) {
            filtro['ObraSocial.nombre'] = ObraSocial.toUpperCase();
        }

        if (DNI) {
            filtro.DNI = DNI;
        }

        console.log("🟢 Filtro Armado:", filtro);

        const pacientes = await Paciente.find(filtro);
        respuestaEstandar(res, 200, true, 'Pacientes encontrados', pacientes);
    } catch (error) {
        respuestaEstandar(res, 500, false, 'Error al obtener los pacientes', null);
    }
};

const createPaciente = async (req, res) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);
        respuestaEstandar(res, 201, true, 'Paciente creado', nuevoPaciente);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }
        respuestaEstandar(res, 500, false, 'Error al crear el paciente', null);
    }
};

const deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return respuestaEstandar(res, 404, false, 'Paciente no encontrado', null);
        }
        const pacienteEliminado = await Paciente.findByIdAndDelete(id);
        respuestaEstandar(res, 200, true, 'Paciente eliminado', pacienteEliminado);
    } catch (error) {
        respuestaEstandar(res, 500, false, 'Error al eliminar el paciente', null);
    }
};

module.exports = {
    getPacientes,
    createPaciente,
    deletePaciente
};