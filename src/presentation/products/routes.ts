import { Router } from "express";
import { body, param } from "express-validator";
import { ProductController } from "./controller";
import { validarCampos } from "../../middlewares/validationResult";
import { fileValidation } from "../../middlewares/fileValidation";

export class Productroutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductController();

    // Definir las rutas

    router.post(
      "/",
      [
        body("*.codigo", "El código es obligatorio").not().isEmpty(),
        body("*.nombre", "El nombre es obligatorio").not().isEmpty(),
        body("*.nombre", "El nombre debe tener 3 caracteres como minimo").isLength({ min: 3 }),
        body("*.precioVenta", "El precio de venta es obligatorio").not().isEmpty(),
        body("*.precioLista", "El precio de lista es obligatorio").not().isEmpty(),
        body("*.poseeIva", "El campo poseeIva es obligatorio").not().isEmpty(),
        body("*.categoria", "El campo categoria es obligatorio").not().isEmpty(),
        body("*.marca", "El campo marca es obligatorio").not().isEmpty(),
        body("*.iva")
          .optional()
          .isFloat({gt:0}).withMessage("El campo iva debe ser mayor a 0"),
      
        validarCampos,
      ],

      controller.createProduct
    );

    // router.post("/bulk-upload",
    //   [
    //     fileValidation("xlsx"),
    //     validarCampos
    //   ],
    //   controller.bulkUploadProducts
    // )

    router.get("/", controller.getProducts);
    router.get("/low", controller.lowStockProducts);
    router.get("/:term", controller.getProduct);

    router.put(
      "/:id",
      [
        param('id').isMongoId().withMessage('ID inválido'),
        body("codigo", "El código es obligatorio").not().isEmpty().optional(),
        body("nombre", "El nombre es obligatorio").not().isEmpty().optional(),
        body("nombre", "El nombre debe tener 3 caracteres como minimo").isLength({ min: 3 }).optional(),
        body("precioVenta", "El precio de venta es obligatorio").not().isEmpty().optional(),
        body("precioLista", "El precio de lista es obligatorio").not().isEmpty().optional(),
        body("poseeIva", "El campo poseeIva es obligatorio").not().isEmpty().optional(),
        validarCampos,
      ],
      controller.updateProduct
    );
    router.delete('/:id', controller.deleteProduct);



    return router;
  }
}
