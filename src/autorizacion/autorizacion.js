import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Middleware de verificación de token
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido o expirado' });
        req.userId = decoded.id;
        next();
    });
};