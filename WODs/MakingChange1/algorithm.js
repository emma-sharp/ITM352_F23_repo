function makeChange(amount) {
    const coins = {
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0
    };

    //Values of the coins in pennies
    const QUARTERS_VALUE = 25;
    const DIMES_VALUE = 10;
    const NICKELS_VALUE = 5;

    //Calculate number of quarters
    coins.quarters = Math.floor(amount / QUARTERS_VALUE);
    amount = amount % QUARTERS_VALUE;

    //Calculate number of dimes
    coins.dimes = Math.floor(amount / DIMES_VALUE);
    amount = amount % DIMES_VALUE;

    //Calculate number of nickels
    coins.nickels = Math.floor(amount / NICKELS_VALUE);
    amount = amount % NICKELS_VALUE;

    //Number of pennies (remaining amount)
    coins.pennies = amount;

    return coins;
}

// Usage
const amountInPennies = 175; //$1.75
console.log(makeChange(amountInPennies));