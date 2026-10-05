import { Schema, model } from 'mongoose';

const HistoriaClinicaSchema = new Schema({
    Paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El ID del paciente es obligatorio'],
    },
    Medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
       
    },
    Fecha: {
        type: Date,
        required: [true, 'La fecha del historia clinica es obligatoria'],
    },
    Antecedentes: {
        alergias: { type: [String], default: [] },
        enfermedadesCronicas: { type: [String], default: [] },
        medicamentosHabituales: { type: [String], default: [] },
        cirugiasPrevias: { type: [String], default: [] },
        internacionesPrevias: { type: [String], default: [] },
        antecedentesFamiliares: { type: [String], default: [] },
        vacunas: { type: [String], default: [] },
        habitos: {
            tabaquismo: { type: Boolean, default: false },
            alcohol: { type: Boolean, default: false },
            actividadFisica: {
                type: String,
                enum: ['Ninguna', 'Baja', 'Moderada', 'Alta'],
                default: 'Ninguna'
            }
        },
        otros: {
           type: String,
           maxlength: 500
        } 
    },
    MotivoConsulta: {
         type: String,
         required: [true, 'El motivo de la consulta es obligatorio']
    },
    Sintomas: {
         type: [String],
         default: []
    },
    Diagnostico: {
        type: String,
        required: [true, 'El diagnóstico es obligatorio'],
    },
    Tratamiento: {
        type: String,
        required: [true, 'El tratamiento es obligatorio'],
    },
    Observaciones: {
        type: String,
        maxlength: [500, 'Las observaciones no pueden superar los 500 caracteres'],
    },
    activo: {
        type: Boolean,
        default: true,
        select: false
    },
 
}, {
    timestamps: true,
});

   HistoriaClinicaSchema.set('toJSON', {
    transform: (documento: any, historiaClinicaRetorno: any) => {
        historiaClinicaRetorno.id = historiaClinicaRetorno._id;
        delete historiaClinicaRetorno._id;
        delete historiaClinicaRetorno .__v;
        return historiaClinicaRetorno;
    }
});

module.exports = model('HistoriaClinica', HistoriaClinicaSchema);