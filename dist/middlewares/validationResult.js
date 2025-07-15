"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const { validationResult } = require('express-validator');
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
        return;
    }
    if (Array.isArray(req.body)) {
        const allErrors = req.body.map((item, index) => {
            const itemErrors = validationResult({ ...req, body: item });
            return itemErrors.isEmpty() ? null : { index, errors: itemErrors.array() };
        }).filter((item) => item !== null);
        if (allErrors.length > 0) {
            res.status(400).json({
                errors: allErrors
            });
            return;
        }
    }
    next();
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validationResult.js.map