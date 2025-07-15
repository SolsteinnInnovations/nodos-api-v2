"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../../middlewares/validationResult");
const controller_1 = require("./controller");
class CategoryRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.CategoryController();
        router.post('/', [
            (0, express_validator_1.body)("nombre", "El nombre es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("nombre", "El nombre debe tener 3 caracteres como minimo").isLength({ min: 3 }),
            (0, express_validator_1.body)("descripcion", "El campo descripcion es obligatorio").not().isEmpty(),
            validationResult_1.validarCampos
        ], controller.createCategory);
        router.get('/', controller.getCategories);
        router.get('/:id', controller.getCategory);
        router.put('/:id', [
            (0, express_validator_1.body)("nombre", "El nombre es obligatorio").not().isEmpty().optional(),
            (0, express_validator_1.body)("nombre", "El nombre debe tener 3 caracteres como minimo").isLength({ min: 3 }).optional(),
            (0, express_validator_1.body)("descripcion", "El campo descripcion es obligatorio").not().isEmpty().optional(),
            validationResult_1.validarCampos
        ], controller.updateCategory);
        router.delete('/:id', controller.deleteCategory);
        return router;
    }
}
exports.CategoryRoutes = CategoryRoutes;
//# sourceMappingURL=routes.js.map