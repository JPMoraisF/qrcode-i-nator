const QRCode = require("../models/QRCode");
const User = require("../models/User");
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  async store(request, response) {
    const { url, name = url } = request.body;
    const { userId } = request.params;

    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return response.status(404).json({ message: "user not found!" });
      }
      
      var qr = await QRCode.create({
        url,
        name,
        visitors: 0,
        user: userId,
      });
      
      return response.json(qr);
    } catch (err) {
      return response.send({err});
    }
  },


  async update(request, response) {
    const { codeId, userId } = request.params;
    var db_code = await QRCode.findOne({ _id: codeId, user: userId });
    if (!db_code) return response.status(404).json({ message: "QRCode not found!" });
      
    db_code = await QRCode.updateOne(
      { _id: codeId },
      {
        $set: {
          "name": request.body.name,
          "url": request.body.url
        },
        $currentDate: { lastModified: true },
      }
    );

    return response.json({message: "Updated successful"});
    
  },

  async blankIt(request, response) {
    const { codeId, userId } = request.params;
    var db_code = await QRCode.findOne({ _id: codeId, user: userId });
    if(!db_code) return response.status(404).json({ message: "QRCode not found!" });
    await QRCode.updateOne({_id: codeId}, {
      $set: {
        url: "",
        name: "Sem Nome",
        visitors: 0,
      }
    });
    return response.send('Blanked Document');
  },



  //Não tem mais essa função
  async search(request, response) {
    const { codeId } = request.params;
    try {
      var db_code = await QRCode.findOne({ codeId });
      if (!db_code)
        return response.status(400).json({ message: "Qrcode not found" });

      return response.send({ db_code });
    } catch (err) {
      return response.send({ err });
    }
  },



  // não deletar QR Code, mas deixar ele "vazio"
  async delete(request, response) {
    const { codeId, userId } = request.params;
    var db_code = await QRCode.updateOne({_id: codeId, user: userId}, {
      $set: {
        url: "",
        name: "Sem Nome",
        visitors: 0,
      }
    });
    if (!db_code) {
      return response.status(404).json({ message: "QRCode not found!" });
    } else {
      return response.json(db_code);
    }
  }
};
