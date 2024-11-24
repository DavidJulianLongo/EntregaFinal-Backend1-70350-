import BaseService from "./base-service.js";
// import { prodDao } from "../daos/filesystem/product-dao.js";
import { prodDao } from "../daos/mongodb/product-dao.js";
import fs from 'fs';
import path from 'path';

class ProductService extends BaseService {
    constructor() {
        super(prodDao)
    }


    async createFileProds() {
        try {
            const prodFiles = JSON.parse(fs.readFileSync(`${path.join(process.cwd(), 'src/data/products.json')}`))
            const newProducts = await prodDao.create(prodFiles);
            if (!newProducts) throw new CustomError('Error creating products', 400);
            return newProducts.length;
        } catch (error) {
            throw error;
        }
    }
};


export const prodService = new ProductService();
