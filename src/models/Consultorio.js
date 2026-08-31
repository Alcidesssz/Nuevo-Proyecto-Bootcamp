const moongose = require('mongoose');

const consultorioSchema = new moongose.Schema({
    Medico: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Medico',
        required: [true, 'El nombre del médico es obligatorio'],
    },
    Especialidad: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Especialidad',
        required: [true, 'La especialidad es obligatoria'],
    },
    Horarios: { 
        dias: {
            type: [String],
            enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            required: [true, 'Los días de atención son obligatorios'],
        },
        horarioMañana: {
            inicio: {
                type: String,
                required: [true, 'La hora de inicio de la mañana es obligatoria'],
                match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'La hora de inicio de la mañana no es válida'],
            },
            fin: {
                type: String,
                required: [true, 'La hora de fin de la mañana es obligatoria'],
                match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'La hora de fin de la mañana no es válida'],
            },
        },
        horarioTarde: {
            inicio: {
                type: String,
                required: [true, 'La hora de inicio de la tarde es obligatoria'],
                match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'La hora de inicio de la tarde no es válida'],
            },
            fin: {
                type: String,
                required: [true, 'La hora de fin de la tarde es obligatoria'],
                match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'La hora de fin de la tarde no es válida'],
            },
        },
    },
    NumeroConsultorio: {
        type: String,
        required: [true, 'El número de consultorio es obligatorio'],
        match: [/^[0-9]{1,3}$/, 'El número de consultorio no es válido'],
    },
    Direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
    },
    Piso: {
        type: String,
        required: [true, 'El piso es obligatorio'],
        match: [/^[0-9]{1,2}$/, 'El piso no es válido'],
    },
    Telefono: {
        codArea: {
            type: String,
            required: true,
            match: [/^[0-9]{2,5}$/, 'El código de área no es válido']
        },
        numero: {
            type: String,
            required: true,
            match: [/^[0-9]{7,10}$/, 'El número de teléfono no es válido']
        },
    },
    CorreoElectronico: {
        type: String,
        required: [true, 'El correo electrónico del consultorio es obligatorio'],
        unique: [true, 'El correo electrónico del consultorio debe ser único'],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo electrónico no es válido']
    },
    activo: {
        type: Boolean,
        default: true,
        select: false
    }
},{
    timestamps: true,
});

consultorioSchema.set('toJSON', {
    transform: (documento, consultorioRetorno) => {
        consultorioRetorno.id = consultorioRetorno._id;
        delete consultorioRetorno._id;
        delete consultorioRetorno.__v;
        return consultorioRetorno;
    }
});

module.exports = moongose.model('Consultorio', consultorioSchema);
