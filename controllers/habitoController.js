const Habito = require('../models/Habito');
const { Op } = require('sequelize');

// Listar hábitos del usuario
const listarHabitos = async (req, res) => {
    try {
        const habitos = await Habito.findAll({
            where: { 
                usuario_id: req.session.usuario.id,
                activo: true
            },
            order: [['createdAt', 'DESC']]
        });
        
        res.render('habitos/index', { habitos });
    } catch (error) {
        console.error(error);
        res.render('error', { mensaje: 'Error al cargar hábitos' });
    }
};

// Mostrar formulario para crear hábito
const mostrarNuevoHabito = (req, res) => {
    res.render('habitos/nuevo', { error: null });
};

// Crear nuevo hábito
const crearHabito = async (req, res) => {
    const { nombre, descripcion } = req.body;
    
    if (!nombre || nombre.trim().length < 3) {
        return res.render('habitos/nuevo', { error: 'El nombre debe tener al menos 3 caracteres' });
    }
    
    try {
        await Habito.create({
            nombre: nombre.trim(),
            descripcion: descripcion || null,
            usuario_id: req.session.usuario.id
        });
        
        res.redirect('/habitos');
    } catch (error) {
        console.error(error);
        res.render('habitos/nuevo', { error: 'Error al crear el hábito' });
    }
};

// Marcar hábito como completado
const marcarCompletado = async (req, res) => {
    const { id } = req.params;
    
    try {
        const habito = await Habito.findOne({
            where: { 
                id: id,
                usuario_id: req.session.usuario.id
            }
        });
        
        if (!habito) {
            return res.status(404).json({ error: 'Hábito no encontrado' });
        }
        
        const hoy = new Date().toISOString().split('T')[0];
        const ultimoCheck = habito.ultimo_check;
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        const ayerStr = ayer.toISOString().split('T')[0];
        
        // Si ya lo marcó hoy
        if (ultimoCheck === hoy) {
            return res.json({ mensaje: 'Ya marcaste este hábito hoy' });
        }
        
        // Si marcó ayer, aumenta racha
        if (ultimoCheck === ayerStr) {
            habito.racha_actual += 1;
        } else {
            // Si no marcó ayer, reinicia racha
            habito.racha_actual = 1;
        }
        
        // Actualizar racha máxima
        if (habito.racha_actual > habito.racha_maxima) {
            habito.racha_maxima = habito.racha_actual;
        }
        
        habito.ultimo_check = hoy;
        await habito.save();
        
        res.json({ 
            success: true, 
            racha_actual: habito.racha_actual,
            racha_maxima: habito.racha_maxima
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al marcar hábito' });
    }
};

// Mostrar formulario de edición
const mostrarEditarHabito = async (req, res) => {
    const { id } = req.params;
    
    try {
        const habito = await Habito.findOne({
            where: { 
                id: id,
                usuario_id: req.session.usuario.id
            }
        });
        
        if (!habito) {
            return res.redirect('/habitos');
        }
        
        res.render('habitos/editar', { habito, error: null });
    } catch (error) {
        console.error(error);
        res.redirect('/habitos');
    }
};

// Editar hábito
const editarHabito = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    
    if (!nombre || nombre.trim().length < 3) {
        const habito = await Habito.findByPk(id);
        return res.render('habitos/editar', { habito, error: 'El nombre debe tener al menos 3 caracteres' });
    }
    
    try {
        await Habito.update(
            { nombre: nombre.trim(), descripcion: descripcion || null },
            { 
                where: { 
                    id: id,
                    usuario_id: req.session.usuario.id
                }
            }
        );
        
        res.redirect('/habitos');
    } catch (error) {
        console.error(error);
        res.redirect('/habitos');
    }
};

// Eliminar hábito
const eliminarHabito = async (req, res) => {
    const { id } = req.params;
    
    try {
        await Habito.destroy({
            where: { 
                id: id,
                usuario_id: req.session.usuario.id
            }
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar hábito' });
    }
};

module.exports = {
    listarHabitos,
    mostrarNuevoHabito,
    crearHabito,
    marcarCompletado,
    mostrarEditarHabito,
    editarHabito,
    eliminarHabito
};