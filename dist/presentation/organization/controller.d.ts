import { Request, Response } from "express";
export declare class OrganizationController {
    constructor();
    createOrganization: (req: Request, res: Response) => Promise<void>;
    getOrganizations: (req: Request, res: Response) => Promise<void>;
}
