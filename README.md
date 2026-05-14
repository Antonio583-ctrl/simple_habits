# 📋 Sistema de Seguimiento de Hábitos

Aplicación web para seguimiento de hábitos diarios con sistema de rachas.  
Desarrollada con **Node.js**, **Express**, **PostgreSQL** (o SQLite) y **EJS**.

---

## 🚀 Inicio Rápido

### Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [pnpm](https://pnpm.io/) (recomendado) o npm
- [PostgreSQL](https://www.postgresql.org/) (opcional, también se puede usar SQLite)

---

### Instalación y ejecución

1. **Clonar o descargar el proyecto**

```bash
git clone https://github.com/Antonio583-ctrl/simple_habits
cd simple_habits
```

2. **Instalar dependencias**

```bash
pnpm install
Configurar variables de entorno
```

3. **Crea un archivo .env en la raíz del proyecto con el siguiente contenido:**

```bash
env
PORT=3000
DB_NAME=habitos_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
SESSION_SECRET=una_frase_muy_segura
```
Si no tienes PostgreSQL instalado, puedes usar SQLite (sin configuración adicional).
Solo cambia el archivo config/database.js a SQLite.


4. **Crear la base de datos (solo para PostgreSQL)**

Conéctate a PostgreSQL y ejecuta:

```sql
CREATE DATABASE habitos_db;
```

5. **Ejecutar el proyecto**

```bash
pnpm run dev
```

6. **Abrir en el navegador**

http://localhost:3000

## 📦 Comandos útiles

### Comando	        Descripción
pnpm run dev	    Inicia el servidor en modo desarrollo (con nodemon)
pnpm start	        Inicia el servidor en modo producción
pnpm add <paquete>	Agrega una nueva dependencia


## 🛠️ Tecnologías utilizadas

Node.js – Entorno de ejecución

Express – Framework web

Sequelize – ORM para bases de datos

PostgreSQL / SQLite – Base de datos relacional

EJS – Motor de plantillas

bcryptjs – Encriptación de contraseñas

express-session – Manejo de sesiones

nodemon – Recarga automática en desarrollo.