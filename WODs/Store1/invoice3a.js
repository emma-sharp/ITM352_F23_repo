//import data from products.js into this file
import { itemData, quantity } from './product_data.js';

// Calculate extended prices for each item using a loop and increment subtotal as it goes
let extendedPrices = [];
let subtotal=0;
for (let i = 0; i < itemData.length; i++) {
  let item = itemData[i];
  let itemQuantity = quantity[item.quantityIndex];
  let extendedPrice = item.price * itemQuantity;
  subtotal+=extendedPrice;
  extendedPrices.push(extendedPrice);
}

// Calculate sales tax
let taxRate = 0.0575; // 5.75%
let taxAmount = subtotal * taxRate;

// Calculate total
let total = subtotal + taxAmount;

// Populate the table rows using DOM manipulation
let table = document.getElementById('invoiceTable');

// Calculate shipping based on sub-total
let shippingCharge = 0;

if (subtotal <= 50) {
    shippingCharge = 2;
} else if (subtotal <= 100) {
    shippingCharge = 5;
} else {
    shippingCharge = subtotal * 0.05; // 5% of the subtotal
}

// Calculate total including shipping
total = subtotal + taxAmount + shippingCharge;

// assumes there are no errors or logic requiremets on the display of data... which will not be true
for (let i = 0; i < itemData.length; i++) {
    let row = table.insertRow();
    row.insertCell(0).innerHTML = itemData[i].brand;
    row.insertCell(1).innerHTML = quantity[itemData[i].quantityIndex];
    row.insertCell(2).innerHTML = '$' + itemData[i].price.toFixed(2);
    row.insertCell(3).innerHTML = '$' + extendedPrices[i].toFixed(2);
}


// Set the total cell in bold
document.getElementById('total_cell').innerHTML = `$${total.toFixed(2)}`;


// Set the subtotal, tax, and total cells
document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
document.getElementById('shipping_cell').innerHTML = '$' +shippingCharge.toFixed(2);