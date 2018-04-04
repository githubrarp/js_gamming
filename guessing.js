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
        enter_number = readline.questionInt("\nEnter a number between " + (minSoFar+1) + " and " + (maxSoFar-1) + ": ");
    
        if (enter_number < minSoFar || enter_number > maxSoFar){
            process.stdout.write("\n\nINVALID ENTRY\n\n");
        }else if(minSoFar == maxSoFar){
            process.stdout.write(`Can not believe you did not guessed it after ${numberOfTries} tries.  It was: ${minSoFar}`);
            process.exit();
        }else if (enter_number == ran_number){
            process.stdout.write(`\n\n*** You WON! after ${numberOfTries} tries***\n\n`);
            process.exit();
        }else if(enter_number < ran_number){
            process.stdout.write("\n\nTo LOW, try again...\n\n");
            minSoFar = enter_number;
        }else{
            process.stdout.write("\n\nTo HIGH, try again...\n\n");
            maxSoFar = enter_number;
        }
    }

}