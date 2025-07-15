import { Request, Response } from 'express';
export declare class ClientController {
    constructor();
    createClient: (req: Request, res: Response) => Promise<void>;
    getClients: (req: Request, res: Response) => Promise<void>;
    getClient: (req: Request, res: Response) => Promise<void>;
    updateClient: (req: Request, res: Response) => Promise<void>;
    deleteClient: (req: Request, res: Response) => Promise<void>;
}
