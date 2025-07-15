import { Request, Response } from "express";
export declare class UserController {
    constructor();
    registerUser: (req: Request, res: Response) => Promise<void>;
    postUser: (req: Request, res: Response) => Promise<void>;
    getUser: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<void>;
    getUsers: (req: Request, res: Response) => Promise<void>;
    getClerkUsers: (req: Request, res: Response) => Promise<void>;
    getClerkUser: (req: Request, res: Response) => Promise<void>;
    deleteUser: (req: Request, res: Response) => Promise<void>;
}
