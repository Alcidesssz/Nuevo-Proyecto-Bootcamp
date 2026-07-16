const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
    } catch (error) {
        console.error('🔴Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log('🟢Conexión exitosa a la base de datos');
});

mongoose.connection.on('disconnected', () => {
    console.log('🟡Conexión perdida con la base de datos');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔴Conexión a la base de datos cerrada por terminación de la aplicación');
    process.exit(0);
});

module.exports = connectDB;