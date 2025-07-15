import { Request, Response } from "express";
export declare class ReturnsController {
    createReturn: (req: Request, res: Response) => Promise<void>;
    getReturns: (req: Request, res: Response) => Promise<void>;
    getReturn: (req: Request, res: Response) => Promise<void>;
    updateReturn: (req: Request, res: Response) => Promise<void>;
    deleteReturn: (req: Request, res: Response) => Promise<void>;
}
