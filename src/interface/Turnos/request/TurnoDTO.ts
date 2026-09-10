export interface ICrearTurnoDTO {
    Paciente: string;
    Especialidad: string;
    FechaTurno: string | Date;
}

export interface IQueryUrgencia {
    urgencia?: string;
}