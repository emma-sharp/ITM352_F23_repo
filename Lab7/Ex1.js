require("./products_data.js");

let product_num = 1;
while (eval("typeof name" + product_num) !== 'undefined') {
    console.log(product_num + '. ' + eval('name' + product_num));
    product_num++;
}

console.log(`That's all we have!`);


