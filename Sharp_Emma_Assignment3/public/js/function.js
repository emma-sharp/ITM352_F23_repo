/** 
 * General Purpose Functions for ALL pages
 * Author - Emma Sharp
 */

function loadJSON(service, callback) {   
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', service, false);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

let user_count = 0;

loadJSON('get_user_count', function(response) {
    user_count = JSON.parse(response).length;
});

let user = '';
let customer_name = '';

loadJSON('/get_user', function(response) {
    user_data = JSON.parse(response);
    user = user_data[0];
    customer_name = user_data[1]; 
});

let nav = document.getElementById('surf-nav');

nav.innerHTML = `
    <div class="container-sm">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <a class="navbar-brand" href="/">Emma's Surf Shop</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/boards">Boards</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/accessories">Accessories</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/apparel">Apparel</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav mb-2 mb-lg-0 ml-auto" id="login_button"></ul>
                </div>
        </nav>
    </div>
    <div class="banner">
        <div class="container text-center">
            <h1>Emma's Surf Shop</h1>
            <div id="welcome_message"></div>
            <div id="info_message"></div>
        </div>
    </div>
`

if (customer_name == null) {
    document.getElementById('login_button').innerHTML = (`
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Login
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/login">Login</a></li>
                    <li><a class="dropdown-item" href="/register">Register</a></li>
                </ul>
            </li>
        </ul>
    `);
    document.getElementById('welcome_message').innerHTML = (`
        <h3>There are currently ${user_count} other users online.</h3>
    `)
} else {
    document.getElementById('login_button').innerHTML = (`
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${user}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/logout">Logout</a></li>
                </ul>
            </li>
        </ul>
    `);

    document.getElementById('login_button').innerHTML += (`
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-cart"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/invoice">Cart</a></li>
                    <li><a class="dropdown-item" href="/clear_cart">Empty Cart</a></li>
                </ul>
            </li>
        </ul>
    `);
    


    document.getElementById('welcome_message').innerHTML = (`
        <h3>Welcome ${customer_name}. There are currently ${user_count} user(s) online.</h3>
    `)
}