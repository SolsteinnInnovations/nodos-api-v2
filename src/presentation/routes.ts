import { Router } from "express";

import { validarCampos } from "../middlewares/validationResult";
import { authenticateUser } from "../middlewares/jwt";
import { DailyCashRoutes } from "./dailyCash/routes";
import { ProducSucursaltroutes } from './productSucursal/routes';
import { Authroutes } from "./auth/routes";
import { Productroutes } from "./products/routes";
import { UserRoutes } from "./users/routes";
import { SucursalRoutes } from "./sucursales/routes";
import { ClienteInvoiceRoutes } from "./clientInvoice/routes";
import { ClientRoutes } from "./clients/routes";
import { PersonRoutes } from "./person/routes";
import { PermissionRoutes } from "./permission/routes";


export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/auth", Authroutes.routes);

    router.use(authenticateUser);

    // Las rutas que requieren autenticación
    router.use(
      "/api/v1/product",
      [ validarCampos],
      Productroutes.routes
    );
    
    router.use("/api/v1/user", UserRoutes.routes);
    router.use("/api/v1/sucursal", SucursalRoutes.routes);
    router.use("/api/v1/client", ClientRoutes.routes);
    router.use("/api/v1/clientinvoice", ClienteInvoiceRoutes.routes);
    router.use("/api/v1/person", PersonRoutes.routes);
    router.use("/api/v1/dailycash", DailyCashRoutes.routes);

    // Rutas de productos por sucursal
    router.use(
      "/api/v1/productsucursal",
      ProducSucursaltroutes.routes
    );
    // Rutas de permisos
    router.use("/api/v1/permission", PermissionRoutes.routes);

  
    return router;
  }
}
