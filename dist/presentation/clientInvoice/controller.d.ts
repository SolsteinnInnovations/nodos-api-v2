import { Request, Response } from "express";
export declare class ClientInvoiceController {
    constructor();
    createClientInvoice: (req: Request, res: Response) => Promise<void>;
    getAllClientInvoices: (req: Request, res: Response) => Promise<void>;
    getAllClientInvoicesBySucursal: (req: Request, res: Response) => Promise<void>;
    getAllUnpaidClientInvoices: (req: Request, res: Response) => Promise<void>;
    getOneClientInvoice: (req: Request, res: Response) => Promise<void>;
    updateClientInvoice: (req: Request, res: Response) => Promise<void>;
    payClientInvoice: (req: Request, res: Response) => Promise<void>;
    deleteClientInvoice: (req: Request, res: Response) => Promise<void>;
}
