import {Schema, model, Document} from 'mongoose';
import {ITurno} from '../interface/Turnos/Turno.interface';
import {Especialidad} from '../interface/Turnos/TurnoEspecialidad.enum';
import {EstadoTurno} from '../interface/Turnos/TurnoEstado.enum';

const turnoSchema = new Schema<ITurno>({
    Paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El nombre del paciente es obligatorio'],
    },
    Especialidad: {
    type: String,
    required: true,
    enum: {
        values: Object.values(Especialidad),
        message: '{VALUE} no es una especialidad válida'
    },
    uppercase: true,
    set: function(value: string): string {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
} as any,
    FechaTurno: {
        type: Date,
        required: [true, 'La fecha del turno es obligatoria'],
        validate: {
            validator: function(value: Date) {
                return value > new Date();
            },
            message: 'La fecha del turno debe ser futura'
        }
    },
    Estado: {
        type: String,
        enum: {
            values: Object.values(EstadoTurno),
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
    transform: (documento: Document, turnoRetorno: Record<string, any>) => {
        turnoRetorno.id = turnoRetorno._id;
        delete turnoRetorno._id;
        delete turnoRetorno.__v;
    }
});

const TurnoModel = model<ITurno>('Turno', turnoSchema);

export default TurnoModel;