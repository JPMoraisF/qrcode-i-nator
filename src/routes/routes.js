const { Router } = require("express");
const UrlController = require("../controllers/UrlController");
//const authConfig = process.env.SECRET
const { check, validationResult } = require("express-validator");

const rootRoutes = Router();

// Rotas de login e cadastro.
rootRoutes.post(
  "/register",
  [
    check("email", "Valid email address required").isEmail(),
    check("password", "Password required").exists(),
    check("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
    check("name", "Name must not be blank").exists(),
    check("name", "Name must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  authentication.register
);
rootRoutes.post(
  "/login",
  [
    check("email", "Valid email address required").isEmail(),
    check("password", "Password required").exists(),
    check("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ],
  authentication.authentication
);

// Rota de redirecionamento
rootRoutes.get("/:id", UrlController.handleRequest);

module.exports = rootRoutes;
