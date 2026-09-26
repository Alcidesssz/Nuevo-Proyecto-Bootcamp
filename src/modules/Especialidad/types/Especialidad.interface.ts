import { Document} from 'mongoose';
import { CategoriaEspecialidad } from './EspecialidadCategoria.enum';

export interface IEspecialidad extends Document {
    Nombre: string,
    Descripcion: string,
    Categoria: CategoriaEspecialidad,
    activo: boolean,
}