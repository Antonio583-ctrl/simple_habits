const app = require('./app');
const { sequelize } = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a PostgreSQL');
        
        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados');
        
        app.listen(PORT, () => {
            console.log(`
            ═══════════════════════════════════════
            🚀 Servidor iniciado!
            📍 http://localhost:${PORT}
            📋 Proyecto: Seguimiento de Hábitos
            ═══════════════════════════════════════
            `);
        });
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

startServer();