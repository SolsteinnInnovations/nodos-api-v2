"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducSucursaltroutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../../middlewares/validationResult");
const controller_1 = require("./controller");
class ProducSucursaltroutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ProductSucursalController();
        // Definir las rutas
        router.post("/", [
            (0, express_validator_1.body)("*.productoId", "El productoId es obligatorio").notEmpty().isMongoId(),
            (0, express_validator_1.body)("*.sucursalId", "El sucursalId es obligatorio").notEmpty().isMongoId(),
            (0, express_validator_1.body)("*.stock", "El stock es obligatorio").notEmpty().isInt({ gt: 0 }),
            (0, express_validator_1.body)("*.precioCosto", "El precioCosto es obligatorio").notEmpty().isFloat({ gt: 0 }),
            (0, express_validator_1.body)("*.precioVentaSucursal", "El precioVentaSucursal es obligatorio").notEmpty().isFloat({ gt: 0 }),
            validationResult_1.validarCampos,
        ], controller.createProductSucursal);
        // Obtener productos por sucursal
        router.get("/", controller.getProductsSucursal);
        // Actualizar productoSucursal
        router.put("/:id", [
            (0, express_validator_1.param)("id", "ID inválido").isMongoId(),
            (0, express_validator_1.body)("productoId").isMongoId(),
            (0, express_validator_1.body)("sucursalId").isMongoId(),
            (0, express_validator_1.body)("stock").optional().isInt({ gt: -1 }),
            (0, express_validator_1.body)("precioCosto").optional().isFloat({ gt: 0 }),
            (0, express_validator_1.body)("precioVentaSucursal").optional().isFloat({ gt: 0 }),
            validationResult_1.validarCampos,
        ], controller.updateProductSucursal);
        // Eliminar productoSucursal
        router.delete("/:id", [
            (0, express_validator_1.param)("id", "ID inválido").isMongoId(),
            validationResult_1.validarCampos
        ], controller.deleteProductSucursal);
        return router;
    }
}
exports.ProducSucursaltroutes = ProducSucursaltroutes;
//# sourceMappingURL=routes.js.map