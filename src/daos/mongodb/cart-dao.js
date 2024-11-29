import DaoMongoDB from './mongo-dao.js';
import { cartModel } from './models/cart-model.js';
import { cartService } from '../../services/cart-service.js';



class CartDaoMongoDB extends DaoMongoDB {
    constructor() {
        super(cartModel);
    }

    async addProdToCart(cartId, prodId) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(
                cartId,
                { $push: { products: prodId } },
                { new: true }
            );
            return updatedCart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(cartId) {
        try {
            const cart = await cartModel.findById(cartId).populate('products')
            console.log(cart);
            return cart;
        } catch (error) {
            throw new Error(`Error fetching cart by ID: ${error.message}`);
        }
    }
};

export const cartDao = new CartDaoMongoDB();