const { Router } = require('express');
const UserController = require('../controllers/UserController');
const verifyToken = require('../utils/verifyToken');


const userRoutes = Router();

userRoutes.get("/:userId", verifyToken, UserController.search);
userRoutes.delete(":userId", verifyToken, UserController.delete);
userRoutes.put("/:userId", verifyToken, UserController.update);
userRoutes.get("/:userId/codes", verifyToken, UserController.codes);




module.exports = userRoutes;