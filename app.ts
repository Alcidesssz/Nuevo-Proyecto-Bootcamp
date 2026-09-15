require('dotenv').config();
import type {Application} from 'express';
import express from 'express';
import cors from 'cors';
import {connectDB} from './src/config/database';

const app: Application = express();

connectDB();

const auditMiddleware = require('./src/middlewares/auditoria.middleware');
const errorHandlerMiddleware = require('./src/middlewares/errorHandler.middleware');

import turnosRoutes from './src/modules/Turnos/turnos.routes';
import pacientesRoutes from './src/modules/Pacientes/pacientes.routes';
const especialidadRoutes = require('./src/routes/especialidad.routes');
const medicoRoutes = require('./src/routes/medico.routes');
const historiaClinicaRoutes = require('./src/routes/historiaClinica.routes');
const consultorioRoutes = require('./src/routes/consultorio.routes');
const recepcionRoutes = require('./src/routes/recepcion.routes');

app.use(cors());
app.use(express.json());
app.use(auditMiddleware);

app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/pacientes', pacientesRoutes);
app.use('/api/v1/especialidades', especialidadRoutes);
app.use('/api/v1/medicos', medicoRoutes);
app.use('/api/v1/historias-clinicas', historiaClinicaRoutes);
app.use('/api/v1/consultorios', consultorioRoutes);
app.use('/api/v1/recepcion', recepcionRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`=============SERVIDOR MUNICIPAL==============`);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Entorno:', process.env.NODE_ENV || 'development');
    console.log(`=============================================`);
});