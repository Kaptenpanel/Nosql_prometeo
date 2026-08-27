const mongoose = require('mongoose')

const conecta = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Conectado a la base de datos")
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    conecta
}