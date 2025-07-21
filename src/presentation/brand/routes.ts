import { Router } from 'express';
import { body } from 'express-validator';
import { validarCampos } from '../../middlewares/validationResult';
import { BrandController } from './controller';



export class BrandRoutes{
    static get routes(): Router {
        const router = Router();

        const controller = new BrandController();


        router.post('/',[
            body('nombre').notEmpty().withMessage('El nombre de la marca es obligatorio'),
            body('descripcion').notEmpty().withMessage('La descripción no puede ir vacía'),
            validarCampos
        ] , controller.createBrand);  
        router.get('/' , controller.getBrands);
        router.get('/:id' , controller.getBrand);  
        router.put('/:id', [
            body('nombre').notEmpty().withMessage('El nombre de la marca es obligatorio').optional(),
            body('descripcion').notEmpty().withMessage('La descripción no puede ir vacía').optional(),
            validarCampos
        ] , controller.updateBrand);
        router.delete('/:id', controller.deleteBrand);




        return router;
    }
}