const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Nome do usuário é obrigatório"
    },
    email: {
        type: String,
        required: "É obrigatório"
    },
});

module.exports = mongoose.model('User', UserSchema);