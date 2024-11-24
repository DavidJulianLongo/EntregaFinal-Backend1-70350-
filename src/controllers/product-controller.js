import BaseController from './base-controller.js';
import { prodService } from "../services/product-service.js";

class ProductController extends BaseController {
    constructor() {
        super(prodService); 
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


// class ProductController {

//     async getAll(req, res, next) {
//         try {
//             const products = await prodService.getAll();
//             res.json(products);
//         } catch (error) {
//             next(error);
//         }
//     }

//     async getById(req, res, next) {
//         try {
//             const { id } = req.params;
//             const product = await prodService.getById(id);
//             res.json(product);
//         } catch (error) {
//             next(error);
//         }
//     }

//     async create(req, res, next) {
//         try {
//             const newProduct = await prodService.create(req.body);
//             res.json(newProduct); 
//         } catch (error) {
//             next(error);
//         }
//     }

//     async update(req, res, next) {
//         try {
//             const { id } = req.params;
//             const updatedProduct = await prodService.update(id, req.body);
//             res.json(updatedProduct);
//         } catch (error) {
//             next(error);
//         }
//     }

//     async remove(req, res, next) {
//         try {
//             const { id } = req.params;
//             const deletedProduct = await prodService.remove(id);
//             res.json(deletedProduct);
//         } catch (error) {
//             next(error);
//         }
//     }
// };


// export const productController = new ProductController();