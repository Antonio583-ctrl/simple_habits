const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Middleware para pasar usuario a todas las vistas
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    res.locals.currentYear = new Date().getFullYear();
    next();
});

// Rutas
const authRoutes = require('./routes/authRoutes');
const habitoRoutes = require('./routes/habitoRoutes');

app.use('/', authRoutes);
app.use('/habitos', habitoRoutes);

// Redirección raíz
app.get('/', (req, res) => {
    if (req.session.usuario) {
        res.redirect('/habitos');
    } else {
        res.redirect('/login');
    }
});

// Error 404
app.use((req, res) => {
    res.status(404).render('error', { mensaje: 'Página no encontrada' });
});

module.exports = app;