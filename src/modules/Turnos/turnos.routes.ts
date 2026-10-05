import express from 'express';

import { getTurnos, createTurno, deleteTurno, marcarAtendido } from './turnos.controller';
const { validarSchema } = require('../../middlewares/validarDatos.middleware');
const { CrearTurnoSchema } = require('./dtos/turno.schema');

const router = express.Router();

router.get('/', getTurnos);
router.post('/', validarSchema(CrearTurnoSchema), createTurno);
router.delete('/:id', deleteTurno);
router.patch('/:id', marcarAtendido);

export default router;