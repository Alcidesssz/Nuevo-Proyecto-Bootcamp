import express from 'express';
const router = express.Router();
const { loginUsuario, registrarUsuario } = require('./auth.controller');

const { validarSchema } = require('../../middlewares/validarDatos.middleware');
const { loginSchema } = require('./dtos/Login.schema');
const { registroSchema } = require('./dtos/Registro.schema');

router.post('/login', validarSchema(loginSchema), loginUsuario);
router.post('/registro', validarSchema(registroSchema), registrarUsuario);

module.exports = router;