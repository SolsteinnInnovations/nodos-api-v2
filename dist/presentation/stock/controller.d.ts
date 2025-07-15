import { Request, Response } from "express";
export declare class ProductSucursalController {
    constructor();
    addStock: (req: Request, res: Response) => Promise<void>;
    getProductSucursal: (req: Request, res: Response) => Promise<void>;
    getSucursal: (req: Request, res: Response) => Promise<void>;
    updateSucursal: (req: Request, res: Response) => Promise<void>;
    deleteSucursal: (req: Request, res: Response) => Promise<void>;
}
