const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const { validationResult } = require('express-validator');

function generateToken(params = {}) {
    return jwt.sign(params, secret,
        {expiresIn: 3600});
}


module.exports = {
    async authentication(request, response) {
        const { email, password } = request.body;
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user)
                return response.status(400).json({ "message": "invalid username or password!" });

            if (!await bcrypt.compare(password, user.password)) {
                return response.status(400).json({ "message": "invalid username or password!" });
            }
            user.password = undefined;

            const token = generateToken({id: user.id});
            return response.header('auth-token', token).send({ user });
        }
        catch (err) {
            return response.send({ err });
        }
    },

    async register(request, response) {
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty())
                return response.status(400).send(errors);
            const { email } = request.body;
            var db_user = await User.findOne({ email });
            if (db_user) {
                return response.status(400).json({ "message": "user already exists" });
            }
            db_user = await User.create(request.body);
            db_user.password = undefined;
            const token = generateToken({id: db_user.id})
            return response.header('auth-token', token).send({
                db_user
            });
        } catch (err) {
            return response.send({ err });
        }
    },
};