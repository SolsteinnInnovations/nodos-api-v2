"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierCurrentAccountRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../../middlewares/validationResult");
const controller_1 = require("./controller");
class SupplierCurrentAccountRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.SupplierCurrentAccountController();
        router.post("/", [
            (0, express_validator_1.body)("importe").optional().isNumeric().withMessage("El importe debe ser un número"),
            (0, express_validator_1.body)("deudaTotal").not().isEmpty().withMessage("La deuda total es obligatoria").isNumeric().withMessage("La deuda total debe ser un número"),
            (0, express_validator_1.body)("factura").optional().isString().withMessage("La factura debe ser un texto"),
            (0, express_validator_1.body)("estado").optional().isBoolean().withMessage("El estado debe ser un valor booleano"),
            (0, express_validator_1.body)("fechaPago").optional().isISO8601().withMessage("La fecha de pago debe ser una fecha válida"),
            (0, express_validator_1.body)("proveedor").optional().isMongoId().withMessage("El proveedor debe ser un ID válido"),
            validationResult_1.validarCampos,
        ], controller.createSupplierCurrentAccount);
        router.get("/", controller.getSupplierCurrentAccounts);
        router.get("/:id", [
            (0, express_validator_1.body)("id").optional().isMongoId().withMessage("El ID debe ser un ID válido"),
            validationResult_1.validarCampos,
        ], controller.getSupplierCurrentAccountById);
        router.put("/:id", [
            (0, express_validator_1.body)("importe").optional().isNumeric().withMessage("El importe debe ser un número"),
            (0, express_validator_1.body)("deudaTotal").optional().isNumeric().withMessage("La deuda total debe ser un número"),
            (0, express_validator_1.body)("factura").optional().isString().withMessage("La factura debe ser un texto"),
            (0, express_validator_1.body)("estado").optional().isBoolean().withMessage("El estado debe ser un valor booleano"),
            (0, express_validator_1.body)("fechaPago").optional().isISO8601().withMessage("La fecha de pago debe ser una fecha válida"),
            (0, express_validator_1.body)("proveedor").optional().isMongoId().withMessage("El proveedor debe ser un ID válido"),
            validationResult_1.validarCampos,
        ], controller.updateSupplierCurrentAccount);
        router.delete("/:id", [
            (0, express_validator_1.body)("id").optional().isMongoId().withMessage("El ID debe ser un ID válido"),
            validationResult_1.validarCampos,
        ], controller.deleteSupplierCurrentAccount);
        return router;
    }
}
exports.SupplierCurrentAccountRoutes = SupplierCurrentAccountRoutes;
//# sourceMappingURL=routes.js.map