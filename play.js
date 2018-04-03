var readline = require('readline-sync');
var menu = require("./menu");
var guessing = require("./guessing");

menu.main_menu();

var selection = readline.question("Enter your selection or 0 to exit: ").toString().trim();

if (selection == '1'){
    guessing.guessingLogic();
    // process.stdout.write("Choose: " + selection);
}else if(selection == '0'){
    process.stdout.write("\nGood Bye!\n");
    process.exit();
}else{
    process.stdout.write("\nERROR: Invalid Entry.\n");
}
