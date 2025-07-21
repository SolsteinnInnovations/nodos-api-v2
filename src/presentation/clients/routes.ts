import { Router } from "express";
import { body } from "express-validator";
import { validarCampos } from "../../middlewares/validationResult";
import { ClientController } from "./controller";

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ClientController();

    router.post(
      "/",
      [
        body("nombre", "El nombre es obligatorio").not().isEmpty(),
        body(
          "nombre",
          "El nombre debe tener 3 caracteres como mínimo"
        ).isLength({ min: 3 }),
        body("apellido", "El apellido es obligatorio").not().isEmpty(),
        body(
          "apellido",
          "El apellido debe tener 3 caracteres como mínimo"
        ).isLength({ min: 3 }),
        validarCampos,
      ],
      controller.createClient
    );
    router.get("/", controller.getClients);
    router.get("/:term", controller.getClient);
    router.put(
      "/:id",
      [
        body("nombre")
          .optional()
          .isLength({ min: 3 })
          .withMessage("El nombre debe tener 3 caracteres como mínimo"),
        body("apellido")
          .optional()
          .isLength({ min: 3 })
          .withMessage("El apellido debe tener 3 caracteres como mínimo"),
        body("cuitCuil")
          .optional()
          .isLength({ min: 11, max: 11 })
          .withMessage("El cuit/cuil debe tener exactamente 11 caracteres"),
        body("domicilio")
          .optional()
          .not()
          .isEmpty()
          .withMessage("El domicilio no puede estar vacío"),
        body("telefono")
          .optional()
          .not()
          .isEmpty()
          .withMessage("El teléfono debe ser un número válido"),
        body("email")
          .optional()
          .isEmail()
          .withMessage("El email debe ser un correo válido"),
        body("provincia")
          .optional()
          .not()
          .isEmpty()
          .withMessage("La provincia no puede estar vacía"),
        body("localidad")
          .optional()
          .not()
          .isEmpty()
          .withMessage("La localidad no puede estar vacía"),
        validarCampos,
      ],
      controller.updateClient
    );
    router.delete(
      "/:id",
      // validarAdminRole,
      controller.deleteClient
    );

    return router;
  }
}
