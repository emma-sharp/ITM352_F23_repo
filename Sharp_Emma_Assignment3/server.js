const express = require('express');
const app = express();
var product_data = require(__dirname + "/product_data.json");

// Required Dependencies
const fs = require('fs');
const qs = require('querystring');
const crypto = require('crypto');

const cookieParser  = require('cookie-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');

app.use(cookieParser());
app.use(session ({
   secret:"mysecret",
   resave: true,
   saveUninitialized: true,
   cookie: {
      maxAge: 15 * 60 * 1000
   }
}));

app.use(function(request, response, next) {
   if (!request.cookies.cart) { response.cookie('cart', JSON.stringify([[0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,]])); }
   if (request.session && request.session.cookie && request.session.cookie.expires < new Date()) {
      request.session.destroy((error => {
         console.log(error);
      }));
      console.log("User timeout");
   }

   next();
})

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

app.get("/get_user_count", function(request, response) {
   response.json(current_users);
})

app.get("/get_user", function(request, response) {
   let user_info = [];
   let user = request.session.user;
   let name = request.session.name;
   user_info.push(user);
   user_info.push(name);

   response.json(user_info);
});

app.get("/get_cart", function(request, response) {
   response.json(JSON.parse(request.cookies.cart));
})

app.get("/clear_cart", function(request, response) {
   response.cookie('cart', JSON.stringify([[0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,]]));
   response.redirect("./landing.html?cart=cleared");
})

app.get("/get_sizes", function(request, response) {
   response.json(JSON.parse(request.cookies.sizes));
})

/* ~~~~ Routing for Pages ~~~~ */

// Main Page
app.get("/", function (request, response) {
   console.log("Landing/Index");

   response.redirect("./landing.html" ); 

});

// Products_display
app.get("/boards", function (request, response) {
   console.log("Boards");

   let p0 = request.query.product0;
   let p1 = request.query.product1;
   let p2 = request.query.product2;
   let p3 = request.query.product3;
   let p4 = request.query.product4;
   let p5 = request.query.product5;
   let error = request.query.error;
   let cart = request.query.cart;

   if (cart != undefined) { return response.redirect(`./boards.html?cart=${cart}`); }
   if (p0 != undefined) { return response.redirect(`./boards.html?error=${error}&product0=${p0}&product1=${p1}&product2=${p2}&product3=${p3}&product4=${p4}&product5=${p5}`) }
   
   response.redirect('./boards.html');
});

app.get("/accessories", function (request, response) {
   console.log("Accessories");

   let p0 = request.query.product0;
   let p1 = request.query.product1;
   let p2 = request.query.product2;
   let p3 = request.query.product3;
   let p4 = request.query.product4;
   let p5 = request.query.product5;
   let error = request.query.error;
   let cart = request.query.cart;

   if (cart != undefined) { return response.redirect(`./accessories.html?cart=${cart}`); }
   if (p0 != undefined) { return response.redirect(`./accessories.html?error=${error}&product0=${p0}&product1=${p1}&product2=${p2}&product3=${p3}&product4=${p4}&product5=${p5}`) }
   
   response.redirect('./accessories.html');
});

app.get("/apparel", function (request, response) {
   console.log("Apparel");

   let p0 = request.query.product0;
   let p1 = request.query.product1;
   let p2 = request.query.product2;
   let p3 = request.query.product3;
   let p4 = request.query.product4;
   let p5 = request.query.product5;
   let error = request.query.error;
   let cart = request.query.cart;

   if (cart != undefined) { return response.redirect(`./apparel.html?cart=${cart}`); }
   if (p0 != undefined) { return response.redirect(`./apparel.html?error=${error}&product0=${p0}&product1=${p1}&product2=${p2}&product3=${p3}&product4=${p4}&product5=${p5}`) }
   
   response.redirect('./apparel.html');
});


// Login Page
app.get("/login", function (request, response) {
   console.log("Login");
   let error = request.query.error;
   let email = request.query.email;

   if (error != undefined) { return response.redirect("./login.html?error=" + error + "&email=" + email); }
   else { return response.redirect("./login.html"); }
});

// Register Page
app.get("/register", function (request, response) {
   console.log("Register");

   let error = request.query.error;
   let email = request.query.email;
   let name = request.query.name;

   if (error != undefined) { return response.redirect("./register.html?error=" + error  + "&email=" + email + "&name=" + name); }
   else { return response.redirect("./register.html"); }
});

// Invoice Page
app.get("/invoice", function (request, response) {
   console.log("Invoice");
   if (JSON.parse(request.cookies.cart) == [[0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,]]) { return response.redirect("./landing.html?cart=empty"); }
   response.redirect("./invoice.html");
});

