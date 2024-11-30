import DaoMongoDB from './mongo-dao.js';
import { cartModel } from './models/cart-model.js';


class CartDaoMongoDB extends DaoMongoDB {
    constructor() {
        super(cartModel);
    }

    async getById(cartId) {
        try {
            return await cartModel.findById(cartId).populate('products.product');
        } catch (error) {
            throw error
        }
    }

    async findOneAndUpdate(cartId, prodId, quantity) {
        try {
            return await cartModel.findOneAndUpdate(cartId, prodId, quantity);
        } catch (error) {
            throw error;
        }
    }

};

export const cartDao = new CartDaoMongoDB();