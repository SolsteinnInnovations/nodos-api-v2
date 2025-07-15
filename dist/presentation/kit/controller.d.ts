import { Request, Response } from "express";
export declare class KitController {
    createKit: (req: Request, res: Response) => Promise<void>;
    getKits: (req: Request, res: Response) => Promise<void>;
    getKit: (req: Request, res: Response) => Promise<void>;
    updateKit: (req: Request, res: Response) => Promise<void>;
    deleteKit: (req: Request, res: Response) => Promise<void>;
}
