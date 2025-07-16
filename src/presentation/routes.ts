import { Router } from "express";

import { validarCampos } from "../middlewares/validationResult";
import { authenticateUser } from "../middlewares/jwt";

import { ProducSucursaltroutes } from './productSucursal/routes';
import { Authroutes } from "./auth/routes";
import { Productroutes } from "./products/routes";
import { UserRoutes } from "./users/routes";
import { SucursalRoutes } from "./sucursales/routes";
import { ClienteInvoiceRoutes } from "./clientInvoice/routes";
import { ClientRoutes } from "./clients/routes";
import { PersonRoutes } from "./person/routes";



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
    
    //TODO falta agregar el username en la ruta y el usuario creado y tambien el email en la creación, validar tambien catidad maxima para esa orgnaizaicon de usuarios
    router.use("/api/v1/user", UserRoutes.routes);
    router.use("/api/v1/sucursal", SucursalRoutes.routes);
    router.use("/api/v1/client", ClientRoutes.routes);
    router.use("/api/v1/clientinvoice", ClienteInvoiceRoutes.routes);
    router.use("/api/v1/person", PersonRoutes.routes);
    //TODO: revisra el "aftercreate" (put)
    //TODO: revisar el "aftercreate"

    // Rutas de productos por sucursal
    router.use(
      "/api/v1/productsucursal",
      ProducSucursaltroutes.routes
    );
  
    return router;
  }
}
