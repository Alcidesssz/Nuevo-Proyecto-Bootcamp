const express = require('express');
const router = express.Router();
const { getTurnos, createTurno, deleteTurno, getTurnosPorEspecialidad } = require('../controllers/turnos.controller');

router.get('/', getTurnos);
router.post('/', createTurno);
router.delete('/:id', deleteTurno);
router.get('/:especialidad', getTurnosPorEspecialidad);

module.exports = router;