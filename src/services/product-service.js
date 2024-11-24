import BaseService from "./base-services.js";
// import { prodDao } from "../daos/filesystem/product-dao.js";
import { prodDao } from "../daos/mongodb/product-dao.js";


class ProductService extends BaseService {
    constructor() {
        super(prodDao)
    }
}


export const prodService = new ProductService();