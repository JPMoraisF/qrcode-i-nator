const mongoose = require("mongoose");

const QRCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
      required: "URL é obrigatório",
    },
    visitors: {
      type: Number,
      required: "Visitantes da URL!",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QRCode", QRCodeSchema);
