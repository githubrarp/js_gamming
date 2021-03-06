exports.tttLogic = function(){
    process.stdout.write("TTT game is under development");
}

//readline-sync module is used for data entry
var readline = require('readline-sync');

//humanHistory and computerHistory arrays will keep track of human and computer moves
var humanHistory = new Array();
var computerHistory = new Array();

//possibleMoves is the initial array built with 9 elements for the board
possibleMoves = buildArray();

//mainGameLoop is the main function of the game, when program is run the loop starts until game ends
mainGameLoop();

//implementation for mainGameLoop.  It starts by displaying a welcome message to then draw the board
//in display and it initiate a loop that will initiate corresponding functions for human and computer
//to make a move and check if there's a winner (or tied game).
function mainGameLoop(){
    process.stdout.write("\nWelcome, this is the typical X-O game except that board will show 'H(uman)'");
    process.stdout.write("\nfor you and 'C(omputer)' for my moves.  You'll play first, let's get started.\n");
    drawBoard();
    while (true){
        makeAmove(userMark = 'H');
        checkWinner(humanHistory);
        makeAmove(userMark = 'C');        
        checkWinner(computerHistory);
    }
}

//this function is called only once and it initialize the array with all 9 possible positions when game starts
function buildArray(){
    var boardPositions = new Array();
    for (var i = 0; i < 9; i ++){
        boardPositions.push(String(i+1));
    }
    return boardPositions;
}

//this function is responsible for executing the 'moves' (both for computer and human).  During each game move
//this function will invoke corresponding functions for validating the moves and showing them on the game board
function makeAmove(userMark){
    if (userMark == 'H'){
        do{
            process.stdout.write("\n\nMake your move -> ");
            process.stdout.write(possibleMoves.join(', '));
            var player_move = readline.questionInt(" ", process.stdout.write(":"));
        } while (!isValidEntry(player_move, userMark))
    }else if(userMark == 'C'){
        do{
            var player_move = Math.floor((Math.random() * 10) + 1 );
            process.stdout.write(`\nComputer played: ${player_move}\n`);
        } while (!isValidEntry(player_move, userMark))
    }
    showMoveOnBoard(player_move, userMark);
}

//this function check whether moves are valid because they are between 1 and 9 and have not being played before
function isValidEntry(player_move, userMark){
    if (player_move < 1 || player_move > 9 || humanHistory.includes(player_move) || computerHistory.includes(player_move) ){
        if (userMark == 'H'){
            process.stdout.write(`\nINVALID ENTRY. You must choose from valid entries: `); // ${validEntries});
        }
        return false;
    }
    return player_move;
}

//this function is responsible for displaying the board after every move is played
function showMoveOnBoard(player_move, userMark){
    possibleMoves.forEach(element => {
        if (element == player_move){
            possibleMoves[possibleMoves.indexOf(element)] = userMark;
            drawBoard();
            playLog(player_move, userMark);
        }
    });
}

//this function keeps tracks of every player's move and will display it after every move is played
function playLog(player_move, userMark){
    if (userMark == 'H'){
        humanHistory.push(player_move);
    }else if(userMark == 'C'){
        computerHistory.push(player_move);
    }else{
        process.stdout.write("\n*** ERR: Please report this error (playerLog function ***\n)");
    }
    process.stdout.write(`\nPlayed history is...`);
    process.stdout.write(`\nHuman: ${humanHistory}`);
    process.stdout.write(`\nComputer: ${computerHistory}\n`);
}

//this function is responsible for building the board to be displayed
function drawBoard(){
    process.stdout.write(`\n ${possibleMoves[0]} | ${possibleMoves[1]} | ${possibleMoves[2]}  \n`);
    process.stdout.write(`---+---+---\n`);
    process.stdout.write(` ${possibleMoves[3]} | ${possibleMoves[4]} | ${possibleMoves[5]}  \n`);
    process.stdout.write(`---+---+---\n`);
    process.stdout.write(` ${possibleMoves[6]} | ${possibleMoves[7]} | ${possibleMoves[8]}  \n`);
}

//this function is responsible for checking for winning combinations after every move.  It also validate
//if game is tied by comparing total number of moves agains total number of positions on the board (9)
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
        goodBye("We got a Winner!!");
    }else if(humanHistory.length + computerHistory.length == 9){
        goodBye("It's a tied game!");
    }
}

//this function is called at the end of the game to display a good-bye message showing either if game
//was tied or if a player won
function goodBye(winOrTied){
    process.stdout.write("\n\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n" +
    "!!!                       !!!\n" + "!!!   "+ winOrTied +"   !!!\n" +
    "!!!   G A M E - O V E R   !!!\n" + "!!!                       !!!\n" +
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n");
    process.exit();    
}