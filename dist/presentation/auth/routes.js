"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authroutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../../middlewares/validationResult");
class Authroutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.AuthController();
        // Definir las rutas
        router.post("/login", [
            // validarAdminRole,
            (0, express_validator_1.body)("email", "El correo es obligatorio").isEmail(),
            (0, express_validator_1.body)("password", "El password debe tener 5 caracteres como minimo").isLength({ min: 5 }),
            validationResult_1.validarCampos,
        ], controller.loginUser);
        return router;
    }
}
exports.Authroutes = Authroutes;
//# sourceMappingURL=routes.js.map