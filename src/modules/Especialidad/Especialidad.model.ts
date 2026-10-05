import { Schema, model } from 'mongoose';
const { normalizarNombreEspecialidad } = require('./especialidadUtils');

const especialidadSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'La especialidad del médico es obligatorio'],
        // set normaliza al guardar: trim + sin acentos + MAYÚSCULAS,
        // para que el índice `unique` sea REAL (sin duplicados disfrazados).
        // Reemplaza al `uppercase` de antes (que no quitaba acentos).
        set: (valor: string) => normalizarNombreEspecialidad(valor),
        unique: [true, 'Esta especialidad ya está registrada'], // duplicado -> error 11000 -> 409
    },
    descripcion: {
        type: String,
        default: '',   // si no se manda, queda string vacío
    },
}, {
    timestamps: true,
});

// Misma normalización _id -> id que en todos los modelos.
especialidadSchema.set('toJSON', {
    transform: (documento: any, especialidadRetorno: any) => {
        especialidadRetorno.id = especialidadRetorno._id;
        delete especialidadRetorno._id;
        delete especialidadRetorno.__v;
        return especialidadRetorno;
    }
});

module.exports = model('Especialidad', especialidadSchema);