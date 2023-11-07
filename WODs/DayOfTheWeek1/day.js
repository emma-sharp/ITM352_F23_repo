function getDayOfWeek(day, month, year) {
   
    const monthKey = {
        January: 0, February: 3, March: 2, April: 5, May: 0, June: 3, July: 5, August: 1, September: 4, October: 6, November: 2, December: 4
    };

    if(month === "January" || month === "February") {
        year--;
    }

    //Calculations using the algorithms
    let k = year % 100;
    let j = Math.floor(year / 100);

    let dayOfWeek = (day + monthKey[month] + k +Math.floor(k/4) + Math.floor(j/4) +5*j) % 7;

    //Array
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //Output
    console.log(`${month} ${day}, ${year} is a ${daysOfWeek[dayOfWeek]}`);
}
    
    // My birthday
    getDayOfWeek(3, "February", 2003);
