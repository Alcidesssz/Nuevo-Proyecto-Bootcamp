import express from "express";
import { registrarIngreso } from "./recepcion.controller";
import { validarSchema } from "../../middlewares/validarDatos.middleware";
import { IRegistrarIngresoDTO } from "./dtos/Recepcion.schema";

const router = express.Router();

router.post("/ingreso", validarSchema(IRegistrarIngresoDTO), registrarIngreso);

module.exports = router;