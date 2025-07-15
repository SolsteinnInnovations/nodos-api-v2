import { Request, Response } from "express";
export declare class AuthController {
    constructor();
    loginUser: (req: Request, res: Response) => Promise<void>;
}
