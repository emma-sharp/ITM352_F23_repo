/** 
 * General Purpose Functions for ALL pages
 * Author - Emma Sharp
 */

let params = (new URL(document.location)).searchParams;

function navbar() {
    let nav = document.getElementById('surf-nav');


    nav.innerHTML = `
        <div class="container-sm">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <a class="navbar-brand" href="#" onclick="page('')">Emma's Surf Shop</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#" onclick="page('')">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" onclick="page('store')">Store</a>
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
            </div>
        </div>
    `
}

function loginButton() {
    if (!params.has("user")) {
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
            <h3>There are currently ${params.get('users')} other users online.</h3>
        `)
    } else {
        document.getElementById('login_button').innerHTML = (`
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${params.get('user')}
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/logout">Logout</a></li>
                    </ul>
                </li>
            </ul>
        `);

        document.getElementById('welcome_message').innerHTML = (`
            <h3>Welcome ${params.get('name')}. There are currently ${params.get('users')} other users online.</h3>
        `)
    }
}

function page(route) {
    if (params.has("user")) {
        window.location.assign(`/${route}?user=${params.get('user')}`);
    } else {
        window.location.assign(`/${route}`);
    }
}
