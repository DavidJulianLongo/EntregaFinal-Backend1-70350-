import BaseController from './base-controller.js';
import { prodService } from "../services/product-service.js";

class ProductController extends BaseController {
    constructor() {
        super(prodService); 
    }

    async createProd(req, res, next) {
        try {
            const newItem = await prodService.createProd(req.body);
            res.json(newItem);
        } catch (error) {
            next(error);
        }
    }

    async createFileProds(req, res, next) {
        try {
            const response = await prodService.createFileProds();
            res.json(`${response} products inserted correctly`);
        } catch (error) {
            next(error);
        }
    }
}

export const prodController = new ProductController();


