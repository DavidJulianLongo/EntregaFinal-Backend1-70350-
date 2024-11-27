import DaoMongoDB from './mongo-dao.js';
import { prodModel } from './models/product-model.js';


class ProdDaoMongoDB extends DaoMongoDB {
    constructor() {
        super(prodModel);
    }


    // Busca el producto en la base de datos usando el item_code
    async getItemCode(item_code) {
        try {
            const product = await this.model.findOne({ item_code });
            return product; 
        } catch (error) {
            throw error;
        }
    }
}

    export const prodDao = new ProdDaoMongoDB();