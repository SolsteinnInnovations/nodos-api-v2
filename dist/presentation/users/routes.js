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
        router.get("/", controller.getClerkUsers);
        router.get("/:id", controller.getClerkUser);
        //TO DO: DELETE USER EN CLERK YA QUE EL DELETE LE PEGA A MONGO Y NO A CLERK
        // router.delete("/:username", controller.deleteUser);
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