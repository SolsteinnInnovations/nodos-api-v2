import { Router } from "express";
import { body } from "express-validator";
import { validarAdminRole } from "../../middlewares/userRoleValidation";
import { UserController } from "./controller";
import { validarCampos } from "../../middlewares/validationResult";


export class UserRoutes {
  static get routes(): Router {
    
    const router = Router();
    const controller = new UserController();
  
    router.get("/clerk-users", controller.getClerkUsers);
    router.get("/clerk-users/:id", controller.getClerkUser);
    router.post("/clerk-users",[
      body("name", "El nombre de la persona es obligatorio").not().isEmpty(),
      body("password", "No ingresaste ninguna password").not().isEmpty(),
      body("password", "La password debe ser alfanumerica").isAlphanumeric(),
      body("password", "La password debe tener como minmo 8 caracternes").isLength({min:8}),
      body("email", "El email es obligatorio").not().isEmpty(),
      body("email", "El email ingresado es incorrecto").isEmail(),
      body("roles", "No ingresaste ningun rol").not().isEmpty().isArray(),
      body("permisos", "No ingresaste ningun permiso").not().isEmpty().isArray(),
      validarCampos
    ],controller.postUser)
    // router.patch('/:id',  controller.updateUser);
    router.get("/:id", [], controller.getUser);
    router.get("/", [  ], controller.getUsers);
    router.delete("/:username", controller.deleteUser);
    // router.get("/", [  ], controller.getClerkUsers);
    router.put("/:username", [  ], controller.updateUser);
    
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


