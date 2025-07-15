"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class SupplierInvoiceRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.SupplierInvoiceController();
        router.post("/", [
            (0, express_validator_1.body)("idProveedor", "El ID del proveedor es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("estado", "El estado es obligatorio").isBoolean(),
            (0, express_validator_1.body)("fechaPago", "La fecha de pago es obligatoria").isISO8601(),
            (0, express_validator_1.body)("numeroFactura", "El número de factura es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("cantidadTotal", "La cantidad total es obligatoria").isNumeric(),
            (0, express_validator_1.body)("importe", "El importe es obligatorio").isNumeric(),
            (0, express_validator_1.body)("fechaFactura", "La fecha de la factura es obligatoria").isISO8601(),
            (0, express_validator_1.body)("items", "Los items son obligatorios").isArray(),
            (0, express_validator_1.body)("idSucursal", "El ID de la sucursal es obligatorio").optional().not().isEmpty(),
            validationResult_1.validarCampos,
        ], controller.createSupplierInvoice);
        // Obtener todas las facturas de proveedores
        router.get("/", controller.getSupplierInvoices);
        // Obtener una factura de proveedor por ID o término
        router.get("/:term", controller.getSupplierInvoice);
        // Actualizar una factura de proveedor
        router.put("/:id", [
            (0, express_validator_1.body)("estado", "El estado es obligatorio").optional().isBoolean(),
            (0, express_validator_1.body)("fechaPago", "La fecha de pago debe ser válida").optional().isISO8601(),
            (0, express_validator_1.body)("numeroFactura", "El número de factura es obligatorio").optional().not().isEmpty(),
            (0, express_validator_1.body)("cantidadTotal", "La cantidad total debe ser numérica").optional().isNumeric(),
            (0, express_validator_1.body)("importe", "El importe debe ser numérico").optional().isNumeric(),
            (0, express_validator_1.body)("fechaFactura", "La fecha de la factura debe ser válida").optional().isISO8601(),
            (0, express_validator_1.body)("items", "Los items deben ser un array").optional().isArray(),
            (0, express_validator_1.body)("idSucursal", "El ID de la sucursal es obligatorio").optional().not().isEmpty(),
            validationResult_1.validarCampos,
        ], controller.updateSupplierInvoice);
        // Eliminar una factura de proveedor
        router.delete("/:id", controller.deleteSupplierInvoice);
        return router;
    }
}
exports.SupplierInvoiceRoutes = SupplierInvoiceRoutes;
//# sourceMappingURL=routes.js.map