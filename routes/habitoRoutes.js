const express = require('express');
const router = express.Router();
const habitoController = require('../controllers/habitoController');

// Middleware para verificar sesión
const verificarSesion = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    next();
};

// Todas las rutas de hábitos requieren sesión
router.use(verificarSesion);

router.get('/', habitoController.listarHabitos);
router.get('/nuevo', habitoController.mostrarNuevoHabito);
router.post('/nuevo', habitoController.crearHabito);
router.post('/marcar/:id', habitoController.marcarCompletado);
router.get('/editar/:id', habitoController.mostrarEditarHabito);
router.post('/editar/:id', habitoController.editarHabito);
router.delete('/eliminar/:id', habitoController.eliminarHabito);

module.exports = router;