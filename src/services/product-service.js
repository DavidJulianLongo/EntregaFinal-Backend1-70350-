import BaseService from "./base-service.js";
import { prodDao } from "../daos/mongodb/product-dao.js";
import fs from 'fs';
import path from 'path';
import { CustomError } from "../utils/error-custom.js";

class ProductService extends BaseService {
    constructor() {
        super(prodDao)
    }

    async getAll(page, limit, query, sort) {
        try {
            const response = await prodDao.getAll(page, limit, query, sort);
            if (!response) throw new CustomError('error getting products', 500);
            return response;
        } catch (error) {
            throw error;
        }
    }

    //Agrega  los productos del JSON
    async createFileProds() {
        try {
            const filePath = `${path.join(process.cwd(), 'src/data/products.json')}`;
            const prodFiles = JSON.parse(fs.readFileSync(filePath));
            let createdCount = 0;
            for (const product of prodFiles) {
                await prodDao.create(product);
                createdCount++;
            }
            if (!createdCount < 1) throw new CustomError('Error creating products')
            return `${createdCount} products created successfully`;
        } catch (error) {
            throw error;
        }
    }
}

export const prodService = new ProductService();





