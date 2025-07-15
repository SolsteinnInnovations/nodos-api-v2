import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticateUser = (req: Request, res: Response, next: NextFunction) : void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return ;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY,{
            algorithms: ['HS256'],        
        });
        req.user = decoded as any; // Casting req to any to add user property
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const generateJWT = async (user:any) => {
    const token =  jwt.sign(user, process.env.SECRET_JWT_KEY, { expiresIn: '1d' })
    return token;
}