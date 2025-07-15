import { Request, Response } from 'express';
export declare class SupplierCurrentAccountController {
    constructor();
    createSupplierCurrentAccount: (req: Request, res: Response) => Promise<void>;
    getSupplierCurrentAccounts: (req: Request, res: Response) => Promise<void>;
    getSupplierCurrentAccountById: (req: Request, res: Response) => Promise<void>;
    updateSupplierCurrentAccount: (req: Request, res: Response) => Promise<void>;
    deleteSupplierCurrentAccount: (req: Request, res: Response) => Promise<void>;
}
