import { Router } from "express";
import { body } from "express-validator";
import { DailyCashController } from "./controller";
import { validarCampos } from "../../middlewares/validationResult";

export class DailyCashRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new DailyCashController();

    // Crear una nueva caja diaria
    router.post(
      "/",
      [
        body(
          "importeInicioCaja",
          "El importe inicial de la caja es obligatorio"
        ).isNumeric(),
        body(
          "fechaHoraInicio",
          "La fecha y hora de inicio es obligatoria"
        ).isISO8601(),

        validarCampos,
      ],
      controller.createDailyCash
    );

    // Obtener la última caja diaria
    router.get("/last", controller.getLastDailyCash);

    // Obtener todas las cajas diarias
    router.get("/", controller.getDailyCashes);

    // Obtener una caja diaria por ID
    router.get("/:id", controller.getDailyCash);

    // Actualizar una caja diaria
    router.put(
      "/:id",
      [
        body("importeInicioCaja", "El importe inicial debe ser numérico")
          .optional()
          .isNumeric(),
        body("fechaHoraCierre", "La fecha y hora de cierre debe ser válida")
          .optional()
          .isISO8601(),
        body("importeCierreCaja", "El importe de cierre debe ser numérico")
          .optional()
          .isNumeric(),
        validarCampos,
      ],
      controller.updateDailyCash
    );

    // Cerrar una caja diaria
    router.patch(
      "/:id/close",
      [
        body(
          "fechaHoraCierre",
          "La fecha y hora de cierre es obligatoria"
        ).isISO8601(),
        body(
          "importeCierreCaja",
          "El importe de cierre es obligatorio"
        ).isNumeric(),
        body(
          "validacionTotalEfectivo",
          "La validación del total en efectivo es obligatoria"
        ).isNumeric(),
        validarCampos,
      ],
      controller.closeDailyCash
    );

    router.patch(
      "/:id/transaction",
      [
        body("tipo", "El tipo es requerido").notEmpty().isIn(["Ingreso", "Egreso"]),
        body("monto", "El monto debe ser numérico").isNumeric(),
        body(
          "descripcion",
          "El tipo de transacción es requerido y debe ser 'Ingreso' o 'Egreso'"
        )
        ,
        validarCampos,
      ],
      controller.addTrasanctionToDailyCash
    );

    return router;
  }
}
