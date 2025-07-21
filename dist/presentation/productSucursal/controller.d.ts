import { Request, Response } from "express";
export declare class ProductSucursalController {
    constructor();
    createProductSucursal: (req: Request, res: Response) => Promise<void>;
    getProductsSucursal: (req: Request, res: Response) => Promise<void>;
    obtenerProductosConStockTotal: (req: Request, res: Response) => Promise<void>;
    updateProductSucursal: (req: Request, res: Response) => Promise<void>;
    deleteProductSucursal: (req: Request, res: Response) => Promise<void>;
}