// Order Suibmission Page
app.get("/order_submitted", function (request, response) {
   console.log("Navigating to Confirmation");
    // Carrying over parameters
    let name = request.session.name;
    let user = request.session.user;

    // INSERT MAIL LOGIC HERE
    let invoice_str = `Thank you for your order!<table border><th>Quantity</th><th>Item</th>`;
    let cart = JSON.parse(request.cookies.cart);

    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart[i].length; j++) {
            if (cart[i][j] <= 0) { continue; }
            let type;
            switch (i) {
                case 0: type = "boards"; break;
                case 1: type = "accessories"; break;
                case 2: type = "apparel"; break;
            }
            
            qty = cart[i][j];
            invoice_str += `<tr><td>${qty}</td><td>${product_data[type][j].name}</td></tr>`;
        }
    }
    //eosg ijle axln xmjc 

    invoice_str += '</table>';
    
    let user_email = user_reg_data[request.session.user].email;
    
    let transporter = nodemailer.createTransport({
        host: "mail.hawaii.edu",
        port: 25,
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    });

    let mail_options = {
        from: 'emmasharp@mail.com',
        to: user_email,
        subject: "Fake Invoice",
        html: invoice_str
    };
    

    let url = '';

    transporter.sendMail(mail_options, function(error, info) {
        if (error) { 
            invoice_str += '<br>There was an error and your invoice could not be mailed.</br>'; 

            url = '&error=true';
        }
        else { invoice_str += 'Your invoice has been mailed'; }
    });

    request.session.destroy(function(){
        console.log("user logged out.")
    });

    return response.redirect("./order_submitted.html?user=" + user + "&name=" + name + url);
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
   delete request.body;
   
   // Check if username is registered
   if (typeof user_reg_data[user_input_username] != 'undefined') {
      // Check if password matches
      if (user_reg_data[user_input_username].password == sha256(user_input_password)) { // IR1: Encrypted Passwords using SHA256
         current_users.push(user_input_username);
         request.session.user = user_input_username;
         request.session.name = user_reg_data[user_input_username].name;

         response.redirect("/boards");
      } else { // If password doesn't match
         response.redirect("/login?error=password&email=" + user_input_email);
      }
   } else { // If email isnt registered
      response.redirect("/login?error=email&email=" + user_input_email);
   }
});

// Logout Method - Logs the User Out
app.get("/logout", function (request, response) {
   current_users.splice(current_users.indexOf(request.session.user));
   request.session.destroy();
   console.log("User logged out");
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
   delete request.body;
   
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

      // Check if product data
      current_users.push(user_input_username);
      request.session.user = user_input_username;
      request.session.name = user_input_name;
      response.redirect("/boards");
   } else {
      return response.redirect("/register?error=exists&name=" + user_input_name + "&email=" + user_input_email);
   }
});

app.post("/add_to_cart", function (request, response) {
   let valid = true;
   let url = "";
   let cart = JSON.parse(request.cookies.cart);
   let type = request.body.type;
   let sizes = [];

   console.log(cart);

   let index;
   switch (type) {
      case 'boards':
         index = 0; break;
      case 'accessories':
         index = 1; break;
      case 'apparel':
         index = 2; break;
   }

   for (let i in product_data[type]) {
      let qty = request.body['product' + i];
      let size = request.body['size' + i];
      sizes.push(size);

      // Check input parameters for validation
      if (!isNonNegInt(qty)) {  valid = false; }
      if (!isInStock(qty, product_data[type][i].quantity_available)) { valid = false; }

      url += `&product${i}=${qty}`;
      cart[index][i] = Number(qty);

   }

   if (!valid) { return response.redirect(`/${type}?error=true${url}`); }

   if (type == 'apparel') {
      response.cookie('sizes', JSON.stringify(sizes));
   }

   response.cookie('cart', JSON.stringify(cart));

   if (!request.session.user) { response.redirect("/login"); }
   else { response.redirect(`/${type}?cart=updated`); }
})

// Order Method - Order confirmation
app.post("/order", function (request, response) {
   current_users.splice(current_users.indexOf(request.body.user));

   let cart = JSON.parse(request.cookies.cart);
   for (i = 0; i < cart.length; i++) {
      for (let j = 0; j < cart[i].length; j++) {

         if (cart[i][j] == 0) { continue; }
         let type;
         switch (i) {
         case 0:
            type = 'boards'; break;
         case 1:
            type = 'accessories'; break;
         case 2:
            type = 'apparel'; break;
      }

         product_data[type][j].quantity_available -= cart[i][j];
      }
      
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