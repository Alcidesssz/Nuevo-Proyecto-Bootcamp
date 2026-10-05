import express from 'express';
const router = express.Router();
const { getHistoriasClinicas, getHistoriaClinicaById, createHistoriaClinica, deleteHistoriaClinica } = require('../controllers/historiaClinica.controller');   

const { validarSchema } = require('../../middlewares/validarDatos.middleware');
const { crearHistoriaClinicaSchema } = require('./dtos/HistoriaClinica.schema');

router.get('/', getHistoriasClinicas);
router.get('/:id', getHistoriaClinicaById);
router.post('/', createHistoriaClinica);
router.delete('/:id', deleteHistoriaClinica);

module.exports = router;