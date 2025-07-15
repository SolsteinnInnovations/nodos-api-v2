import { Request, Response } from "express";
export declare class PersonController {
    constructor();
    createPerson: (req: Request, res: Response) => Promise<void>;
    getPersons: (req: Request, res: Response) => Promise<void>;
    getPerson(req: Request, res: Response): Promise<void>;
    updatePerson: (req: Request, res: Response) => Promise<void>;
    deletePerson: (req: Request, res: Response) => Promise<void>;
}
