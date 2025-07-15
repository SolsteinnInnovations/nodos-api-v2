import { Router } from "express";
import { body } from "express-validator";
import { PersonController } from "./controller";
import { validarCampos } from "../../middlewares/validationResult";

export class PersonRoutes {
  public static get routes(): Router {
    const router = Router();
    const controller = new PersonController();
    // Definir las rutas

    router.post(
      "/",
      [
        body("dni", "El dni es obligatorio").not().isEmpty(),
        body("nombre", "El nombre es obligatorio").not().isEmpty(),
        body("apellido", "El apellido es obligatorio").not().isEmpty(),
        body("telefono", "El telefono es obligatorio").not().isEmpty(),
        body("domicilio", "El domicilio es obligatorio").not().isEmpty(),
        body("email", "El email es obligatorio").not().isEmpty(),
        body("fechaNacimiento", "La fecha de nacimiento es obligatoria")
          .not()
          .isEmpty(),
        body("organizacion", "La organización es obligatoria").not().isEmpty(),
        validarCampos,
      ],
      controller.createPerson
    );

    router.get("/", controller.getPersons);

    router.get("/:term", controller.getPerson);

    router.put(
      "/:term",
      [
        body("dni", "El dni es obligatorio").not().isEmpty().optional(),
        body("nombre", "El nombre es obligatorio").not().isEmpty().optional(),
        body("apellido", "El apellido es obligatorio")
          .not()
          .isEmpty()
          .optional(),
        body("telefono", "El telefono es obligatorio")
          .not()
          .isEmpty()
          .optional(),
        body("domicilio", "El domicilio es obligatorio")
          .not()
          .isEmpty()
          .optional(),
        body("email", "El email es obligatorio").not().isEmpty().optional(),
        body("fechaNacimiento", "La fecha de nacimiento es obligatoria")
          .not()
          .isEmpty()
          .optional(),
        body("organizacion", "La organización es obligatoria")
          .not()
          .isEmpty()
          .optional(),
        validarCampos,
      ],
      controller.updatePerson
    );

    router.delete("/:term", controller.deletePerson);

    return router;
  }
}
