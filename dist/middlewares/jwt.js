"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_KEY, {
            algorithms: ['HS256'],
        });
        req.user = decoded; // Casting req to any to add user property
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticateUser = authenticateUser;
const generateJWT = async (user) => {
    const token = jsonwebtoken_1.default.sign(user, process.env.SECRET_JWT_KEY, { expiresIn: '1d' });
    return token;
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=jwt.js.map