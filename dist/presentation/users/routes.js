"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userRoleValidation_1 = require("../../middlewares/userRoleValidation");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.UserController();
        router.get("/clerk-users", controller.getClerkUsers);
        router.get("/clerk-users/:id", controller.getClerkUser);
        router.post("/clerk-users", [
            (0, express_validator_1.body)("name", "El nombre de la persona es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("password", "No ingresaste ninguna password").not().isEmpty(),
            (0, express_validator_1.body)("password", "La password debe ser alfanumerica").isAlphanumeric(),
            (0, express_validator_1.body)("password", "La password debe tener como minmo 8 caracternes").isLength({ min: 8 }),
            (0, express_validator_1.body)("email", "El email es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("email", "El email ingresado es incorrecto").isEmail(),
            (0, express_validator_1.body)("roles", "No ingresaste ningun rol").not().isEmpty().isArray(),
            (0, express_validator_1.body)("permisos", "No ingresaste ningun permiso").not().isEmpty().isArray(),
            validationResult_1.validarCampos
        ], controller.postUser);
        // router.patch('/:id',  controller.updateUser);
        router.get("/:id", [], controller.getUser);
        router.get("/", [], controller.getUsers);
        router.delete("/:username", controller.deleteUser);
        // router.get("/", [  ], controller.getClerkUsers);
        router.put("/:username", [], controller.updateUser);
        router.post("/register", [
            (0, userRoleValidation_1.validarAdminRole)("Admin"),
            (0, express_validator_1.body)("email", "El correo es obligatorio").isEmail(),
            (0, express_validator_1.body)("username", "El usuario es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("username", "El usuario debe tener 8 caracteres como minimo").isLength({ min: 5 }),
            (0, express_validator_1.body)("username", "El password es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("password", "El password debe tener 8 caracteres como minimo").isLength({ min: 8 }),
            // validarAdminRole, ! No sería  en el login?
            validationResult_1.validarCampos,
        ], controller.registerUser);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=routes.js.map