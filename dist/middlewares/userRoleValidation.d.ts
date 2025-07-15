import { Request, Response, NextFunction } from 'express';
export declare function validarAdminRole(...validRoles: string[]): (req: Request, res: Response, next: NextFunction) => void;
