const jwt = require('jsonwebtoken');
require('dotenv').config({  
    path: process.env.NODE_ENV=== "DEVELOPMENT" ? ".env.local" : ".env"
});
const secret = process.env.SECRET;

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (err) {
        return res.send({ err })
    }
}
