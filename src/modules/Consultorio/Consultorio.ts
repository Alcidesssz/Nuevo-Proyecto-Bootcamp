import { Schema, model } from 'mongoose';

const consultorioSchema = new Schema({
    Medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: [true, 'El nombre del médico es obligatorio'],
    },
    Especialidad: {
        type: Schema.Types.ObjectId,
        ref: 'Especialidad',
        required: [true, 'La especialidad es obligatoria'],
    },
    NumeroConsultorio: {
        type: String,
        required: [true, 'El número de consultorio es obligatorio'],
        match: [/^[0-9]{1,3}$/, 'El número de consultorio no es válido'],
    },
    Piso: {
        type: String,
        required: [true, 'El piso es obligatorio'],
        match: [/^[0-9]{1,2}$/, 'El piso no es válido'],
    },
    Direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
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
        unique: [true, 'El correo electrónico del consultorio debe ser único'], // duplicado -> 409
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo electrónico no es válido']
    }
}, {
    timestamps: true,
});

consultorioSchema.set('toJSON', {
    transform: (documento: any, consultorioRetorno: any) => {
        consultorioRetorno.id = consultorioRetorno._id;
        delete consultorioRetorno._id;
        delete consultorioRetorno.__v;
        return consultorioRetorno;
    }
});

export default model('Consultorio', consultorioSchema);