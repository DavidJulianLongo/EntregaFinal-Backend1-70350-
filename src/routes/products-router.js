import { Router } from "express";
import { prodController } from "../controllers/product-controller.js";


const prodRouter = Router();

prodRouter.get('/', prodController.getAll); 

prodRouter.get('/:id', prodController.getById);

prodRouter.post('/file', prodController.createFileProds);

prodRouter.post('/', prodController.createProd);

prodRouter.put('/:id', prodController.update);

prodRouter.delete('/:id', prodController.remove);


export default prodRouter;