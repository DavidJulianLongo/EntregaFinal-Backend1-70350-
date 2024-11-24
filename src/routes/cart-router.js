import { Router } from "express";
import { cartDao } from "../daos/filesystem/cart-dao.js";

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        res.json(await cartDao.createCart());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

cartRouter.get('/', async (req, res) =>{
    try {
        res.json(await cartDao.getAllCarts());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        res.json(await cartDao.getCartById(cid));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        res.json(await cartDao.addToCart(cid, pid));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


export default cartRouter;