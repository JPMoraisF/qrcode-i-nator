const { Router } = require('express');
const QrCodeController = require('../controllers/QrCodeController');
const UserController = require('../controllers/UserController');
const UrlController = require('../controllers/UrlController');

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users', UserController.delete);
routes.put('/users', UserController.update);

routes.get('/qrcode', QrCodeController.index);
routes.post('/qrcode', QrCodeController.store);
routes.put('/qrcode/:id', QrCodeController.update);
routes.delete('/qrcode/:id', QrCodeController.delete);

routes.get('/:id', UrlController.handleRequest);

module.exports = routes;