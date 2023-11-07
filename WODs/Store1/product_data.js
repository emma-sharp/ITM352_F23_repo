// Define the quantities array
let quantity = [-1, 0.4, "cat", 5];

// Define the item objects (minus image data) with brand and quantity attributes
let itemData = [
  {
    brand: 'HTC',
    price: 40,
    quantityIndex: 0, // Use index position to reference the quantity
  },
  {
    brand: 'Nokia',
    price: 35,
    quantityIndex: 1, // Use index position to reference the quantity
  },
  {
    brand: 'Samsung',
    price: 45,
    quantityIndex: 2, // Use index position to reference the quantity
  },
  {
    brand: 'Blackberry',
    price: 10,
    quantityIndex: 3, // Use index position to reference the quantity
  },
];

export { itemData, quantity };