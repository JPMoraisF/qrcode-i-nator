const { Router } = require('express');
const verifyToken = require('../utils/verifyToken');
const QrCodeController = require('../controllers/QrCodeController');

const codeRoutes = Router();

// Codes
codeRoutes.post("/:userId/codes", verifyToken, QrCodeController.store);
codeRoutes.patch("/:userId/codes/:codeId", verifyToken, QrCodeController.update);
codeRoutes.put("/:userId/codes/:codeId", verifyToken, QrCodeController.delete);
codeRoutes.delete("/:userId/codes/:codeId", verifyToken, QrCodeController.blankIt);


module.exports = codeRoutes;