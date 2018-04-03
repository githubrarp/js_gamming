var readline = require('readline-sync');
var minSoFar = -1;
var maxSoFar = 100;
var numberOfTries = 0;
var enter_number = 0;

var randomNumber = function (){
    for (var i= 0; i<8; i++){
        return (Math.floor((Math.random() * 100 )+ 1));
    }
}

exports.guessingLogic = function(){

    const ran_number = randomNumber();

    while (ran_number != enter_number){
        numberOfTries = numberOfTries + 1;
        process.stdout.write(`LOS INTENTOS SON ${numberOfTries}`);
        enter_number = readline.questionInt("Enter a number between " + (minSoFar+1) + " and " + (maxSoFar-1) + ": ");
    
        if (enter_number < minSoFar || enter_number > maxSoFar){
            process.stdout.write("INVALID ENTRY");
        }else if (enter_number == ran_number){
            process.stdout.write(`\n\n*** You WON! after ${numberOfTries} tries***\n\n`);
            process.exit();
        }else if(enter_number < ran_number){
            process.stdout.write("\n\nTo low, try again...\n\n");
            minSoFar = enter_number;
        }else{
            process.stdout.write("\n\nTo high, try again...\n\n");
            maxSoFar = enter_number;
        }
    }

}