const express = require('express');
const app = express();
var product_data = require(__dirname + "/product_data.json");

// Required Dependencies
const fs = require('fs');
const qs = require('querystring');
const crypto = require('crypto');

// IR5: Array to keep track of logged-in users
let current_users = [];

// User Registration Data
let user_information = fs.readFileSync("./user_data.json");
let user_reg_data = JSON.parse(user_information);

app.use(express.urlencoded({ extended: true }));

app.get("/test", function (request, response) {
   response.status(200).send(products);
})

// Sending product data to client
app.get("/product_data.js", function (request, response, next) {
   response.type('.js');
   let products_str = `var products = ${JSON.stringify(product_data)};`;
   response.send(products_str);
});

/* ~~~~ Routing for Pages ~~~~ */

// Main Page
app.get("/", function (request, response) {
   console.log("Landing/Index");
   let user = request.query.user;
   let name = "";
   let user_count = current_users.length; // IR5: Keeping track of user count
   if (user != undefined) { name = user_reg_data[user].name; }
   if (user != undefined) { response.redirect("./landing.html?user=" + user + "&name=" + name + "&users=" + user_count); }
   else { response.redirect("./landing.html?users=" + user_count ); }
});

// Products_display
app.get("/store", function (request, response) {
   console.log("Store");
   let user = request.query.user;
   let name = "";
   let user_count = current_users.length; // IR5: Keeping track of user count
   if (user != undefined) {
      name = user_reg_data[user].name;
   }
   let p0 = request.query.product0;
   let p1 = request.query.product1;
   let p2 = request.query.product2;
   let p3 = request.query.product3;
   let p4 = request.query.product4;
   let submit = request.query.submit;

   if (user == undefined) { response.redirect("./product_display.html?users=" + user_count); }
   else {
      if (p0 != undefined && submit != undefined && user != undefined) {
         return response.redirect("./product_display.html?user=" + user + "&name=" + name + "&users=" + user_count  + "&product0=" + p0 + "&product1=" + p1 + "&product2=" + p2 + "&product3=" + p3 + "&product4=" + p4 + "&submit=yes");
      } else {
         return response.redirect("./product_display.html?user=" + user + "&name=" + name + "&users=" + user_count);
      }
   }
});


// Login Page
app.get("/login", function (request, response) {
   console.log("Login");
   let user_count = current_users.length; // IR5: Keeping track of user count
   let p0 = request.query.product0;
   let p1 = request.query.product1;
   let p2 = request.query.product2;
   let p3 = request.query.product3;
   let p4 = request.query.product4;
   let error = request.query.error;
   let email = request.query.email;

   if (p0 != undefined) {
      if (error == undefined) {
         return response.redirect("./login.html?users=" + user_count + "&product0=" + p0 + "&product1=" + p1 + "&product2=" + p2 + "&product3=" + p3 + "&product4=" + p4);
      } else {
         return response.redirect("./login.html?users=" + user_count + "&error=" + error + "&email=" + email + "&product0=" + p0 + "&product1=" + p1 + "&product2=" + p2 + "&product3=" + p3 + "&product4=" + p4);
      }
   } else {
      if (error != undefined) {
         return response.redirect("./login.html?users=" + user_count + "&error=" + error + "&email=" + email);
      }
      return response.redirect("./login.html?users=" + user_count);
   }
});

// Register Page
app.get("/register", function (request, response) {
   console.log("Register");
   let user_count = current_users.length; // IR5: Keeping track of user count
   let p0 = request.query.product0;
   let p1 = request.query.product1;
   let p2 = request.query.product2;
   let p3 = request.query.product3;
   let p4 = request.query.product4;
   let error = request.query.error;
   let email = request.query.email;
   let name = request.query.name;

   if (p0 != undefined) {
      if (error == undefined) {
         return response.redirect("./register.html?users=" + user_count + "&product0=" + p0 + "&product1=" + p1 + "&product2=" + p2 + "&product3=" + p3 + "&product4=" + p4);
      } else {
         return response.redirect("./register.html?users=" + user_count + "&error=" + error + "&email=" + email + "&name=" + name + "&product0=" + p0 + "&product1=" + p1 + "&product2=" + p2 + "&product3=" + p3 + "&product4=" + p4);
      }
   } else {
      if (error != undefined) {
         return response.redirect("./register.html?users=" + user_count + "&error=" + error  + "&email=" + email + "&name=" + name);
      }
      return response.redirect("./register.html?users=" + user_count);
   }
});

// Invoice Page
app.get("/invoice", function (request, response) {
   console.log("Invoice");
   let user = request.query.user;
   let user_count = current_users.length; // IR5: Keeping track of user count
   let name = "";
   if (user != undefined) {
      name = user_reg_data[user].name;
   }
   let p0 = request.query.product0;
   let p1 = request.query.product1;
   let p2 = request.query.product2;
   let p3 = request.query.product3;
   let p4 = request.query.product4;

   response.redirect("./invoice.html?user=" + user + "&name=" + name + "&users=" + user_count + "&product0=" + p0 + "&product1=" + p1 + "&product2=" + p2 + "&product3=" + p3 + "&product4=" + p4)
});

// Order Suibmission Page
app.get("/order_submitted", function (request, response) {
   let user_count = current_users.length; // IR5: Keeping track of user count
   response.redirect("./order_submitted.html?users=" + user_count);
});

/* ~~~~ Methods ~~~~ */

