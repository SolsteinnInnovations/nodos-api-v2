import { Router } from "express";
import { body, param } from "express-validator";
import { validarCampos } from "../../middlewares/validationResult";
import { ClientInvoiceController } from "./controller";

export class ClienteInvoiceRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClientInvoiceController();

    // Crear un clienteInvoice
    router.post(
      "/",
      [
        body("numeroFactura", "El número de factura es obligatorio")
          .not()
          .isEmpty(),
        body("descuento", "El descuento debe ser un número").isNumeric(),
        body("recargo", "El recargo debe ser un número").isNumeric(),
        body("metodosDePago", "El método de pago es obligatorio")
          .not()
          .isEmpty(),

        validarCampos,
      ],
      controller.createClientInvoice
    );

    // Obtener todos los clienteInvoices
    router.get("/", controller.getAllClientInvoices);
    // Obtener todos los clienteInvoices de una sucursal
    router.get("/sucursal", controller.getAllClientInvoicesBySucursal);

    router.get("/unpaid", controller.getAllUnpaidClientInvoices);

    // Obtener un clienteInvoice por ID o término
    router.get(
      "/:term",
      [
        param("term", "El término debe ser un ID válido o un texto")
          .not()
          .isEmpty(),
        validarCampos,
      ],
      controller.getOneClientInvoice
    );

    // Actualizar un clienteInvoice
    router.put(
      "/:id",
      [
        param("id", "El ID debe ser un ID válido").isMongoId(),
        body("puntoVenta")
          .optional()
          .not()
          .isEmpty()
          .withMessage("El punto de venta no puede estar vacío"),
        body("numeroFactura")
          .optional()
          .not()
          .isEmpty()
          .withMessage("El número de factura no puede estar vacío"),
        body("descuento")
          .optional()
          .isNumeric()
          .withMessage("El descuento debe ser un número"),
        body("recargo")
          .optional()
          .isNumeric()
          .withMessage("El recargo debe ser un número"),
        body("metodosDePago")
          .optional()
          .not()
          .isEmpty()
          .withMessage("El método de pago no puede estar vacío"),

        validarCampos,
      ],
      controller.updateClientInvoice
    );

    router.put("/:id/pay", controller.payClientInvoice);

    // Eliminar un clienteInvoice
    router.delete(
      "/:id",
      [param("id", "El ID debe ser un ID válido").isMongoId(), validarCampos],
      controller.deleteClientInvoice
    );

    return router;
  }
}
