/** 
 * Functions for /login.html
 * Author - Emma Sharp
 */

function login_validation() {
    let login_params = (new URL(document.location)).searchParams;

    if (login_params.has("error")) {
        document.getElementById('email').value = login_params.get("email");
        if (login_params.get("error") == "email") {
            document.getElementById("email_error_msg").innerHTML = `
                <font color="red">An account with this email does not exist.</font>
            `;
        } else if (login_params.get("error") == "password") {
            document.getElementById("password_error_msg").innerHTML = `
                <font color="red">Password is incorrect</font>
            `;
        }
    }
}