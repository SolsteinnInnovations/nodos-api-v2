"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class KitRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.KitController();
        router.post("/", [
            (0, express_validator_1.body)("nombre", "El nombre del kit es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("descripcion", "La descripción del kit es obligatoria").not().isEmpty(),
            (0, express_validator_1.body)("precioVenta", "El precio de venta es obligatorio").isNumeric(),
            (0, express_validator_1.body)("iva", "El IVA es obligatorio").isNumeric(),
            (0, express_validator_1.body)("items", "Los items son obligatorios y deben ser un array").isArray(),
            validationResult_1.validarCampos,
        ], controller.createKit);
        router.get("/", controller.getKits);
        router.get("/:id", controller.getKit);
        router.put("/:id", [
            (0, express_validator_1.body)("nombre").optional().not().isEmpty(),
            (0, express_validator_1.body)("descripcion").optional().not().isEmpty(),
            (0, express_validator_1.body)("precioVenta", "El precio de venta debe ser numérico").optional().isNumeric(),
            (0, express_validator_1.body)("iva", "El IVA debe ser numérico").optional().isNumeric(),
            (0, express_validator_1.body)("items", "Los items deben ser un array").optional().isArray(),
            validationResult_1.validarCampos,
        ], controller.updateKit);
        router.delete("/:id", controller.deleteKit);
        return router;
    }
}
exports.KitRoutes = KitRoutes;
//# sourceMappingURL=routes.js.map