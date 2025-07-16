import { Router } from 'express';
import { body } from 'express-validator';
import { validarCampos } from '../../middlewares/validationResult';
import { CategoryController } from './controller';


export class CategoryRoutes {
    static get routes(): Router {
        const router = Router();

        const controller = new CategoryController();


        router.post('/',[
            body("nombre", "El nombre es obligatorio").not().isEmpty(),
            body("nombre", "El nombre debe tener 3 caracteres como minimo").isLength({ min: 3 }),
            body("descripcion", "El campo descripcion es obligatorio").not().isEmpty(),
            validarCampos
        ], controller.createCategory);
        router.get('/', controller.getCategories);
        router.get('/:id', controller.getCategory);
        router.put('/:id', [
            body("nombre", "El nombre es obligatorio").not().isEmpty().optional(),
            body("nombre", "El nombre debe tener 3 caracteres como minimo").isLength({ min: 3 }).optional(),
            body("descripcion", "El campo descripcion es obligatorio").not().isEmpty().optional(),
            validarCampos
        ], controller.updateCategory);
        router.delete('/:id', controller.deleteCategory);



        return router;
    }
}
