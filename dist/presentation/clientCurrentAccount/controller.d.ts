import { Request, Response } from 'express';
export declare class ClientCurrentAccountController {
    constructor();
    createClientCurrentAccount: (req: Request, res: Response) => Promise<void>;
    getClientCurrentAccounts: (req: Request, res: Response) => Promise<void>;
    getClientCurrentAccountById: (req: Request, res: Response) => Promise<void>;
    updateClientCurrentAccount: (req: Request, res: Response) => Promise<void>;
    deleteClientCurrentAccount: (req: Request, res: Response) => Promise<void>;
}
