"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiscationProductRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../../middlewares/validationResult");
const controller_1 = require("./controller");
class ConfiscationProductRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ConfiscationProductController();
        // Definir las rutas
        router.post("/", [
            // body("codigo", "El código es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("nombre", "El nombre es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("motivoDescomiso", "El motivo del decomiso es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("precioLista", "El precio de lista es obligatorio").isNumeric(),
            (0, express_validator_1.body)("precioVenta", "El precio de venta es obligatorio").isNumeric(),
            validationResult_1.validarCampos,
        ], controller.createConfiscationProduct);
        router.get("/", controller.getConfiscationProducts);
        // router.get("/:term", controller.getConfiscationProduct)
        router.put("/:id", [
            (0, express_validator_1.body)("codigo", "El código es obligatorio").not().isEmpty().optional(),
            (0, express_validator_1.body)("nombre", "El nombre es obligatorio").not().isEmpty().optional(),
            (0, express_validator_1.body)("motivoDescomiso", "El motivo del decomiso es obligatorio").not().isEmpty().optional(),
            (0, express_validator_1.body)("precioLista", "El precio de lista es obligatorio").isNumeric().optional(),
            (0, express_validator_1.body)("precioVenta", "El precio de venta es obligatorio").isNumeric().optional(),
            validationResult_1.validarCampos,
        ], controller.updateConfiscationProduct);
        router.delete("/:id", controller.deleteConfiscationProduct);
        return router;
    }
}
exports.ConfiscationProductRoutes = ConfiscationProductRoutes;
//# sourceMappingURL=routes.js.map