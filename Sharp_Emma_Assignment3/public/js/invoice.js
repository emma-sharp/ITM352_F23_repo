/** 
 * Functions for /invoice.html
 * Author - Emma Sharp
 */

let cart;
loadJSON('/get_cart', function(response) {
    cart = JSON.parse(response);
});

let sizes;
loadJSON('/get_sizes', function (response) {
    sizes = JSON.parse(response);
})

parent = document.getElementById("invoice-table");
subtotal = 0;

for (i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart[i].length; j++) {
        let type;
        switch (i) {
            case 0:
                type = 'boards'; break;
            case 1:
                type = 'accessories'; break;
            case 2:
                type = 'apparel'; break;
        }

        units = cart[i][j];
        if (units == 0) { continue; }
        unit_price = products[type][j].price.toFixed(2);
        ext_price = (unit_price * cart[i][j]).toFixed(2);
        subtotal += parseInt(ext_price);
        if (type == 'apparel') {
            parent.innerHTML += `
            <tr>
                <td>${products[type][j].name} (${sizes[j]})</td>
                <td>${cart[i][j]}</td>
                <td>$${unit_price}</td>
                <td>$${ext_price}</td>
                <td></td>
            </tr>
        `;
        } else {
            parent.innerHTML += `
            <tr>
                <td>${products[type][j].name}</td>
                <td>${cart[i][j]}</td>
                <td>$${unit_price}</td>
                <td>$${ext_price}</td>
                <td></td>
            </tr>
        `;
        }
        
    }
}

tax = parseInt(subtotal * 0.04712);
tax = tax;
shipping = 0;
if (subtotal >= 400 && subtotal < 1000) { shipping = 50; }
else if (subtotal >= 1000 && subtotal <= 1500) { shipping = 100; }
else { shipping = 150; }
total = parseInt(subtotal + tax + shipping);

document.getElementById("invoice-table").innerHTML += `
    <tr>    
        <td></td>
        <td></td>
        <td></td>
        <td><b>Subtotal</b></td>
        <td>$${subtotal.toFixed(2)}</td>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><b>Tax (4.712%)</b></td>
        <td>$${tax.toFixed(2)}</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><b>Shipping*</b></td>
        <td>$${shipping.toFixed(2)}</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><b>Total</b></td>
        <td>$   ${total.toFixed(2)}</td>
    </tr>
`;