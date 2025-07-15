import { Request, Response, NextFunction } from 'express';
export declare function fileValidation(...extensionValida: string[]): (req: Request, res: Response, next: NextFunction) => void;
