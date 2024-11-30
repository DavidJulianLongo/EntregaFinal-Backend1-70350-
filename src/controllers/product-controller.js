import BaseController from './base-controller.js';
import { prodService } from "../services/product-service.js";

class ProductController extends BaseController {
    constructor() {
        super(prodService);
    }

    async getAll(req, res, next) {
        try {
            const { page, limit, query, sort } = req.query;
            const response = await prodService.getAll(page, limit, query, sort);
            res.json({
                status: response.docs.length > 0? 'success' : 'error',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage ? `http://localhost:8080/products?limit=${limit}&page=${response.prevPage}&sort=${sort}&query=${query}`: null, 
                nextLink: response.hasNextPage ? `http://localhost:8080/products?limit=${limit}&page=${response.nextPage}&sort=${sort}&query=${query}` : null
            });
        } catch (error) {
            next(error);
        }
    }

    
    async createFileProds(req, res, next) {
        try {
            const response = await prodService.createFileProds();
            res.json({response});
        } catch (error) {
            next(error);
        }
    }
}

export const prodController = new ProductController();


