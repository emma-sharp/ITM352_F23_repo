const express = require('express');
const app = express();

const fs = require('fs');
let user_reg_data = {};
let user_data_filename = __dirname + '/user_data.json';
// if the user data file exists, read it and parse it
if(fs.statSync(user_data_filename)) {
    // get the filesize and print it out 
    console.log(`${user_data_filename} has ${fs.statSync(user_data_filename).size} characters`);
    // let user_reg_data = require('./user_data.json');
    let user_reg_data_JSON = fs.readFileSync(user_data_filename, 'utf-8');
    user_reg_data = JSON.parse(user_reg_data_JSON);
} else {
    console.log(`Error! ${user_data_filename} does not exist`);
}

app.use(express.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
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

// add the following code to Assignment 2 server.js to process a login
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let the_username = request.body.username;
    let the_password = request.body.password;
    // check if the username is in user_data
    if(typeof user_reg_data[the_username] !=='undefined') {
        // check if the+password matches the password in user_reg_data
        if(user_reg_data[the_username].password === the_password) {
            // for assignment2, you need to redirect and notify them of a login error
            response.send(`${the_username} is logged in!`);
        } else {
            response.redirect(`./login`);
        }
    } else { // user does not exist, so send back to login with an error message
        response.send(`${the_username} does not exist!`);
    }

});

// on assignment2, maybe do a post to process.registration instead or something 
app.get("/register", function (request, response) {
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

 app.post("/register", function (request, response) {
    // process a simple register form
    // make a new user 
    let username = request.body.username; //convert to upper or lower case here
    user_reg_data[username] = {};
    user_reg_data[username].password = request.body.password;
    user_reg_data[username].email = request.body.email;
    // add it to the user_data.json file 
    fs.writeFileSync(user_data_filename, JSON.stringify(user_reg_data));

 });

app.listen(8080, () => console.log(`listening on port 8080`));