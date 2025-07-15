import { Request, Response } from 'express';
export declare class BrandController {
    constructor();
    createBrand: (req: Request, res: Response) => Promise<void>;
    getBrand: (req: Request, res: Response) => Promise<void>;
    getBrands: (req: Request, res: Response) => Promise<void>;
    updateBrand: (req: Request, res: Response) => Promise<void>;
    deleteBrand: (req: Request, res: Response) => Promise<void>;
}
