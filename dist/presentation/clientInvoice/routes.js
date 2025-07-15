"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteInvoiceRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../../middlewares/validationResult");
const controller_1 = require("./controller");
class ClienteInvoiceRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ClientInvoiceController();
        // Crear un clienteInvoice
        router.post("/", [
            (0, express_validator_1.body)("numeroFactura", "El número de factura es obligatorio")
                .not()
                .isEmpty(),
            (0, express_validator_1.body)("descuento", "El descuento debe ser un número").isNumeric(),
            (0, express_validator_1.body)("recargo", "El recargo debe ser un número").isNumeric(),
            (0, express_validator_1.body)("metodosDePago", "El método de pago es obligatorio")
                .not()
                .isEmpty(),
            validationResult_1.validarCampos,
        ], controller.createClientInvoice);
        // Obtener todos los clienteInvoices
        router.get("/", controller.getAllClientInvoices);
        // Obtener todos los clienteInvoices de una sucursal
        router.get("/sucursal", controller.getAllClientInvoicesBySucursal);
        router.get("/unpaid", controller.getAllUnpaidClientInvoices);
        // Obtener un clienteInvoice por ID o término
        router.get("/:term", [
            (0, express_validator_1.param)("term", "El término debe ser un ID válido o un texto")
                .not()
                .isEmpty(),
            validationResult_1.validarCampos,
        ], controller.getOneClientInvoice);
        // Actualizar un clienteInvoice
        router.put("/:id", [
            (0, express_validator_1.param)("id", "El ID debe ser un ID válido").isMongoId(),
            (0, express_validator_1.body)("puntoVenta")
                .optional()
                .not()
                .isEmpty()
                .withMessage("El punto de venta no puede estar vacío"),
            (0, express_validator_1.body)("numeroFactura")
                .optional()
                .not()
                .isEmpty()
                .withMessage("El número de factura no puede estar vacío"),
            (0, express_validator_1.body)("descuento")
                .optional()
                .isNumeric()
                .withMessage("El descuento debe ser un número"),
            (0, express_validator_1.body)("recargo")
                .optional()
                .isNumeric()
                .withMessage("El recargo debe ser un número"),
            (0, express_validator_1.body)("metodosDePago")
                .optional()
                .not()
                .isEmpty()
                .withMessage("El método de pago no puede estar vacío"),
            validationResult_1.validarCampos,
        ], controller.updateClientInvoice);
        router.put("/:id/pay", controller.payClientInvoice);
        // Eliminar un clienteInvoice
        router.delete("/:id", [(0, express_validator_1.param)("id", "El ID debe ser un ID válido").isMongoId(), validationResult_1.validarCampos], controller.deleteClientInvoice);
        return router;
    }
}
exports.ClienteInvoiceRoutes = ClienteInvoiceRoutes;
//# sourceMappingURL=routes.js.map