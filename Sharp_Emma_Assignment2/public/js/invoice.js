/** 
 * Functions for /invoice.html
 * Author - Emma Sharp
 */

function generateInvoice(product_array) {
    parent = document.getElementById("invoice-table");
    subtotal = 0;

    for (i = 0; i < product_array.length; i++) {
        units = product_array[i];
        if (units == 0) { continue; }
        unit_price = products[i].price.toFixed(2);
        ext_price = (unit_price * product_array[i]).toFixed(2);
        subtotal += parseInt(ext_price);
        parent.innerHTML += `
            <tr>
                <td>${products[i].name}</td>
                <td>${product_array[i]}</td>
                <td>$${unit_price}</td>
                <td>$${ext_price}</td>
                <td></td>
            </tr>
        `;
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
}