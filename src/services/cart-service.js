import BaseService from "./base-service.js";
import { cartDao } from '../daos/mongodb/cart-dao.js';
import { CustomError } from "../utils/error-custom.js";


class CartService extends BaseService {
    constructor() {
        super(cartDao);
    }

    async addProdToCart(cartId, prodId) {
        try {
            const updatedCart = await cartDao.addProdToCart(cartId, prodId);
            if (!updatedCart) throw new CustomError('Error adding product to cart', 400);
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async getCartById (cartId){
        try {
            const cart = await cartDao.getById(cartId);
            if(!cart) throw new CustomError(`Cart with ID: ${cartId} not found`, 404);
            return cart
        } catch (error) {
            throw error;
        }
    }
}

export const cartService = new CartService()