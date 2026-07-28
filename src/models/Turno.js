const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
    Paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El nombre del paciente es obligatorio'],
    },
    Especialidad: {
    type: String,
    required: true,
    enum: {
        values: ['ODONTOLOGIA','CARDIOLOGIA','PEDIATRIA','DERMATOLOGIA','NEUROLOGIA'],
        message: '{VALUE} no es una especialidad válida'
    },
    uppercase: true,
    set: function(value) {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
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
    activo: {
        type: Boolean,
        default: true,
        select: false
    }
}, {
    timestamps: true,
});

turnoSchema.set('toJSON', {
    transform: (documento, turnoRetorno) => {
        turnoRetorno.id = turnoRetorno._id;
        delete turnoRetorno._id;
        delete turnoRetorno.__v;
    }
});

module.exports = mongoose.model('Turno', turnoSchema);