import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import prodRouter from './routes/products-router.js';
import cartRouter from './routes/cart-router.js';
import { initMongoDB } from './daos/mongodb/db-conection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import viewsRouter from './routes/views-router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(process.cwd(), "src", "public")));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), "src", "views"));

// Rutas de productos y carrito
app.use('/products', prodRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);


// Middleware de manejo de errores
app.use(errorHandler);

// Conexión a MongoDB y arranque del servidor
initMongoDB()
    .then(() => {
        console.log('Conectado a MongoDB');
        app.listen(8080, () => console.log("Servidor en puerto 8080"));
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
    });

