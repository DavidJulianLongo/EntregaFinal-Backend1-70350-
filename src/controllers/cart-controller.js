import BaseController from './base-controller.js';
import { cartService } from '../services/cart-service.js';

class CartController extends BaseController {
    constructor() {
        super(cartService);  
    }

    async addProdToCart(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartService.addProdToCart(cid, pid);
            res.json(updatedCart);
        } catch (error) {
            next(error);
        }
    }

    async getCartById(req, res, next) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getById(cid);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    }

}

export const cartController = new CartController();