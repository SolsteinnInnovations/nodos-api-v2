"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const validationResult_1 = require("../middlewares/validationResult");
const jwt_1 = require("../middlewares/jwt");
const routes_1 = require("./productSucursal/routes");
const routes_2 = require("./auth/routes");
const routes_3 = require("./products/routes");
const routes_4 = require("./users/routes");
const routes_5 = require("./sucursales/routes");
const routes_6 = require("./clientInvoice/routes");
const routes_7 = require("./person/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/v1/auth", routes_2.Authroutes.routes);
        router.use(jwt_1.authenticateUser);
        // Las rutas que requieren autenticación
        router.use("/api/v1/product", [validationResult_1.validarCampos], routes_3.Productroutes.routes);
        //TODO falta agregar el username en la ruta y el usuario creado y tambien el email en la creación, validar tambien catidad maxima para esa orgnaizaicon de usuarios
        router.use("/api/v1/user", routes_4.UserRoutes.routes);
        router.use("/api/v1/sucursal", routes_5.SucursalRoutes.routes);
        router.use("/api/v1/clientinvoice", routes_6.ClienteInvoiceRoutes.routes);
        router.use("/api/v1/person", routes_7.PersonRoutes.routes);
        //TODO: revisra el "aftercreate" (put)
        //TODO: revisar el "aftercreate"
        // Rutas de productos por sucursal
        router.use("/api/v1/productsucursal", routes_1.ProducSucursaltroutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=routes.js.map