import { Request, Response } from "express";
export declare class DailyCashController {
    createDailyCash: (req: Request, res: Response) => Promise<void>;
    getDailyCashes: (req: Request, res: Response) => Promise<void>;
    getDailyCash: (req: Request, res: Response) => Promise<void>;
    updateDailyCash: (req: Request, res: Response) => Promise<void>;
    closeDailyCash: (req: Request, res: Response) => Promise<void>;
    getLastDailyCash: (req: Request, res: Response) => Promise<void>;
    addTrasanctionToDailyCash: (req: Request, res: Response) => Promise<void>;
}
