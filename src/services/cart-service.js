import BaseService from "./base-service.js";
import { cartDao } from '../daos/mongodb/cart-dao.js';
import { CustomError } from "../utils/error-custom.js";
import { prodDao } from "../daos/mongodb/product-dao.js";


class CartService extends BaseService {
    constructor() {
        super(cartDao);
    }

    async addProdToCart(cartId, prodId, quantity = 1) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);
            
            const product = await prodDao.getById(prodId);
            if (!product) throw new CustomError(`Product with ID: ${prodId} not found`, 404);

            const updatedCart = await cartDao.findOneAndUpdate(
                { _id: cartId, 'products.product': prodId },
                { $inc: { 'products.$.quantity': quantity } },
                { new: true }
            );

            if (!updatedCart) {
                const newCart = await cartDao.update(
                    cartId,
                    { $push: { products: { product: prodId, quantity: quantity } } },
                    { new: true }
                );
                if (!newCart) throw new CustomError('Error adding product to cart', 400);
            }
            return updatedCart;
        } catch (error) {
            throw error;
        }
    };

    async getCartById(cartId) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);
            return cart
        } catch (error) {
            throw error;
        }
    }

    async remove(cartId, productId) {
        try {
            const cart = await cartDao.getById({ _id: cartId, 'products.product': productId });
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);

            const product = await prodDao.getById(productId);
            if (!product) throw new CustomError(`Product with ID: ${prodId} not found`, 404);

            const productInCart = await cartDao.model.exists({
                _id: cartId,
                'products.product': productId
            });
            if (!productInCart) throw new CustomError(`Product with ID: ${productId} is not in the cart`, 400);

            const updatedCart = await cartDao.update(
                { _id: cartId, 'products.product': productId },
                { $pull: { products: { product: productId } } },
                { new: true }
            );
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async removeAll(cartId) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);
    
            const updatedCart = await cartDao.update(
                { _id: cartId },
                { $set: { products: [] } },
                { new: true }
            );
    
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }
}

export const cartService = new CartService()