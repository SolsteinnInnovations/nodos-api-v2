import { Router } from "express";
import { body, param } from "express-validator";
import { validarCampos } from "../../middlewares/validationResult";
import {  ProductSucursalController } from "./controller";


export class ProducSucursaltroutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductSucursalController();

    // Definir las rutas

     router.post(
      "/",
      [
        body("*.productoId", "El productoId es obligatorio").notEmpty().isMongoId(),
        body("*.sucursalId", "El sucursalId es obligatorio").notEmpty().isMongoId(),
        body("*.stock", "El stock es obligatorio").notEmpty().isInt({ gt: 0 }),
        body("*.precioCosto", "El precioCosto es obligatorio").notEmpty().isFloat({ gt: 0 }),
        body("*.precioVentaSucursal", "El precioVentaSucursal es obligatorio").notEmpty().isFloat({ gt: 0 }),
        validarCampos,
      ],
      controller.createProductSucursal
    );

    // Obtener productos por sucursal
    router.get("/", controller.getProductsSucursal);
    router.get("/stock", controller.obtenerProductosConStockTotal);

    // Actualizar productoSucursal
    router.put(
      "/:id",
      [
        param("id", "ID inválido").isMongoId(),
        body("productoId").isMongoId(),
        body("sucursalId").isMongoId(),
        body("stock").optional().isInt({ gt: -1 }),
        body("precioCosto").optional().isFloat({ gt: 0 }),
        body("precioVentaSucursal").optional().isFloat({ gt: 0 }),
        validarCampos,
      ],
      controller.updateProductSucursal
    );

    // Eliminar productoSucursal
    router.delete(
      "/:id",
      [
        param("id", "ID inválido").isMongoId(), 
        validarCampos
      ],
      controller.deleteProductSucursal
    );



    return router;
  }
}
