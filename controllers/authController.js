const Usuario = require('../models/Usuario');

// Mostrar formulario de login
const mostrarLogin = (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/habitos');
    }
    res.render('auth/login', { error: null });
};

// Procesar login
const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        
        if (!usuario) {
            return res.render('auth/login', { error: 'Email no registrado' });
        }
        
        const passwordValido = await usuario.validarPassword(password);
        
        if (!passwordValido) {
            return res.render('auth/login', { error: 'Contraseña incorrecta' });
        }
        
        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email
        };
        
        res.redirect('/habitos');
    } catch (error) {
        console.error(error);
        res.render('auth/login', { error: 'Error al iniciar sesión' });
    }
};

// Mostrar formulario de registro
const mostrarRegistro = (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/habitos');
    }
    res.render('auth/registro', { error: null });
};

// Procesar registro
const registro = async (req, res) => {
    const { nombre, email, password, confirmar_password } = req.body;
    
    if (password !== confirmar_password) {
        return res.render('auth/registro', { error: 'Las contraseñas no coinciden' });
    }
    
    if (password.length < 6) {
        return res.render('auth/registro', { error: 'La contraseña debe tener al menos 6 caracteres' });
    }
    
    try {
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        
        if (usuarioExistente) {
            return res.render('auth/registro', { error: 'El email ya está registrado' });
        }
        
        await Usuario.create({ nombre, email, password });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('auth/registro', { error: 'Error al registrar usuario' });
    }
};

// Cerrar sesión
const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

module.exports = {
    mostrarLogin,
    login,
    mostrarRegistro,
    registro,
    logout
};