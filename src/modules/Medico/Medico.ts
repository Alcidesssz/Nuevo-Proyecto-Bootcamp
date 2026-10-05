import {Schema, model} from 'mongoose';

const medicoSchema = new Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre del médico es obligatorio'],
        uppercase: true,
    },
    Matricula: {
        type: String,
        required: [true, 'La matrícula es obligatoria'],
        unique: [true, 'Esta matrícula ya está registrada'],
    },
    Especialidad: {
        type: Schema.Types.ObjectId,
        ref: 'Especialidad',
    },
    Telefono: {
        tipo: {
            type: String,
            enum: ['CELULAR', 'FIJO']
        },
        codArea: {
            type: String,
            required: true,
            match: [/^[0-9]{2,5}$/, 'El código de área no es válido']
        },
        numero: {
            type: String,
            required: true,
            match: [/^[0-9]{6,10}$/, 'El número de teléfono no es válido']
        }
    },
    CorreoElectronico: {
        type: String,
        required: [true, 'El correo electronico es obligatorio'],
        unique: [true, 'Este correo electronico ya está registrado'],
        match: [/\S+@\S+\.\S+/, 'El correo electronico debe tener un formato válido'],
    },
    activo: {
        type: Boolean,
        default: true,
        select: false
    },
}, {
    timestamps: true,
});

medicoSchema.set('toJSON', {
    transform: (documento: any, medicoRetorno: any) => {
        medicoRetorno.id = medicoRetorno._id;
        delete medicoRetorno._id;
        delete medicoRetorno.__v;
        return medicoRetorno;
    }
});

module.exports = model('Medico', medicoSchema);