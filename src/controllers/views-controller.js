import { query } from 'express';
import {prodService} from '../services/product-service.js'
import BaseController from "./base-controller.js";

class ViewsController extends BaseController{
    constructor(){
        super(prodService)
    }

    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10, query, sort } = req.query;
            const products = await prodService.getAll(Number(page), Number(limit), query, sort);
            const newProducts = products.docs.map(product => product.toObject());
            res.render('index', { 
                products: newProducts,
                totalPages: products.totalPages,
                currentPage: products.page,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage
            }
        );
        } catch (error) {
            next(error);
        }
    }

    async getProdDetail(req, res, next) {
        try {
            const { pid } = req.params;
            const product = await prodService.getById(pid);
            res.render('productDetail', { product });
        } catch (error) {
            next(error);
        }
    }
    
}

export const viewsController = new ViewsController();

