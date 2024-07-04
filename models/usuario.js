const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    email: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria']
    },
    enabled: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    }
})

module.exports = model('Usuario', UsuarioSchema)