import { Router } from "express";
import { body } from "express-validator";
import { SupplierController } from "./controller";
import { validarCampos } from "../../middlewares/validationResult";

export class SupplierRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new SupplierController();

    router.post(
      "/",
      [ 
        body("razonSocial", "La razón social es obligatoria").not().isEmpty(),
        body("cuit", "El CUIT es obligatorio").not().isEmpty(),
        validarCampos,
      ],
      controller.createSupplier
    );
    router.get("/", controller.getSuppliers);
    router.get("/:term", controller.getSupplier);

    router.put(
      "/:id",
      [
        body("razonSocial", "La razón social es obligatoria").not().isEmpty(),
        body("cuit", "El CUIT es obligatorio").optional().not().isEmpty(),
        body("email", "El email es obligatorio").optional().not().isEmpty(),
        body("telefono", "El teléfono es obligatorio").optional().not().isEmpty(),
        body("domicilio", "El domicilio es obligatorio").optional().not().isEmpty(),
        body("localidad", "La localidad es obligatoria").optional().not().isEmpty(),
        validarCampos,
      ],
      controller.updateSupplier
    );

    // router.patch(
    //   "/:id",
    //   [
    //     body("razonSocial")
    //       .optional()
    //       .isLength({ min: 3 })
    //       .withMessage("La razón social debe tener 3 caracteres como mínimo"),
    //     body("cuit")
    //       .optional()
    //       .isLength({ min: 11, max: 11 })
    //       .withMessage("El CUIT debe tener 11 caracteres"),
    //     body("email")
    //       .optional()
    //       .isEmail()
    //       .withMessage("El email no es válido"),
    //     validarCampos,
    //   ],
    //   controller.updateSupplierPatch
    // );

    router.delete('/:id', controller.deleteSupplier);
    return router;
  }
}
