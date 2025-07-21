import { Router } from "express";
import { body } from "express-validator";
import { validarAdminRole } from "../../middlewares/userRoleValidation";
import { UserController } from "./controller";
import { validarCampos } from "../../middlewares/validationResult";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UserController();

    router.get("/", controller.getClerkUsers);
    router.get("/:id", controller.getClerkUser);

    //TO DO: DELETE USER EN CLERK YA QUE EL DELETE LE PEGA A MONGO Y NO A CLERK
    // router.delete("/:username", controller.deleteUser);

    router.put("/:username", [], controller.updateUser);

    router.post(
      "/register",
      [
        validarAdminRole("Admin"),
        body("email", "El correo es obligatorio").isEmail(),
        body("username", "El usuario es obligatorio").not().isEmpty(),
        body(
          "username",
          "El usuario debe tener 8 caracteres como minimo"
        ).isLength({ min: 5 }),
        body("username", "El password es obligatorio").not().isEmpty(),
        body(
          "password",
          "El password debe tener 8 caracteres como minimo"
        ).isLength({ min: 8 }),
        // validarAdminRole, ! No sería  en el login?
        validarCampos,
      ],
      controller.registerUser
    );

    return router;
  }
}
