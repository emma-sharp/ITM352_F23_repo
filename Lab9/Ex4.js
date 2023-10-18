/**
 * Checks if a value is a non-negative integer.
 * @param {number} value - The value to be checked.
 * @param {boolean} returnErrors - Determines whether to return errors or a boolean result.
 * @returns {boolean|string[]} - If returnErrors is true, returns an array of errors; otherwise, returns a boolean indicating the result.
 */

function isNonNegativeInteger(value, returnErrors = false) {
    const errors = []; // assume no errors at first
    
    if(Number(value) != value) errors.push('Not a number!'); // Check if string is a number value

    if(value < 0) errors.push('Negative value!'); // Check if it is non-negative
    
    if(parseInt(value) != value) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

attributes  =  "Emma;20;20.5;-19.5";
let pieces = attributes.split(';');
for(let part of pieces) {
    console.log(`${part} is a quantity ${isNonNegativeInteger(part, true)}`);
}
