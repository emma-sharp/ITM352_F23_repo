function navbar() {
    let nav = document.getElementById('surf-nav');
    nav.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
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
                        <a class="nav-link" href="./product_display.html">Store</a>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="banner">
            <div class="container text-center">
                <h1>Emma's Surf Shop</h1>
            </div>
        </div>
    `
}