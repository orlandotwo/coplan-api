const { default: mongoose } = require('mongoose');

const dbConnection = async() => {
  try {
      await mongoose.connect( process.env.MONGODB_ATLAS); 
      console.log('Base de datos -> MongoDB - online');
  } catch (error) {
    console.log(error);
    console.error('Error al iniciar la base de datos');
  }
}

module.exports = {
    dbConnection,
}