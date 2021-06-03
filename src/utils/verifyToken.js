const jwt = require('jsonwebtoken');
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
