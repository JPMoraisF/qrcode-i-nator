const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    qrcode: [{ type: mongoose.Schema.Types.ObjectId, ref: "QRCode" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model("User", UserSchema);
