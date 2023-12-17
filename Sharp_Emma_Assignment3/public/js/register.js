/** 
 * Functions for /registration.html
 * Author - Emma Sharp
 */

function register_validation() {
    let register_params = (new URL(document.location)).searchParams;

    if (register_params.has("error")) {
        document.getElementById('name').value = register_params.get("name");
        document.getElementById('email').value = register_params.get("email");
        if (register_params.get("error") == "email") {
            document.getElementById("email_error_msg").innerHTML = `
                <font color="red">Please enter a valid email.</font>
            `;
        } else if (register_params.get("error") == "password") {
            document.getElementById("password_error_msg").innerHTML = `
                <font color="red">Please enter a valid password (10 min char, 1 number, 1 special character)</font>
            `;
        } else if (register_params.get("error") == "repass") {
            document.getElementById("repass_error_msg").innerHTML = `
                <font color="red">Passwords dont match!</font>
            `;
        } else if (register_params.get("error") == "reemail") {
            document.getElementById("reemail_error_msg").innerHTML = `
                <font color="red">Emails dont match!</font>
            `;
        } else if (register_params.get("error") == "exists") {
            document.getElementById("email_error_msg").innerHTML = `
                <font color="red">An account with this email already exists!</font>
            `;
        } else if (register_params.get("error") == "name") {
            document.getElementById("name_error_msg").innerHTML = `
                <font color="red">Please enter your full name (First Last)</font>
            `;
        }
    }
}