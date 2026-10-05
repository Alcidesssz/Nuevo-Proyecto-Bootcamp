require('dotenv').config();
import type {Application} from 'express';
import express from 'express';
import cors from 'cors';
import {connectDB} from './src/config/database';

const app: Application = express();

connectDB();

import auditMiddleware from './src/middlewares/auditoria.middleware';
import errorHandler from './src/middlewares/errorHandler.middleware';
const rutaNoEncontrada = require("./src/middlewares/rutaNoEncontrada.middleware");
const { validarJWT } = require('./src/middlewares/validarJWT.middleware');

const authRoutes = require('./src/modules/auth/auth.routes');
import turnosRoutes from './src/modules/Turnos/turnos.routes';
import pacientesRoutes from './src/modules/Pacientes/pacientes.routes';
const especialidadRoutes = require('./src/modules/Especialidad/especialidad.routes');
const medicoRoutes = require('./src/modules/Medico/medico.routes');
const historiaClinicaRoutes = require('./src/modules/HistoriaClinica/historiaClinica.routes');
import consultorioRoutes from './src/modules/Consultorio/consultorio.routes';
const recepcionRoutes = require('./src/modules/Recepcion/recepcion.routes');

app.use(cors());
app.use(express.json());
app.use(auditMiddleware);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/turnos', validarJWT, turnosRoutes);
app.use('/api/v1/pacientes', validarJWT, pacientesRoutes);
app.use('/api/v1/especialidades', validarJWT, especialidadRoutes);
app.use('/api/v1/medicos', validarJWT, medicoRoutes);
app.use('/api/v1/historias-clinicas', validarJWT, historiaClinicaRoutes);
app.use('/api/v1/consultorios', validarJWT, consultorioRoutes);
app.use('/api/v1/recepcion', validarJWT, recepcionRoutes);


app.use(rutaNoEncontrada);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`=============SERVIDOR MUNICIPAL==============`);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Entorno:', process.env.NODE_ENV || 'development');
    console.log(`=============================================`);
});