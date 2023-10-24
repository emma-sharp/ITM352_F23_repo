month = "February";
day = 3;
year = 2003;

step1 = 3;
step2 = parseInt(step1/4);
step3 = step1 + step2;
step4 = 3; // mothnum
step6 = step4 + step3;
step7 = day + step6;
step8 = step7;
// 1900's, not jan or feb
step9 = step8 - 1;
step10 = step9 % 7;

console.log(step10);