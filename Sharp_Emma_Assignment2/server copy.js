const express = require('express');
const app = express();
var product_data = require(__dirname + "/product_data.json");
const qs = require('querystring');
let user_reg_data = {};
let user_data_filename = __dirname + '/user_data.json';
// if the user data file exists, read it and parse it
if (fs.existsSync(user_data_filename)) {
    // get the filesize and print it out
    console.log(`${user_data_filename} has ${fs.statSync(user_data_filename).size} characters.`);
    // let user_reg_data = require('./user_data.json');
    let user_reg_data_JSON = fs.readFileSync(user_data_filename, 'utf-8');
    user_reg_data = JSON.parse(user_reg_data_JSON);
} else {
    console.log(`Error! ${user_data_filename} does not exist!`);
}


app.use(express.urlencoded({ extended: true }));


app.get("/login.html", function (request, response) {
   // Give a simple login form
   str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
   `;
   response.send(str);
});

app.post("/login.html", function (request, response) {
   // Process login form POST and redirect to logged in page if ok, back to login page if not
   let the_username = request.body.username;
   let the_password = request.body.password;
   // chexk if the_username is in user_data
   if (typeof user_reg_data[the_username] !== 'undefined') {
       // check if the_password matches the password in user_reg_data
       if (user_reg_data[the_username].password === the_password) {
           response.send(`${the_username} is logged in!`);
       } else {
           response.redirect('./login');
       }
   } else { // user does not exist, so send back to login
       response.redirect('./login');
   }
});

app.get("/registeration.html", function (request, response) {
   // Give a simple register form
   str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
   `;
   response.send(str);
});

app.post("/register.html", function (request, response) {
   // process a simple register form
   // make a new user
   let username = request.body.username;
   user_reg_data[username] = {};
   user_reg_data[username].password = request.body.password;
   user_reg_data[username].email = request.body.email;
   // add it to the user_data.json
   fs.writeFileSync(user_data_filename, JSON.stringify(user_reg_data));

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