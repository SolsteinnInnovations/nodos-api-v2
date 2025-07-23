import { Request, Response } from "express";
export declare class SupplierController {
    createSupplier: (req: Request, res: Response) => Promise<void>;
    getSuppliers: (req: Request, res: Response) => Promise<void>;
    getSupplier: (req: Request, res: Response) => Promise<void>;
    updateSupplier: (req: Request, res: Response) => Promise<void>;
    deleteSupplier: (req: Request, res: Response) => Promise<void>;
}
