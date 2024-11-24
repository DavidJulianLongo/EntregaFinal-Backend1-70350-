
# PreEntrega 2 Backend 70350 - CoderHouse

## Descripción

Este proyecto está desarrollado en JavaScript, diseñado para manejar la lógica de negocio y el almacenamiento de datos para un sistema de gestión de productos y un carrito de compras.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DavidJulianLongo/PreEntrega1-Backend-70350.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

Para iniciar el servidor, ejecuta:
```bash
npm start
```

## Middleware

El proyecto incluye un middleware llamado `validateProduct` que se encarga de validar los campos de un producto antes de ser creado. Este middleware verifica que todos los campos requeridos estén presentes y que tengan los tipos correctos. Esto ayuda a asegurar la integridad de los datos y a prevenir errores en la manipulación de productos en el sistema.

## Rutas

### Rutas de Productos (`/products`)

- **GET /products**: Obtiene una lista de todos los productos disponibles.
  
- **GET /products/:pid**: Obtiene un producto específico por su `id`.

- **POST /products**: Crea un nuevo producto. Se espera que el cuerpo de la solicitud contenga la información del producto en formato JSON (nombre, precio, stock, etc.).

- **PUT /products/:pid**: Actualiza un producto existente identificado por su `id`. El cuerpo de la solicitud debe contener los campos a actualizar.

- **DELETE /productos/:pid**: Elimina un producto específico por su `id`.

### Rutas de Carrito (`/api/carts`)

- **POST /api/carts**: Crea un carrito.

- **GET /api/carts**: Obtiene los artículos que están en el carrito.

- **GET /api/carts/:cid**: Obtiene un carrito específico por su `id`, mostrando el `id` de los productos que contiene, y su cantidad (quantity).

- **POST /api/carts/:cid/product/:pid**: Añade un producto específico al carrito, y si el producto ya se encuentra en el carrito, aumenta su cantidad (quantity).

### Rutas de Vista (`/views`)

- **GET /**: Muestra una tabla con la lista de productos disponibles. Esta ruta es accesible a través de un navegador web y muestra una vista con los productos que se encuentran en el sistema.

- **GET /realtimeproducts**: Muestra un formulario para agregar y eleiminar productos los cuales se muestran en una tabla. 

## WebSockets

El proyecto incluye una implementación de `WebSockets` para permitir la actualización en tiempo real de los productos. Al agregar o eliminar productos desde el formulario en la ruta `/realtimeproducts`, los cambios se transmiten de inmediato a todos los clientes conectados. Esto permite que la lista de productos se actualice sin necesidad de recargar la página.

## Handlebars

En este proyecto, se usa para renderizar:

La tabla de productos: En la ruta /realtimeproducts, Handlebars crea una tabla que muestra la lista de productos.
El formulario de productos: La misma ruta /realtimeproducts también muestra un formulario para agregar o eliminar productos.

## Tecnologías Utilizadas

- Node.js
- Express
- Handlebars
- WebSockets
- FileSystem (para persistencia de datos)


