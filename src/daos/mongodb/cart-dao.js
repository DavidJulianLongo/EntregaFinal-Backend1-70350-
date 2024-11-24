import DaoMongoDB from './dao-mongodb.js';
import { cartModel } from './models/cart-model.js';

class CartDaoMongoDB extends DaoMongoDB {
    constructor() {
        super(cartModel);
    }
};

export const cartDao = new CartDaoMongoDB();