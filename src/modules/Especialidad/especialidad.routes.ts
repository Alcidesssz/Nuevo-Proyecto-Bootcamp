import express from 'express';
const router = express.Router();
const { 
  getEspecialidades, 
  getEspecialidadById,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad
} = require('./especialidad.controller');

const { validarSchema } = require('../../middlewares/validarDatos.middleware');
const { crearEspecialidadSchema, actualizarEspecialidadSchema } = require('./dtos/Especialidad.schema');

router.get('/', getEspecialidades); 
router.get('/:id', getEspecialidadById); 
router.post("/", validarSchema(crearEspecialidadSchema), createEspecialidad);
router.put("/:id", validarSchema(actualizarEspecialidadSchema), updateEspecialidad);
router.delete('/:id', deleteEspecialidad); 

module.exports = router;