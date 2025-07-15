"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const routes_1 = require("./productSucursal/routes");
const routes_2 = require("./supplierCurrentAccount/routes");
const express_1 = require("express");
const routes_3 = require("./auth/routes");
const routes_4 = require("./products/routes");
const routes_5 = require("./users/routes");
const routes_6 = require("./sucursales/routes");
const routes_7 = require("./suppliers/routes");
const routes_8 = require("./clients/routes");
const routes_9 = require("./brand/routes");
const routes_10 = require("./organization/routes");
const validationResult_1 = require("../middlewares/validationResult");
const jwt_1 = require("../middlewares/jwt");
const routes_11 = require("./category/routes");
const routes_12 = require("./clientInvoice/routes");
const routes_13 = require("./supplierInvoice/routes");
const routes_14 = require("./clientCurrentAccount/routes");
const routes_15 = require("./returns/routes");
const routes_16 = require("./dailyCash/routes");
const routes_17 = require("./person/routes");
const routes_18 = require("./confiscationProduct/routes");
const routes_19 = require("./kit/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/v1/auth", routes_3.Authroutes.routes);
        router.use(jwt_1.authenticateUser);
        // Las rutas que requieren autenticación
        router.use("/api/v1/product", [validationResult_1.validarCampos], routes_4.Productroutes.routes);
        //TODO falta agregar el username en la ruta y el usuario creado y tambien el email en la creación, validar tambien catidad maxima para esa orgnaizaicon de usuarios
        router.use("/api/v1/user", routes_5.UserRoutes.routes);
        router.use("/api/v1/sucursal", routes_6.SucursalRoutes.routes);
        router.use("/api/v1/client", routes_8.ClientRoutes.routes);
        router.use("/api/v1/supplier", routes_7.SupplierRoutes.routes);
        router.use("/api/v1/brand", routes_9.BrandRoutes.routes);
        router.use("/api/v1/organization", routes_10.OrganizationRoutes.routes);
        router.use("/api/v1/category", routes_11.CategoryRoutes.routes);
        router.use("/api/v1/clientinvoice", routes_12.ClienteInvoiceRoutes.routes);
        router.use("/api/v1/supplierinvoice", routes_13.SupplierInvoiceRoutes.routes);
        router.use("/api/v1/clientcurrentaccount", routes_14.ClientCurrentAccountRoutes.routes);
        router.use("/api/v1/suppliercurrentaccount", routes_2.SupplierCurrentAccountRoutes.routes);
        router.use("/api/v1/dailyCash", routes_16.DailyCashRoutes.routes);
        router.use("/api/v1/person", routes_17.PersonRoutes.routes);
        //TODO: revisra el "aftercreate" (put)
        router.use("/api/v1/returns", routes_15.ReturnsRoutes.routes);
        //TODO: revisar el "aftercreate"
        router.use("/api/v1/confiscationproduct", routes_18.ConfiscationProductRoutes.routes);
        router.use('/api/v1/returns', routes_15.ReturnsRoutes.routes);
        router.use('/api/v1/kit', routes_19.KitRoutes.routes);
        // Rutas de productos por sucursal
        router.use("/api/v1/productsucursal", routes_1.ProducSucursaltroutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=routes.js.map