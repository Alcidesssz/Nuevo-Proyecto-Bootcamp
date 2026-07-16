const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
    Paciente: {
        type: String,
        required: [true, 'El nombre del paciente es obligatorio'],
        uppercase: true,
    },
    DNI: {
        type: String,
        required: [true, 'El DNI del paciente es obligatorio'],
        match: [/^[0-9]{7,8}$/, 'El DNI debe tener 7 u 8 dígitos'],
    },
    Especialidad: {
        type: String,
        required: true,
        enum: {
            values: ['Odontología', 'Cardiología', 'Pediatría', 'Dermatología', 'Neurología'],
            message: '{VALUE} no es una especialidad válida'
        }
    },
    FechaTurno: {
        type: Date,
        required: [true, 'La fecha del turno es obligatoria'],
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'La fecha del turno debe ser futura'
        }
    },
    Estado: {
        type: String,
        enum: {
            values: ['Pendiente', 'Atendido', 'Cancelado'],
            message: '{VALUE} no es un estado válido'
        },
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Turno', turnoSchema);