"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SucursalRoutes = void 0;
const express_1 = require("express");
class SucursalRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // const controller = new SucursalController();
        // router.post("/",[
        // body("descripcion", "La descripción es obligatoria").not().isEmpty(),
        // body("direccion", "La dirección es obligatoria").not().isEmpty(),
        // body("direccion", "La dirección no puede tener más de 50 caracteres").isLength({ max: 50 }),
        //  validarCampos,
        // ],controller.createSucursal);
        // router.get("/",controller.getSucursales);
        // router.get("/:id",controller.getSucursal);
        // router.put("/:id", [
        //     body("descripcion", "La descripción es obligatoria").not().isEmpty().optional(),
        //     body("direccion", "La dirección no puede tener más de 50 caracteres").isLength({ max: 50 }).optional(),
        //      validarCampos,
        //     ],controller.updateSucursal);
        // router.patch("/:id",controller.updateSucursal);
        // router.delete("/:id",controller.deleteSucursal);
        return router;
    }
}
exports.SucursalRoutes = SucursalRoutes;
//# sourceMappingURL=routes.js.map