function createGrid() {
    var display_grid = document.getElementById("display_grid");
    var numberOfRows = Math.ceil(products.length / 3);
    
    for (i = 0; i < numberOfRows; i++) {
        var row = document.createElement("div");
        row.className = "row py-3";

        for (j = i * 3; j < (i + 1) * 3 && j < products.length + 1; j++) {
            var col = document.createElement("div");
            col.className = "col";
            col.id = `display-col-${j}`;

            row.appendChild(col);
        }
        display_grid.appendChild(row);
    }

    display_grid.innerHTML += `<div class="row text-center py-5" id="submit_row"></div>`

    populateItems();
}

function populateItems() {
    for (i = 0; i < products.length; i++) {
        let col = document.getElementById(`display-col-${i}`);
        col.innerHTML = `
            <img src="./images/${products[i].image}" class="img-thumbnail display-image" alt="${products[i].name}">
            <p><b>${products[i].name}</b></p>
            <div class="product-description">
                <p>Price: $${products[i].price}</p>
                <p>Type: ${products[i].type}</p>
                <p>In Stock: ${products[i].quantity_available}</p>
                <p>${products[i].description}</p>
            </div>
            <label id="product-input-${i}-label">Quantity: </label>
            <input id="product-input-${i}" type="text" value="0" name="product${i}" onkeyup="checkQuantityTextbox(this, ${products[i].quantity_available})"></input>
        `
    }

    document.getElementById("submit_row").innerHTML = `
        <div class="col">
            <button type="submit" id="purchase-button" name="purchase_submit" class="btn btn-primary" value="Purchase">Purchase</button>
        </div>
    `

}