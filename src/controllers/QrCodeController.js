const QRCode = require("../models/QRCode");
const User = require("../models/User");
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  async store(request, response) {
    const { url, name = url } = request.body;
    const { id } = request.params;

    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return response.status(404).json({ message: "user not found!" });
      }
      
      var qr = await QRCode.create({
        url,
        name,
        visitors: 0,
        user: id,
      });
      
      // Na verdade aqui poderia ser um save na variável ao invés 
      //de um updateOne no model, mas deixa assim, cansei já

      await User.updateOne(
        { _id: user.id },
        {
          $push: { qrcode: qr._id },
        },
        {upsert: true}
      );
      
      return response.json(qr);
    } catch (err) {
      return response.send(err);
    }
  },

  async search(request, response) {
    const { id } = request.params;
    try {
      var db_code = await QRCode.findOne({ id });
      if (!db_code)
        return response.status(400).json({ message: "Qrcode not found" });

      return response.send({ db_code });
    } catch (err) {
      return response.send({ err });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    var db_code = await QRCode.findOne({ id });
    if (db_code) {
      for (var [key, value] of Object.entries(request.body)) {
        db_code = await QRCode.updateOne(
          { id },
          {
            $set: request.body,
            $currentDate: { lastModified: true },
          }
        );
      }
      return response.json(db_code);
    } else {
      return response.status(404).json({ message: "code not found" });
    }
  },

  // não deletar QR Code, mas deixar ele "vazio"
  //precisamos alterar o user após deletar o qrcode
  async delete(request, response) {
    const { id } = request.params;
    var db_code = await QRCode.deleteOne({ _id: id });
    if (db_code.deletedCount === 0) {
      return response.status(404).json({ message: "code not found!" });
    } else {
      return response.json(db_code);
    }
  },
};
