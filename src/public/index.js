const socketClient = io();

const tableBody = document.getElementById('productTableBody');

function showProducts(products) {
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
        `;
        tableBody.appendChild(row);
    });
};

// Escuchar el evento 'updateProducts' para actualizar la tabla
socketClient.on('updateProducts', (products) => {
    showProducts(products);
});