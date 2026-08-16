const mongoose = require('mongoose');
const Turno = require('../models/Turno');
const Paciente = require('../models/Paciente');
const respuestaEstandar = require('../utils/respuestaEstandar');

const registrarIngreso = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { datosPaciente, especialidad, fechaTurno, estado, observaciones } = req.body;

        const [nuevoPaciente] = await Paciente.create([datosPaciente], { session });

        const [nuevoTurno] = await Turno.create([{
            paciente: nuevoPaciente._id,
            especialidad,
            fechaTurno,
            estado: estado || 'pendiente',
            observaciones
        }], { session });

        await session.commitTransaction();
        await session.endSession();

        const turnoCompleto = await Turno.findById(nuevoTurno.id).populate('paciente');
        
        respuestaEstandar(res, 201, true, 'Ingreso registrado exitosamente', turnoCompleto);
}   catch (error) {
        await session.abortTransaction();
        await session.endSession();

        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }

        respuestaEstandar(res, 400, false, 'Error al registrar el ingreso', error.message);
    };
};

module.exports = {
    registrarIngreso
};