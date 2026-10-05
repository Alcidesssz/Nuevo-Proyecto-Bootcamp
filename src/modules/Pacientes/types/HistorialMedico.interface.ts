import type IConsulta from './Consulta.interface';

export default interface IHistorialMedico {
    ObraSocial: string;
    NumAfiliado?: string;   // opcional: no hace falta si ObraSocial es NINGUNA
    Consultas: IConsulta[];
}
