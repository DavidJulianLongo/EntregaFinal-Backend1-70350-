import DaoMongoDB from './mongo-dao.js';
import { prodModel } from './models/product-model.js';


class ProdDaoMongoDB extends DaoMongoDB {
    constructor() {
        super(prodModel);
    }

}

export const prodDao = new ProdDaoMongoDB();