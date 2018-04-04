var readline = require('readline-sync');
var menu = require("./menu");
var guessing = require("./guessing");
var ttt = require("./tictactoe");

menu.main_menu();

var selection = readline.question("Enter your selection or 0 to exit: ").toString().trim();

if (selection == '1'){
    guessing.guessingLogic();
}else if(selection == '2'){
    ttt.tttLogic();
}else if(selection == '0'){
    process.stdout.write("\nGood Bye!\n");
    process.exit();
}else{
    process.stdout.write("\nERROR: Invalid Entry.\n");
}
