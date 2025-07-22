"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("./controller");
const validationResult_1 = require("../../middlewares/validationResult");
class PermissionRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.PermissionController();
        // Definir las rutas
        router.post("/", [(0, express_validator_1.body)("nombre", "El name es obligatorio").not().isEmpty(), validationResult_1.validarCampos], controller.createPermission);
        router.get("/", controller.getPermissions);
        router.get("/:id", controller.getPermission);
        router.put("/:id", [
            (0, express_validator_1.body)("nombre", "El name es obligatorio").not().isEmpty().optional(),
            validationResult_1.validarCampos,
        ], controller.updatePermission);
        router.delete("/:id", controller.deletePermission);
        return router;
    }
}
exports.PermissionRoutes = PermissionRoutes;
//# sourceMappingURL=routes.js.map