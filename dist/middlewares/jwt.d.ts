import { Request, Response, NextFunction } from 'express';
export declare const authenticateUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const generateJWT: (user: any) => Promise<string>;
