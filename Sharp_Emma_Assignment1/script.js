// Fetch data from product_data.json
fetch('product_data.json')
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(error => console.error('Error:', error));

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        // Create elements for each product
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">Price: $${product.price}</p>
                <p class="quantity">Available: ${product.quantity_available}</p>
            </div>
        `;

        // Append to container
        container.appendChild(productDiv);
    });
}