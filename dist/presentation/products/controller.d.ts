import { Request, Response } from "express";
export declare class ProductController {
    constructor();
    createProduct: (req: Request, res: Response) => Promise<void>;
    getProducts: (req: Request, res: Response) => Promise<void>;
    getProduct: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
    lowStockProducts: (req: Request, res: Response) => Promise<void>;
}
