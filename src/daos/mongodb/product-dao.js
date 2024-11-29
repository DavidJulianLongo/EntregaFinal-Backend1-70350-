import DaoMongoDB from './mongo-dao.js';
import { prodModel } from './models/product-model.js';
import { Error } from 'mongoose';


class ProdDaoMongoDB extends DaoMongoDB {
    constructor() {
        super(prodModel);
    }

// Filtra productos con stock mayor a 0 y por categoría y,
// se puede ordernar de forma ascendente o descendente por precio   
    async getAll(page = 1, limit = 10, query, sort) {
        try {
            const filter = query ? { $or: [{ category: query }, { stock: { $gt: 0 } }] } : {};
            const sortOrder = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
            const response = await prodModel.paginate(filter, { page, limit, sort: sortOrder });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Busca el producto en la base de datos usando el item_code
    async getItemCode(item_code) {
        try {
            const product = await prodModel.findOne({ item_code });
            return product; 
        } catch (error) {
            throw new Error(error);
            ;
        }
    }
}

    export const prodDao = new ProdDaoMongoDB();