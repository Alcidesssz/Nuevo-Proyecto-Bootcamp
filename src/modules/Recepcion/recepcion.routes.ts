const express = require("express");
const router = express.Router();
const { registrarIngreso } = require('./Recepcion.controller');

const { validarSchema } = require('../../middlewares/validarDatos.middleware');
const { registrarIngresoSchema } = require('./dtos/Recepcion.schema');

router.post("/ingreso", validarSchema(registrarIngresoSchema), registrarIngreso);

module.exports = router;