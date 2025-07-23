import { Router } from "express";
import { body } from "express-validator";
import { PermissionController } from "./controller";
import { validarCampos } from "../../middlewares/validationResult";

export class PermissionRoutes {
  public static get routes(): Router {
    const router = Router();
    const controller = new PermissionController();
    // Definir las rutas

    router.post(
      "/",
      [body("nombre", "El name es obligatorio").not().isEmpty(), validarCampos],
      controller.createPermission
    );
    router.get("/", controller.getPermissions);
    router.get("/:id", controller.getPermission);
    router.put(
      "/:id",
      [
        body("nombre", "El name es obligatorio").not().isEmpty().optional(),
        validarCampos,
      ],
      controller.updatePermission
    );
    router.delete("/:id", controller.deletePermission);

    return router;
  }
}
