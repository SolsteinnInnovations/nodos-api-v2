import { Request, Response } from "express";
export declare class PermissionController {
    constructor();
    createPermission: (req: Request, res: Response) => Promise<void>;
    getPermissions: (req: Request, res: Response) => Promise<void>;
    getPermission: (req: Request, res: Response) => Promise<void>;
    updatePermission: (req: Request, res: Response) => Promise<void>;
    deletePermission: (req: Request, res: Response) => Promise<void>;
}
