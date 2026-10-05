import express from 'express';
const router = express.Router();
const { getHistoriasClinicas, getHistoriaClinicaById, createHistoriaClinica, deleteHistoriaClinica } = require('./historiaClinica.controller');

const { validarSchema } = require('../../middlewares/validarDatos.middleware');
const { crearHistoriaClinicaSchema } = require('./dtos/HistoriaClinica.schema');

router.get('/', getHistoriasClinicas);
router.get('/:id', getHistoriaClinicaById);
router.post('/', validarSchema(crearHistoriaClinicaSchema), createHistoriaClinica);
router.delete('/:id', deleteHistoriaClinica);

module.exports = router;