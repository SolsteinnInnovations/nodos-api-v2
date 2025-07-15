import { Request, Response } from "express";
export declare class SucursalController {
    constructor();
    private getAvailableSucursales;
    createSucursal: (req: Request, res: Response) => Promise<void>;
    getSucursales: (req: Request, res: Response) => Promise<void>;
    getSucursal: (req: Request, res: Response) => Promise<void>;
    updateSucursal: (req: Request, res: Response) => Promise<void>;
    deleteSucursal: (req: Request, res: Response) => Promise<void>;
}
