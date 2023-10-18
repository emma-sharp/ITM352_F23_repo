function isNonNegativeInteger(value, returnErrors = false) {
    const errors = []; // assume no errors at first

    if (Number(value) != value) errors.push('Not a number!'); // Check if string is a number value
    if (value < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(value) != value) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length === 0);
}

const attributes = "Emma;20;20.5;-19.5";
const pieces = attributes.split(';');

pieces.forEach((item, index) => {
    console.log(`part ${index} is ${(isNonNegativeInteger(item) ? 'a' : 'not a')} quantity`);
});


function download(url, callback) {
    setTimeout(() => {
        // Simulated download of the picture
        console.log(`Downloading ${url} ...`);
        const picture_data = "image data:XOXOXO";
        callback(picture_data);
    }, 3 * 1000);
}

function process(picture) {
    console.log(`Processing ${picture}`);
}

let url = 'https://www.example.com/big_pic.jpg';

download(url, process);



function calculateTaxes(monthly_sales, tax_rate) {
    if (tax_rate < 0 || tax_rate > 1) {
        throw new Error('Tax rate must be between 0 and 1 (decimal form).');
    }

    // Calculate tax owing for each monthly sale
    const tax_owing = monthly_sales.map(sale => sale * tax_rate);

    return tax_owing;
}

// Example usage:
const monthly_sales = [1000, 1500, 2000, 2500];
const tax_rate = 0.10; // 10% tax

const tax_owing = calculateTaxes(monthly_sales, tax_rate);
console.log(tax_owing); // Output: [100, 150, 200, 250]
