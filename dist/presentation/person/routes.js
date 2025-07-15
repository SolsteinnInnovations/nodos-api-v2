"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class PersonRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.PersonController();
        // Definir las rutas
        router.post("/", [
            (0, express_validator_1.body)("dni", "El dni es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("nombre", "El nombre es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("apellido", "El apellido es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("telefono", "El telefono es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("domicilio", "El domicilio es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("email", "El email es obligatorio").not().isEmpty(),
            (0, express_validator_1.body)("fechaNacimiento", "La fecha de nacimiento es obligatoria")
                .not()
                .isEmpty(),
            (0, express_validator_1.body)("organizacion", "La organización es obligatoria").not().isEmpty(),
            validationResult_1.validarCampos,
        ], controller.createPerson);
        router.get("/", controller.getPersons);
        router.get("/:term", controller.getPerson);
        router.put("/:term", [
            (0, express_validator_1.body)("dni", "El dni es obligatorio").not().isEmpty().optional(),
            (0, express_validator_1.body)("nombre", "El nombre es obligatorio").not().isEmpty().optional(),
            (0, express_validator_1.body)("apellido", "El apellido es obligatorio")
                .not()
                .isEmpty()
                .optional(),
            (0, express_validator_1.body)("telefono", "El telefono es obligatorio")
                .not()
                .isEmpty()
                .optional(),
            (0, express_validator_1.body)("domicilio", "El domicilio es obligatorio")
                .not()
                .isEmpty()
                .optional(),
            (0, express_validator_1.body)("email", "El email es obligatorio").not().isEmpty().optional(),
            (0, express_validator_1.body)("fechaNacimiento", "La fecha de nacimiento es obligatoria")
                .not()
                .isEmpty()
                .optional(),
            (0, express_validator_1.body)("organizacion", "La organización es obligatoria")
                .not()
                .isEmpty()
                .optional(),
            validationResult_1.validarCampos,
        ], controller.updatePerson);
        router.delete("/:term", controller.deletePerson);
        return router;
    }
}
exports.PersonRoutes = PersonRoutes;
//# sourceMappingURL=routes.js.map