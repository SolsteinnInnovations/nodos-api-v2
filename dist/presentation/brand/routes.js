"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../../middlewares/validationResult");
const controller_1 = require("./controller");
class BrandRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.BrandController();
        router.post('/', [
            (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre de la marca es obligatorio'),
            (0, express_validator_1.body)('descripcion').notEmpty().withMessage('La descripción no puede ir vacía'),
            validationResult_1.validarCampos
        ], controller.createBrand);
        router.get('/', controller.getBrands);
        router.get('/:id', controller.getBrand);
        router.put('/:id', [
            (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre de la marca es obligatorio').optional(),
            (0, express_validator_1.body)('descripcion').notEmpty().withMessage('La descripción no puede ir vacía').optional(),
            validationResult_1.validarCampos
        ], controller.updateBrand);
        router.delete('/:id', controller.deleteBrand);
        return router;
    }
}
exports.BrandRoutes = BrandRoutes;
//# sourceMappingURL=routes.js.map