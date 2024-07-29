const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    try {
        const decoded = jwt.verify(token, 'tu_secreto');
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('Token no válido');
    }
};
