/** 
 * Functions for /products_display.html
 * Author - Emma Sharp
 */
let store_params = (new URL(document.location)).searchParams;

var display_grid = document.getElementById("display_grid");
var numberOfRows = Math.ceil(products['apparel'].length / 3);

for (i = 0; i < numberOfRows; i++) {
    var row = document.createElement("div");
    row.className = "row py-3";

    for (j = i * 3; j < (i + 1) * 3 && j < products['apparel'].length + 1; j++) {
        var col = document.createElement("div");
        col.className = "col";
        col.id = `display-col-${j}`;

        row.appendChild(col);
    }
    display_grid.appendChild(row);
}

display_grid.innerHTML += `<div class="row text-center py-5" id="submit_row"></div>`


for (i = 0; i < products['apparel'].length; i++) {
    let col = document.getElementById(`display-col-${i}`);
    col.innerHTML = `
        <img src="./images/${products['apparel'][i].image}" class="img-thumbnail display-image" alt="${products['apparel'][i].name}">
        <p><b>${products['apparel'][i].name}</b></p>
        <div class="product-description">
            <p>Price: $${products['apparel'][i].price}</p>
            <p>Type: ${products['apparel'][i].type}</p>
            <p>In Stock: ${products['apparel'][i].quantity_available}</p>
            <p>${products['apparel'][i].description}</p>
            <select id="size${i}" name="size${i}">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
            </select>
        </div>
        <label id="product-input-${i}-label">Quantity: </label>
        <input id="product-input-${i}" type="text" value="${ store_params.has('product0')  ? store_params.get('product' + i) : 0}" name="product${i}" onkeyup="checkQuantityTextbox(this, ${products['apparel'][i].quantity_available})"></input>
    `
}

document.getElementById("submit_row").innerHTML = `
    <div class="col">
        <button type="submit" id="purchase-button" name="purchase_submit" class="btn btn-primary" value="add_to_cart">Add to Cart</button>
    </div>
`

 /* Pulled from Labs & Examples */
 window.onload = function () {
    let params = (new URL(document.location)).searchParams; // get the query string which has the form data
    // form was submitted so check that quantities are valid then redirect to invoice if ok.
    if (params.has('error')) {
        console.log("pass");
        has_errors = false; // assume valid quantities
        stock_error = false;
        total_qty = 0;
        for (i = 0; i < products['apparel'].length; i++) {
            if (params.has(`product${i}`)) {
                a_qty = params.get(`product${i}`);
                product_selection_form[`product-input-${i}`].value = a_qty;
                total_qty += a_qty;
                if(!isNonNegIntAndStock(a_qty, products['apparel'][i].quantity_available)) {
                    has_errors = true;
                    checkQuantityTextbox(product_selection_form[`product-input-${i}`], products['apparel'][i].quantity_available);
                }
                if (a_qty > products['apparel'][i].quantity_available) { stock_error = true; }
            }
        }
        /* IR4: Changing button based on Errors */
        if (stock_error) { 
            alert("Out of stock on a certain item");
            if (!document.getElementById("purchase-button").classList.contains("btn-danger")) {
                document.getElementById("purchase-button").classList.remove("btn-primary") 
                document.getElementById("purchase-button").classList.add("btn-danger")
                document.getElementById("purchase-button").innerHTML = "Out of Stock on an Item";
            }
        }
        else if (total_qty == 0) { 
            alert("Please select some quantities"); 
            if (!document.getElementById("purchase-button").classList.contains("btn-danger")) {
                document.getElementById("purchase-button").classList.remove("btn-primary") 
                document.getElementById("purchase-button").classList.add("btn-danger")
                document.getElementById("purchase-button").innerHTML = "Please Select Items";
            }
        }
        else if (has_errors) { 
            alert("Please enter only valid quantities");
            if (!document.getElementById("purchase-button").classList.contains("btn-danger")) {
                document.getElementById("purchase-button").classList.remove("btn-primary") 
                document.getElementById("purchase-button").classList.add("btn-danger")
                document.getElementById("purchase-button").innerHTML = "Enter Only Valid Quantities";
            }
        }
        else {
            window.stop;
        }
    } else if (params.has('cart')) {
        document.getElementById('info_message').innerHTML = `<h2><font color="green">Cart updated!</font></h2>`
    }
}