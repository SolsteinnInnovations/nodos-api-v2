"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnsRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class ReturnsRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ReturnsController();
        // Crear una nueva devolución
        router.post("/", [
            (0, express_validator_1.body)("idProducto", "El ID del producto es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("cantidad", "La cantidad es obligatoria").not().isEmpty(),
            (0, express_validator_1.body)("precio", "El precio es obligatorio").not().isEmpty(),
            validationResult_1.validarCampos,
        ], controller.createReturn);
        // Obtener todas las devoluciones
        router.get("/", controller.getReturns);
        // Obtener una devolución por ID
        router.get("/:id", controller.getReturn);
        // Actualizar una devolución
        router.put("/:id", [
            (0, express_validator_1.body)("idProducto", "El ID del producto es obligatorio").optional().not().isEmpty(),
            (0, express_validator_1.body)("cantidad", "La cantidad es obligatoria").optional().not().isEmpty(),
            (0, express_validator_1.body)("precio", "El precio es obligatorio").optional().not().isEmpty(),
            (0, express_validator_1.body)("idSucursal", "El ID de la sucursal es obligatorio").optional().not().isEmpty(),
            validationResult_1.validarCampos,
        ], controller.updateReturn);
        // Eliminar una devolución
        router.delete("/:id", controller.deleteReturn);
        return router;
    }
}
exports.ReturnsRoutes = ReturnsRoutes;
//# sourceMappingURL=routes.js.map