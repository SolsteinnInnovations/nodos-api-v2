"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../../middlewares/validationResult");
const controller_1 = require("./controller");
class ClientRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ClientController();
        router.post("/", [
            (0, express_validator_1.body)("nombre", "El nombre es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("nombre", "El nombre debe tener 3 caracteres como mínimo").isLength({ min: 3 }),
            (0, express_validator_1.body)("apellido", "El apellido es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("apellido", "El apellido debe tener 3 caracteres como mínimo").isLength({ min: 3 }),
            validationResult_1.validarCampos,
        ], controller.createClient);
        router.get("/", controller.getClients);
        router.get("/:term", controller.getClient);
        router.put("/:id", [
            (0, express_validator_1.body)("nombre")
                .optional()
                .isLength({ min: 3 })
                .withMessage("El nombre debe tener 3 caracteres como mínimo"),
            (0, express_validator_1.body)("apellido")
                .optional()
                .isLength({ min: 3 })
                .withMessage("El apellido debe tener 3 caracteres como mínimo"),
            (0, express_validator_1.body)("cuitCuil")
                .optional()
                .isLength({ min: 11, max: 11 })
                .withMessage("El cuit/cuil debe tener exactamente 11 caracteres"),
            (0, express_validator_1.body)("domicilio")
                .optional()
                .not()
                .isEmpty()
                .withMessage("El domicilio no puede estar vacío"),
            (0, express_validator_1.body)("telefono")
                .optional()
                .not()
                .isEmpty()
                .withMessage("El teléfono debe ser un número válido"),
            (0, express_validator_1.body)("email")
                .optional()
                .isEmail()
                .withMessage("El email debe ser un correo válido"),
            (0, express_validator_1.body)("provincia")
                .optional()
                .not()
                .isEmpty()
                .withMessage("La provincia no puede estar vacía"),
            (0, express_validator_1.body)("localidad")
                .optional()
                .not()
                .isEmpty()
                .withMessage("La localidad no puede estar vacía"),
            validationResult_1.validarCampos,
        ], controller.updateClient);
        router.delete("/:id", 
        // validarAdminRole,
        controller.deleteClient);
        return router;
    }
}
exports.ClientRoutes = ClientRoutes;
//# sourceMappingURL=routes.js.map