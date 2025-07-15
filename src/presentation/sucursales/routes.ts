import { Router } from "express";
import { body } from "express-validator";
import { SucursalController } from "./controller";
import { validarCampos } from '../../middlewares/validationResult';
export  class SucursalRoutes{
    static get routes():Router{
        const router = Router();

        const controller = new SucursalController();
        router.post("/",[
        // body("descripcion", "La descripción es obligatoria").not().isEmpty(),
        
        // body("direccion", "La dirección es obligatoria").not().isEmpty(),
        // body("direccion", "La dirección no puede tener más de 50 caracteres").isLength({ max: 50 }),
        //  validarCampos,
        ],controller.createSucursal);
        router.get("/",controller.getSucursales);
        router.get("/:id",controller.getSucursal);
        router.put("/:id", [
            body("descripcion", "La descripción es obligatoria").not().isEmpty().optional(),
            body("direccion", "La dirección no puede tener más de 50 caracteres").isLength({ max: 50 }).optional(),
    
             validarCampos,
            ],controller.updateSucursal);
        router.patch("/:id",controller.updateSucursal);
        router.delete("/:id",controller.deleteSucursal);

        return router;
    }

    
}