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
            const cart = await cartService.getCartById(cid);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    }

    async updateProdQuantity(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartService.addProdToCart(cid, pid, quantity);
            res.json({
                message: 'Product quantity updated successfully',
                cart: updatedCart
            })
        } catch (error) {
            next(error)
        }
    }

    async updateCartProds (req, res, next){
        try {
            const {cid} = req.params;
            const products = req.body;
            const updatedCart = await cartService.updateCartProds(cid, products);
            res.json({
                message: 'Cart updated successfully',
                cart: updatedCart
            });
    } catch (error) {
            next(error);
        }
    }

    async removeProd(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const deletedItem = await cartService.remove(cid, pid);
            res.json({
                message: `Product with ID: ${pid} successfully removed`,
                cart: deletedItem
            });
        } catch (error) {
            next(error)
        }
    }

    async removeAllProds(req, res, next) {
        try {
            const { cid } = req.params;
            const updatedCart = await cartService.removeAll(cid);
            res.json({
                message: 'The cart was successfully emptied',
                cart: updatedCart
            });
        } catch (error) {
            next(error);
        }
    }
}

export const cartController = new CartController();