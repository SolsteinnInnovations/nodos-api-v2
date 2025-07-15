import { Request, Response } from "express";
export declare class SupplierInvoiceController {
    createSupplierInvoice: (req: Request, res: Response) => Promise<void>;
    getSupplierInvoices: (req: Request, res: Response) => Promise<void>;
    getSupplierInvoice: (req: Request, res: Response) => Promise<void>;
    updateSupplierInvoice: (req: Request, res: Response) => Promise<void>;
    deleteSupplierInvoice: (req: Request, res: Response) => Promise<void>;
}
