import { Router } from "express";
import { productController } from "../controllers/product-controllers.js";


const prodRouter = Router();

prodRouter.get('/', productController.getAll); 

prodRouter.get('/:id', productController.getById);

prodRouter.post('/', productController.create);

prodRouter.put('/:id', productController.update);

prodRouter.delete('/:id', productController.remove);


export default prodRouter;