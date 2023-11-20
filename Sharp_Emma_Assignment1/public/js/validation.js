let globalErrors = [];
// function for validating whether an input is a valid number
function isNonNegIntAndStock(value, stock, return_errors = false) {
    errors = [];
    if (value == '') { value = 0; } // if no input, make equivalent to 0
    if (Number(value) != value) { errors.push('<font color="red">Not a number!</font>'); } // validate if a number, if not then add an error
    else if (value < 0) { errors.push('<font color="red">Negative value!</font>'); } // validate if a postive number, if not then add an error
    else if (parseInt(value) != value) { errors.push('<font color="red">Not an integer!</font>'); } // validate if an int, if not then add an error
    else if (parseInt(value) > stock) { errors.push('<font color="red">Out of Stock!</font>'); } // validate if in stock, if not then add an error
    return return_errors ? errors : (errors.length == 0);
}
    
// function for validating an input
function checkQuantityTextbox(textbox, stock) {
    errs = isNonNegIntAndStock(textbox.value, stock, true);
    if (errs.length == 0) { errs = ['You want: ']; }
    if (textbox.value.trim() == '') { errs = ['Quantity']; }
    document.getElementById(`${textbox.id}-label`).innerHTML = errs.join(", ");
}
