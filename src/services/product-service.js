import BaseService from "./base-service.js";
import { prodDao } from "../daos/mongodb/product-dao.js";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "../utils/error-custom.js";

class ProductService extends BaseService {
    constructor() {
        super(prodDao)
    }

    async getAll(page, limit, query, sort) {
        try {
            const response = await prodDao.getAll(page, limit, query, sort);
            return response;
        } catch (error) {
            throw error;
        }
    }


    //Agreg aun item_code a los con uuidv4 a los prods del JSON, para poder hacer la comparación
    //y evitar agregarlos por dupicados
    async createFileProds() {
        try {
            const filePath = `${path.join(process.cwd(), 'src/data/products.json')}`;
            const prodFiles = JSON.parse(fs.readFileSync(filePath));

            const productsWithCode = prodFiles.map(prod => ({
                ...prod,
                item_code: prod.item_code || uuidv4(),
            }));

            fs.writeFileSync(filePath, JSON.stringify(productsWithCode));

            let duplicatedCount = 0;
            let duplicatedCodes = [];

            for (const product of productsWithCode) {
                const existingProduct = await prodDao.getItemCode(product.item_code);
                if (existingProduct) {
                    duplicatedCount++;
                    duplicatedCodes.push(product.item_code);
                } else {
                    await prodDao.create(product);
                }
            }

            if (duplicatedCount > 0) {
                throw new CustomError(`There are ${duplicatedCount} duplicated products`, 400);
            }
            return `${productsWithCode.length - duplicatedCount}`;
        } catch (error) {
            throw error;
        }
    }
}


export const prodService = new ProductService();





