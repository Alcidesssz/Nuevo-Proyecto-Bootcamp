import express from 'express';
const router = express.Router();
import { getPacientes, createPaciente, deletePaciente } from './pacientes.controller';

router.get('/', getPacientes);
router.post('/', createPaciente);
router.delete('/:id', deletePaciente);

export default router;