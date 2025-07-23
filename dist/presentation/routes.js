"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const validationResult_1 = require("../middlewares/validationResult");
const jwt_1 = require("../middlewares/jwt");
const routes_1 = require("./dailyCash/routes");
const routes_2 = require("./productSucursal/routes");
const routes_3 = require("./auth/routes");
const routes_4 = require("./products/routes");
const routes_5 = require("./users/routes");
const routes_6 = require("./sucursales/routes");
const routes_7 = require("./clientInvoice/routes");
const routes_8 = require("./clients/routes");
const routes_9 = require("./person/routes");
const routes_10 = require("./permission/routes");
const routes_11 = require("./suppliers/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/v1/auth", routes_3.Authroutes.routes);
        router.use(jwt_1.authenticateUser);
        // Las rutas que requieren autenticación
        router.use("/api/v1/product", [validationResult_1.validarCampos], routes_4.Productroutes.routes);
        router.use("/api/v1/user", routes_5.UserRoutes.routes);
        router.use("/api/v1/sucursal", routes_6.SucursalRoutes.routes);
        router.use("/api/v1/client", routes_8.ClientRoutes.routes);
        router.use("/api/v1/clientinvoice", routes_7.ClienteInvoiceRoutes.routes);
        router.use("/api/v1/person", routes_9.PersonRoutes.routes);
        router.use("/api/v1/dailycash", routes_1.DailyCashRoutes.routes);
        // Rutas de productos por sucursal
        router.use("/api/v1/productsucursal", routes_2.ProducSucursaltroutes.routes);
        // Rutas de permisos
        router.use("/api/v1/permission", routes_10.PermissionRoutes.routes);
        // Rutas de proveedores
        router.use("/api/v1/supplier", routes_11.SupplierRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=routes.js.map