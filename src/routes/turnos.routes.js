const express = require('express');
const router = express.Router();
const { getTurnos, createTurno, deleteTurno, getTurnosPorEspecialidad, marcarAtendido } = require('../controllers/turnos.controller');

router.get('/', getTurnos);
router.post('/', createTurno);
router.delete('/:id', deleteTurno);
router.get('/:especialidad', getTurnosPorEspecialidad);
router.patch('/:id', marcarAtendido);

module.exports = router;