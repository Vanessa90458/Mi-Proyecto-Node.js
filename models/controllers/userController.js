const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, age, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, age, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Contraseña incorrecta');
        }
        const token = jwt.sign({ id: user._id }, 'tu_secreto', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.logoutUser = (req, res) => {
    // La lógica para el logout depende de cómo se maneje el frontend
    res.status(200).send('Usuario deslogueado con éxito');
};