// Login Method w/ data validation
app.post("/login", function (request, response) {
   // User input data
   user_input_email = request.body.email.toLowerCase();
   user_input_username_arr = user_input_email.split("@");
   user_input_username = user_input_username_arr[0];
   user_input_password = request.body.password;

   // Remove from request.body for security
   delete request.body.email;
   delete request.body.password;

   let data = qs.stringify(request.body);
   
   // Check if username is registered
   if (typeof user_reg_data[user_input_username] != 'undefined') {
      // Check if password matches
      if (user_reg_data[user_input_username].password == sha256(user_input_password)) { // IR1: Encrypted Passwords using SHA256
         // Check if no product data
         if (Object.keys(request.body).length == 0) {
            current_users.push(user_input_username);
            response.redirect("/store?user=" + user_input_username);
         } else { // If product data
            current_users.push(user_input_username);
            response.redirect("/store?user=" + user_input_username + "&" + data + "&submit=yes");
         }
      } else { // If password doesn't match
         response.redirect("/login?error=password&email=" + user_input_email + data);
      }
   } else { // If email isnt registered
      response.redirect("/login?error=email&email=" + user_input_email + data);
   }
});

// Logout Method - Logs the User Out
app.get("/logout", function (request, response) {
   current_users.splice(current_users.indexOf(request.body.user));
   response.redirect("/");
})

// Register Method - Allows Users to Register
app.post("/register", function (request, response) {
   // User input data
   user_input_name = request.body.name;
   user_input_email = request.body.email.toLowerCase();
   user_input_reemail = request.body.reemail.toLowerCase();
   user_input_password = request.body.password;
   user_input_repass = request.body.repass;
   user_input_username_parts = user_input_email.split("@");
   user_input_username = user_input_username_parts[0];

   // Delete from request.body for security
   delete request.body.name;
   delete request.body.email
   delete request.body.reemail
   delete request.body.password;
   delete request.body.repass;
   delete request.body.submit;
   
   // Regex for password, username, and email requirements (Classmates and ChatGPT)
   let password_requirements = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])(?=.*\d).{10,16}$/; // IR2: Requires 10 minimum characters, 1 number, 1 special character
   let username_requirements = /[^a-zA-Z]/;
   let email_requirements = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

   // Check if username is unique
   if (typeof user_reg_data[user_input_username] == 'undefined') {
      // Check name requirements
      if (user_input_name.length < 2 || user_input_name.length > 30 || !username_requirements.test(user_input_name)) {
         return response.redirect("/register?error=name&name=" + user_input_name + "&email=" + user_input_email);
      } else if (!email_requirements.test(user_input_email)) { // If email doesnt match requirements
         return response.redirect("/register?error=email&name=" + user_input_name + "&email=" + user_input_email);
      } else if (user_input_email != user_input_reemail) { // If the re-entered email doesn't match the email
         return response.redirect("/register?error=reemail&name=" + user_input_name + "&email=" + user_input_email);
      } else if (!password_requirements.test(user_input_password)) { // If password doesn't match requirements
         return response.redirect("/register?error=password&name=" + user_input_name + "&email=" + user_input_email);
      } else if (user_input_password != user_input_repass) { // If re-entered password doesn't match password
         return response.redirect("/register?error=repass&name=" + user_input_name + "&email=" + user_input_email);
      } 

      // Write new user to data
      user_reg_data[user_input_username] = {};
      user_reg_data[user_input_username].name = user_input_name;
      user_reg_data[user_input_username].password = sha256(user_input_password);
      user_reg_data[user_input_username].email = user_input_email;
      fs.writeFileSync("./user_data.json", JSON.stringify(user_reg_data));

      let data = qs.stringify(request.body);

      // Check if product data
      if (Object.keys(request.body).length != 0) {
         current_users.push(user_input_username);
         response.redirect("/store?user=" + user_input_username + "&name=" + user_input_name +"&" + data + "&submit=yes");
      } else { 
         current_users.push(user_input_username);
         response.redirect("/store?user=" + user_input_username);
      }

   } else {
      return response.redirect("/register?error=exists&name=" + user_input_name + "&email=" + user_input_email);
   }
});

// Purchase Method - For submitting purchases
app.post("/purchase", function (request, response) {
   let errors = {};

   for(let i in product_data) { 
      let qty = request.body['product' + i];

      // Check input parameters for validation
      if (!isNonNegInt(qty)) {  errors['product'+i] = isNonNegInt(qty, true); }
      if (!isInStock(qty, product_data[i].quantity_available)) { errors['product' + i] += "Out of Stock"; }

   }
   var qstr = qs.stringify(request.body);
   // Check if errors
   if (Object.entries(errors).length != 0) { response.redirect(`product_display.html?${qstr}`); }
   else if (request.body.user == undefined) { response.redirect("/login?" + qstr); }
   else { response.redirect(`/invoice?${qstr}`); }
});

// Order Method - Order confirmation
app.post("/order", function (request, response) {
   current_users.splice(current_users.indexOf(request.body.user));

   let purchased_arr = [request.body.product0, request.body.product1, request.body.product2, request.body.product3, request.body.product4];
   for (i = 0; i < purchased_arr.length; i++) {
      product_data[i].quantity_available = product_data[i].quantity_available - purchased_arr[i];
   }
   response.redirect("/order_submitted");
})


// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'));

// start server
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`test app listening on port ${PORT}`)
})

/* ~~~~ Functions ~~~~ */
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
   else { return true; }
}

// Password Encryption using Crypto (SHA256) from classmates & ChatGPT
function sha256(inputPass) {
   const hash = crypto.createHash('sha256');
   hash.update(inputPass);
   return hash.digest('hex');
}