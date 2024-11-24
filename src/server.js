import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import prodRouter from './routes/products-router.js';
import cartRouter from './routes/cart-router.js';
import viewsRouter from './routes/views-router.js';
import { Server } from 'socket.io';
// import { productsManager } from './daos/filesystem/products-dao.js';
import { initMongoDB } from './daos/mongodb/db-conection.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(process.cwd(), "src", "public")));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), "src", "views"));

app.use('/products', prodRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

app.use(errorHandler);

initMongoDB()
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(8080, () => console.log("Server ok port 8080"));
    })
    .catch((error) => console.log(error));




// const httpServer = app.listen(8080, () => console.log("Server ok port 8080"));

// const socketServer = new Server(httpServer);

// socketServer.on('connection', async (socket) => {

//     // Emite todos los productos
//     const products = await productsManager.getAllProd();
//     socket.emit('updateProducts', products);

//     // Captura el emit del cliente, crea el producto, y luego lo emite a todos los clientes
//     socket.on('newProd', async (prod) => {
//         await productsManager.createProduct(prod);
//         const products = await productsManager.getAllProd();
//         socketServer.emit('updateProducts', products);
//     })

//     socket.on('deleteProd', async ({ id }) => {
//         await productsManager.deleteProd(id)
//         const products = await productsManager.getAllProd();
//         socketServer.emit('updateProducts', products);
//     })
// })

