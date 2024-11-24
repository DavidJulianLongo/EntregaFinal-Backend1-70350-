const socketClient = io();

const formAdd = document.getElementById('productFormAdd');
const formDel = document.getElementById('productFormDel');
const prodName = document.getElementById('name');
const prodPrice = document.getElementById('price');
const prodStock = document.getElementById('stock');
const prodCategory = document.getElementById('category');
const prodIdToDelete = document.getElementById('productId');
const tableBody = document.getElementById('productTableBody');


/* Añadir un producto */
// Captura todos los value de los inputs y emite un producto al servidor
formAdd.onsubmit = (e) => {
    e.preventDefault();

    const name = prodName.value;
    const price = prodPrice.value;
    const stock = prodStock.value;
    const category = prodCategory.value;

    socketClient.emit('newProd', { name, price, stock, category });
    formAdd.reset();
};

/* Eliminar un producto */
// Captura el iD del producto a eliminar
formDel.onsubmit = (e) => {
    e.preventDefault();

    const productId = prodIdToDelete.value;

    socketClient.emit('deleteProd', { id: productId });
    formDel.reset();
}

// Escucha el emit del servidor con el nuevo producto y lo agrega a la tabla
socketClient.on('updateProducts', (products) => {

    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        // Crea las celdas de la tabla con la información del producto
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            
        `;

        tableBody.appendChild(row);
    });
});

