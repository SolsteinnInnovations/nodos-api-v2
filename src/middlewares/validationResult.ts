import { Request,Response,NextFunction } from "express";

const { validationResult } = require('express-validator');

export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(400).json({
            errors: errors.array()
        });
        return;
    }

    if (Array.isArray(req.body)) {
        const allErrors = req.body.map((item: any, index: number) => {
            const itemErrors = validationResult({ ...req, body: item });
            return itemErrors.isEmpty() ? null : { index, errors: itemErrors.array() };
        }).filter((item: any) => item !== null);

        if (allErrors.length > 0) {
             res.status(400).json({
                errors: allErrors
            });
            return;
        }
    }

    next();
};
