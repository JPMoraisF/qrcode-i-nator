const { Router } = require('express');
const QrCodeController = require('../controllers/QrCodeController');
const UserController = require('../controllers/UserController');


const userRoutes = Router();

userRoutes.get("/:id", UserController.search);
userRoutes.delete(":id", UserController.delete);
userRoutes.put("/:id", UserController.update);


// Codes
userRoutes.get("/:id/codes", UserController.codes);
userRoutes.post("/:id/codes", QrCodeController.store);
userRoutes.get("/:id/codes/:id", QrCodeController.search);
userRoutes.put("/:id/codes/:id", QrCodeController.update);
userRoutes.delete("/:id/codes/:id", QrCodeController.delete);

module.exports = userRoutes;