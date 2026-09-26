import mongoose from 'mongoose';
import { CategoriaEspecialidad } from './types/EspecialidadCategoria.enum';
import { IEspecialidad } from './types/Especialidad.interface';

const especialidadSchema = new mongoose.Schema<IEspecialidad>({
  Nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
    trim: true
  },
  Descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  Categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: {
      values: Object.values(CategoriaEspecialidad)
    }
  },
  activo: {
    type: Boolean,
    default: true,
    select: false
  }
}, { timestamps: true });

const EspecialidadModel = mongoose.model<IEspecialidad>('Especialidad', especialidadSchema);

export default EspecialidadModel