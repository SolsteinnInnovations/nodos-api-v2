"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class SupplierRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.SupplierController();
        router.post("/", [
            (0, express_validator_1.body)("razonSocial", "La razón social es obligatoria").not().isEmpty(),
            (0, express_validator_1.body)("cuit", "El CUIT es obligatorio").not().isEmpty(),
            validationResult_1.validarCampos,
        ], controller.createSupplier);
        router.get("/", controller.getSuppliers);
        router.get("/:term", controller.getSupplier);
        router.put("/:id", [
            (0, express_validator_1.body)("razonSocial", "La razón social es obligatoria").not().isEmpty(),
            (0, express_validator_1.body)("cuit", "El CUIT es obligatorio").optional().not().isEmpty(),
            (0, express_validator_1.body)("email", "El email es obligatorio").optional().not().isEmpty(),
            (0, express_validator_1.body)("telefono", "El teléfono es obligatorio").optional().not().isEmpty(),
            (0, express_validator_1.body)("domicilio", "El domicilio es obligatorio").optional().not().isEmpty(),
            (0, express_validator_1.body)("localidad", "La localidad es obligatoria").optional().not().isEmpty(),
            validationResult_1.validarCampos,
        ], controller.updateSupplier);
        // router.patch(
        //   "/:id",
        //   [
        //     body("razonSocial")
        //       .optional()
        //       .isLength({ min: 3 })
        //       .withMessage("La razón social debe tener 3 caracteres como mínimo"),
        //     body("cuit")
        //       .optional()
        //       .isLength({ min: 11, max: 11 })
        //       .withMessage("El CUIT debe tener 11 caracteres"),
        //     body("email")
        //       .optional()
        //       .isEmail()
        //       .withMessage("El email no es válido"),
        //     validarCampos,
        //   ],
        //   controller.updateSupplierPatch
        // );
        router.delete('/:id', controller.deleteSupplier);
        return router;
    }
}
exports.SupplierRoutes = SupplierRoutes;
//# sourceMappingURL=routes.js.map