import express from 'express';
const router = express.Router();
import { getConsultorios, createConsultorio, updateConsultorio, deleteConsultorio } from '../Consultorio/consultorio.controller';

const { validarSchema } = require('../../middlewares/validarDatos.middleware');
const { crearConsultorioSchema, actualizarConsultorioSchema } = require('./dtos/Consultorio.schema');

router.get('/', getConsultorios);
router.post('/', validarSchema(crearConsultorioSchema), createConsultorio);
router.put('/:id', validarSchema(actualizarConsultorioSchema), updateConsultorio);
router.delete('/:id', deleteConsultorio);

export default router;