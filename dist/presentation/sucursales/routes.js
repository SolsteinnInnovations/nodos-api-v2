"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SucursalRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class SucursalRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.SucursalController();
        router.post("/", [
        // body("descripcion", "La descripción es obligatoria").not().isEmpty(),
        // body("direccion", "La dirección es obligatoria").not().isEmpty(),
        // body("direccion", "La dirección no puede tener más de 50 caracteres").isLength({ max: 50 }),
        //  validarCampos,
        ], controller.createSucursal);
        router.get("/", controller.getSucursales);
        router.get("/:id", controller.getSucursal);
        router.put("/:id", [
            (0, express_validator_1.body)("descripcion", "La descripción es obligatoria").not().isEmpty().optional(),
            (0, express_validator_1.body)("direccion", "La dirección no puede tener más de 50 caracteres").isLength({ max: 50 }).optional(),
            validationResult_1.validarCampos,
        ], controller.updateSucursal);
        router.patch("/:id", controller.updateSucursal);
        router.delete("/:id", controller.deleteSucursal);
        return router;
    }
}
exports.SucursalRoutes = SucursalRoutes;
//# sourceMappingURL=routes.js.map