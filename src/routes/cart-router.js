import { Router } from "express";
import { cartController } from "../controllers/cart-controller.js";

const cartRouter = Router();

cartRouter.post('/', cartController.create)

cartRouter.get('/', cartController.getAll )

cartRouter.get('/:cid', cartController.getCartById)

cartRouter.post('/:cid/product/:pid', cartController.addProdToCart)


export default cartRouter;