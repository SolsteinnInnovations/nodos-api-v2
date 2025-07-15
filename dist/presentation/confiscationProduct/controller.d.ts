import { Request, Response } from "express";
export declare class ConfiscationProductController {
    constructor();
    createConfiscationProduct: (req: Request, res: Response) => Promise<void>;
    getConfiscationProducts: (req: Request, res: Response) => Promise<void>;
    getConfiscationProduct(req: Request, res: Response): Promise<void>;
    updateConfiscationProduct(req: Request, res: Response): Promise<void>;
    deleteConfiscationProduct(req: Request, res: Response): Promise<void>;
}
