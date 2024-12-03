import { Router } from "express";
import {viewsController} from '../controllers/views-controller.js'


const viewsRouter = Router();

viewsRouter.get('/', viewsController.getAll);
viewsRouter.get('/products:pid', viewsController.getProdDetail);

export default viewsRouter;