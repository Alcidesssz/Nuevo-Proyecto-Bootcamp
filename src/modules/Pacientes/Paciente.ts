import type { IPaciente } from './types/Paciente.interface';
import mongoose from 'mongoose';
import {Schema, model, Document} from 'mongoose';
import { PacienteSexo } from './types/PacienteSexo.enum';
import { ObraSocial } from './types/PacienteObraSocial.enum';
import { TipoTelefono } from './types/PacienteTelefono.enum';

const pacienteSchema = new mongoose.Schema<IPaciente>({
    Nombre: {
        type: String,
        required: [true, 'El nombre del paciente es obligatorio'],
        uppercase: true,
    },
    DNI: {
        type: String,
        required: [true, 'El DNI del paciente es obligatorio'],
        match: [/^[0-9]{7,8}$/, 'El DNI debe tener 7 u 8 dígitos'],
    },
    FechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento del paciente es obligatoria'],
        validate: {
            validator: function(value) {
                return value < new Date();
            },
            message: 'La fecha de nacimiento del paciente debe ser una fecha pasada'
        }
    },
    Sexo: {
        type: String,
        enum: {
            values: Object.values(PacienteSexo),
            message: '{VALUE} no es un sexo válido'
        }
    },
    Direccion: {
        Calle: {
            type: String,
            required: [true, 'La calle de la dirección del paciente es obligatoria'],
            uppercase: true,
        },
        Numero: {
            type: String,
            required: [true, 'El número de la dirección del paciente es obligatorio']
        },
        Ciudad: {
            type: String,
            required: [true, 'La ciudad de la dirección del paciente es obligatoria']
        },
        Provincia: {
            type: String,
            required: [true, 'La provincia de la dirección del paciente es obligatoria']
        },
    },
    Telefono: {
        tipo: {
            type: String,
            enum: {
                values: Object.values(TipoTelefono),
            }
        },
        codArea: {
            type: String,
            required: [true, 'El código de área del teléfono es obligatorio'],
            match: [/^\d{1,4}$/, 'El código de área debe tener entre 1 y 4 dígitos']
        },
        numero: {
            type: String,
            required: [true, 'El número de teléfono es obligatorio'],
            match: [/^\d{6,10}$/, 'El número de teléfono debe tener entre 6 y 10 dígitos']
        }
    },
    CorreoElectronico: {
        type: String,
        required: [true, 'El correo electrónico del paciente es obligatorio'],
        unique: [true, 'El correo electrónico del paciente debe ser único'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El correo electrónico debe tener un formato válido']
    },
    ObraSocial: {
        Nombre: {
            type: String,
            required: true,
            uppercase: true,
            enum: {
                values: Object.values(ObraSocial),
                message: '{VALUE} no es una obra social válida'
            },
        },
        NumeroAfiliado: {
            type: String,
        },
    },
}, {
    timestamps: true
});

pacienteSchema.set('toJSON', {
    transform: (documento: Document, pacienteRetorno: Record<string, any>) => {
        pacienteRetorno.id = pacienteRetorno._id;
        delete pacienteRetorno._id;
        delete pacienteRetorno.__v;
    }
});

const PacienteModel = mongoose.model<IPaciente>('Paciente', pacienteSchema);

export default PacienteModel;