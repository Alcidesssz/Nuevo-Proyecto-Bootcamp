import type IHabitos from './Habitos.interface';

interface IAntecedentes {
    alergias?: string[];
    enfermedadesCronicas?: string[];
    medicamentosHabituales?: string[];
    cirugiasPrevias?: string[];
    internacionesPrevias?: string[];
    antecedentesFamiliares?: string[];
    vacunas?: string[];
    habitos?: IHabitos;
    otros?: string;
}

export default IAntecedentes;