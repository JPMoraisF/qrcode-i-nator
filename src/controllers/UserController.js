const User = require("../models/User");

module.exports = {
  //Quando deletar usuário, deletar os QR Codes também!!
  async delete(request, response) {
    var { id } = request.params;
    const db_user = await User.deleteOne({ id });
    if (db_user.deletedCount === 0) {
      return response
        .status(404)
        .json({ message: "Document not Found", deleted: db_user.deletedCount });
    }
    return response.json({
      message: "user deleted",
      deleted: db_user.deletedCount,
    });
  },

  async search(request, response) {
    const { id } = request.params;
    try {
      var db_user = await User.findOne({ _id: id });
      if (!db_user)
        return response.status(400).json({ message: "User not Found" });

      return response.send(db_user);
    } catch (err) {
      return response.send({ err });
    }
  },

  async update(request, response) {
    var { id } = request.params;
    var db_user = await User.findOne({ _id: id });
    if (db_user) {
      await User.updateOne(
        { _id: id },
        {
          $set: request.body,
          $currentDate: { lastModified: true },
        }
      );
      return response.json({
        message: "document updated",
        modifiedDocuments: db_user.nModified,
      });
    } else {
      response.status(404).json({ message: "document not found" });
    }
  },

  async codes(request, response) {
    const { id } = request.params;
    try {
      const codes = await User.findOne({ _id: id }).populate("qrcode");
      if (!codes) return response.json({ message: "no qr codes to show" });
      return response.send(codes.qrcode);
    } catch (err) {
      return response.send(err);
    }
  }
};
