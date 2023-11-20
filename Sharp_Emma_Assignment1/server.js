const express = require('express');
const app = express();
var product_data = require(__dirname + "/product_data.json");
const qs = require('querystring');

app.use(express.urlencoded({ extended: true }));

// next 3 lines of code from Professor Port
app.get("/test", function (request, response) {
   response.status(200).send(products);
})

// Routing 
app.get("/product_data.js", function (request, response, next) {
   response.type('.js');
   let products_str = `var products = ${JSON.stringify(product_data)};`;
   response.send(products_str);
});

app.post("/purchase", function (request, response) {
   console.log(request.body);

   let errors = {};
   for(let i in product_data) { 
      let qty = request.body['product' + i];
      // validate quantities
      
      // check if nonnegint
      if (!isNonNegInt(qty)) {  errors['product'+i] = isNonNegInt(qty, true); }
      if (!isInStock(qty, product_data[i].quantity_available)) { errors['product' + i] += "Out of Stock"; }

   }
   var qstr = qs.stringify(request.body);
   if (Object.entries(errors).length === 0) { response.redirect(`invoice.html?${qstr}`); }
   else { response.redirect(`product_display.html?${qstr}`); }
});

app.post("/order", function (request, response) {
   response.redirect("order_submitted.html");
})

// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

// process purchase request (validate quantities, check quantity available)


// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'));

// start server
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`test app listening on port ${PORT}`)
})

function isNonNegInt(value, returnErrors = false) {
   errors = []; // assume no errors at first
   if(value === '') {
       value = 0;
   }
   if (Number(value) != value) {
       errors.push('Not a number!'); // Check if string is a number value
   }
   else {
       if (value < 0) errors.push('Negative value!'); // Check if it is non-negative
       if (parseInt(value) != value) errors.push('Not an integer!'); // Check that it is an integer
   }

   return returnErrors ? errors : (errors.length == 0);
}

function isInStock(value, stock) {
   if (value > stock) { return false; }
}