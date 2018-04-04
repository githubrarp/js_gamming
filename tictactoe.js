var readline = require('readline-sync');
var possibleMoves = [];
var playerHistory = [];
var computerHistory = [];


buildArray();
mainGameLoop();
// showArrayContent();
// drawBoard();


exports.tttLogic = function(){
    process.stdout.write("TTT game is under development");
}


function mainGameLoop(){
    while (possibleMoves.length > 2){
        playerMove();
        checkWinner(playerHistory);        
        computerMove();
        checkWinner(computerHistory);
    }
}


function buildArray(){
    for (var i = 0; i < 9; i ++){
        possibleMoves.push(i+1);
    }
}

function showArrayContent(){
    for (var i=0; i <= possibleMoves.length; i++){
        process.stdout.write(`\nPosition ${i} contains: ${possibleMoves[i]}`)
    }
}

function drawBoard(){
    process.stdout.write(`\n ${possibleMoves[0]} | ${possibleMoves[1]} | ${possibleMoves[2]}  \n`);
    process.stdout.write(`---+---+---\n`);
    process.stdout.write(` ${possibleMoves[3]} | ${possibleMoves[4]} | ${possibleMoves[5]}  \n`);
    process.stdout.write(`---+---+---\n`);
    process.stdout.write(` ${possibleMoves[6]} | ${possibleMoves[7]} | ${possibleMoves[8]}  \n`);    
}

function playerMove(){
    process.stdout.write("\n\nMake your move -> ");
    process.stdout.write(possibleMoves.join(', '));
    var player_move = readline.questionInt(" : ");
    if (validatePlayerMove(player_move)){
        playerHistory.push(player_move);
        possibleMoves.splice(possibleMoves.indexOf(player_move), 1);
    }
    
}

function computerMove(){
    var player_move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    if (validatePlayerMove(player_move)){
        computerHistory.push(player_move);        
        process.stdout.write(`Computer moved: ${player_move}`);
        possibleMoves.splice(possibleMoves.indexOf(player_move), 1);
    }
}

function validatePlayerMove(player_move){
    if (possibleMoves.includes(player_move)){
        return true;
    } else {
        process.stdout.write(`\nNot a vadid move.  Please chose from ${possibleMoves.join(', ')}.`);
        return false;
    }
}


function checkWinner(arrayToCheck){
    if ((arrayToCheck.includes(1) && arrayToCheck.includes(2) && arrayToCheck.includes(3)) ||
    (arrayToCheck.includes(4) && arrayToCheck.includes(5) && arrayToCheck.includes(6)) ||
    (arrayToCheck.includes(7) && arrayToCheck.includes(8) && arrayToCheck.includes(9)) ||
    (arrayToCheck.includes(1) && arrayToCheck.includes(4) && arrayToCheck.includes(7)) ||
    (arrayToCheck.includes(2) && arrayToCheck.includes(5) && arrayToCheck.includes(8)) ||
    (arrayToCheck.includes(3) && arrayToCheck.includes(6) && arrayToCheck.includes(9)) ||
    (arrayToCheck.includes(1) && arrayToCheck.includes(5) && arrayToCheck.includes(9)) ||
    (arrayToCheck.includes(3) && arrayToCheck.includes(5) && arrayToCheck.includes(7)) ||
    (arrayToCheck.includes(2) && arrayToCheck.includes(5) && arrayToCheck.includes(8))){
    process.stdout.write("\n\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n" + 
    "!!!   G A M E - O V E R   !!!\n" + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n");
    process.exit();
    }
}

showArrayContent();
// process.stdout.write(`\n\nPlayer move history is: ${playerHistory}.
//                         \nComputer move history is: ${computerHistory}`);