import { Router } from "express";
import { cartController } from "../controllers/cart-controller.js";

const cartRouter = Router();

cartRouter.post('/', cartController.create);

cartRouter.get('/', cartController.getAll);

cartRouter.get('/:cid', cartController.getCartById);

cartRouter.post('/:cid/product/:pid', cartController.addProdToCart);

cartRouter.put('/:cid/products/:pid', cartController.updateProdQuantity);

cartRouter.delete('/:cid/products/:pid', cartController.removeProd);

cartRouter.delete('/:cid', cartController.removeAllProds);


export default cartRouter;