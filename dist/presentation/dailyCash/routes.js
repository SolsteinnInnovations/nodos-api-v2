"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyCashRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class DailyCashRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.DailyCashController();
        // Crear una nueva caja diaria
        router.post("/", [
            (0, express_validator_1.body)("importeInicioCaja", "El importe inicial de la caja es obligatorio").isNumeric(),
            (0, express_validator_1.body)("fechaHoraInicio", "La fecha y hora de inicio es obligatoria").isISO8601(),
            validationResult_1.validarCampos,
        ], controller.createDailyCash);
        // Obtener la última caja diaria
        router.get("/last", controller.getLastDailyCash);
        // Obtener todas las cajas diarias
        router.get("/", controller.getDailyCashes);
        // Obtener una caja diaria por ID
        router.get("/:id", controller.getDailyCash);
        // Actualizar una caja diaria
        router.put("/:id", [
            (0, express_validator_1.body)("importeInicioCaja", "El importe inicial debe ser numérico")
                .optional()
                .isNumeric(),
            (0, express_validator_1.body)("fechaHoraCierre", "La fecha y hora de cierre debe ser válida")
                .optional()
                .isISO8601(),
            (0, express_validator_1.body)("importeCierreCaja", "El importe de cierre debe ser numérico")
                .optional()
                .isNumeric(),
            validationResult_1.validarCampos,
        ], controller.updateDailyCash);
        // Cerrar una caja diaria
        router.patch("/:id/close", [
            (0, express_validator_1.body)("fechaHoraCierre", "La fecha y hora de cierre es obligatoria").isISO8601(),
            (0, express_validator_1.body)("importeCierreCaja", "El importe de cierre es obligatorio").isNumeric(),
            (0, express_validator_1.body)("validacionTotalEfectivo", "La validación del total en efectivo es obligatoria").isNumeric(),
            validationResult_1.validarCampos,
        ], controller.closeDailyCash);
        router.patch("/:id/transaction", [
            (0, express_validator_1.body)("tipo", "El tipo es requerido").notEmpty().isIn(["Ingreso", "Egreso"]),
            (0, express_validator_1.body)("monto", "El monto debe ser numérico").isNumeric(),
            (0, express_validator_1.body)("descripcion", "El tipo de transacción es requerido y debe ser 'Ingreso' o 'Egreso'"),
            validationResult_1.validarCampos,
        ], controller.addTrasanctionToDailyCash);
        return router;
    }
}
exports.DailyCashRoutes = DailyCashRoutes;
//# sourceMappingURL=routes.js.map