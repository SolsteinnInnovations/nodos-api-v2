"use strict";
// import { Router } from "express";
// import { body } from "express-validator";
// import { SupplierInvoiceController } from "./controller";
// import { validarCampos } from "../../middlewares/validationResult";
Object.defineProperty(exports, "__esModule", { value: true });
// export class SupplierInvoiceRoutes {
//   static get routes(): Router {
//     const router = Router();
//     const controller = new SupplierInvoiceController();
//     router.post(
//       "/",
//       [
//         body("idProveedor", "El ID del proveedor es obligatorio").not().isEmpty(),
//         body("estado", "El estado es obligatorio").isBoolean(),
//         body("fechaPago", "La fecha de pago es obligatoria").isISO8601(),
//         body("numeroFactura", "El número de factura es obligatorio").not().isEmpty(),
//         body("cantidadTotal", "La cantidad total es obligatoria").isNumeric(),
//         body("importe", "El importe es obligatorio").isNumeric(),
//         body("fechaFactura", "La fecha de la factura es obligatoria").isISO8601(),
//         body("items", "Los items son obligatorios").isArray(),
//         body("idSucursal", "El ID de la sucursal es obligatorio").optional().not().isEmpty(),
//         validarCampos,
//       ],
//       controller.createSupplierInvoice
//     );
//     // Obtener todas las facturas de proveedores
//     router.get("/", controller.getSupplierInvoices);
//     // Obtener una factura de proveedor por ID o término
//     router.get("/:term", controller.getSupplierInvoice);
//     // Actualizar una factura de proveedor
//     router.put(
//       "/:id",
//       [
//         body("estado", "El estado es obligatorio").optional().isBoolean(),
//         body("fechaPago", "La fecha de pago debe ser válida").optional().isISO8601(),
//         body("numeroFactura", "El número de factura es obligatorio").optional().not().isEmpty(),
//         body("cantidadTotal", "La cantidad total debe ser numérica").optional().isNumeric(),
//         body("importe", "El importe debe ser numérico").optional().isNumeric(),
//         body("fechaFactura", "La fecha de la factura debe ser válida").optional().isISO8601(),
//         body("items", "Los items deben ser un array").optional().isArray(),
//         body("idSucursal", "El ID de la sucursal es obligatorio").optional().not().isEmpty(),
//         validarCampos,
//       ],
//       controller.updateSupplierInvoice
//     );
//     // Eliminar una factura de proveedor
//     router.delete("/:id", controller.deleteSupplierInvoice);
//     return router;
//   }
// }
//# sourceMappingURL=routes.js.map