const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: "ID é obrigatório"
    },
    name: {
        type: String,
    },
    url: {
        type: String,
        required: "URL é obrigatório"
    },
    visitors: {
        type: Number,
        required: "Visitantes da URL!"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('QRCode', QRCodeSchema);