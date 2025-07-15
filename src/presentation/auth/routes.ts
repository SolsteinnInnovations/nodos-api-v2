import { Router } from "express";
import { AuthController } from "./controller";
import { body } from "express-validator";
import { validarCampos } from "../../middlewares/validationResult";
import { validarAdminRole } from "../../middlewares/userRoleValidation";

export class Authroutes {
  static get routes(): Router {
    const router = Router();

    const controller = new AuthController();

    // Definir las rutas
    router.post(
      "/login",
      [
        // validarAdminRole,
        body("email", "El correo es obligatorio").isEmail(),
        body(
          "password",
          "El password debe tener 5 caracteres como minimo"
        ).isLength({ min: 5 }),
        validarCampos,
      ],
      controller.loginUser
    );

    return router;
  }
}
