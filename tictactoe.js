exports.tttLogic = function(){
    process.stdout.write("TTT game is under development");
}

var readline = require('readline-sync');
var arrayDiff = require('array-diff-array');

// var possibleMoves = new Array();
// var validEntries = new Array();
// var moveHistory = new Array();
var humanHistory = new Array();
var computerHistory = new Array();

possibleMoves = buildArray();
mainGameLoop();


function mainGameLoop(){
    while (true){
        makeAmove(userMark = 'H');
        checkWinner(humanHistory);
        // IS_TIED?
        makeAmove(userMark = 'C');        
        checkWinner(computerHistory);
        process.stdout.write(`\nPlayed history is...`);
        process.stdout.write(`\nHuman: ${humanHistory}`);
        process.stdout.write(`\nComputer: ${computerHistory}\n`);
    }
}

function buildArray(){
    var boardPositions = new Array();
    for (var i = 0; i < 9; i ++){
        boardPositions.push(String(i+1));
    }
    return boardPositions;
}

function makeAmove(userMark){
    do{
        if (userMark == 'H'){
            process.stdout.write("\n\nMake your move -> ");
            process.stdout.write(possibleMoves.join(', '));
            var player_move = readline.questionInt(" : ");
        }else if(userMark == 'C'){
            do{
                var player_move = Math.floor((Math.random() * 10) + 1 );
                console.log(`EN ESTE CASO LA COMPU RAMDON ES: ${player_move}`);
            } while ((humanHistory.includes(player_move) || (computerHistory.includes(player_move))));
        }
        showMoveOnBoard(player_move, userMark);
    } while (isValidEntry(player_move))
}

function isValidEntry(player_move){
    if (player_move < 1 || player_move > 9 || humanHistory.includes(player_move) || computerHistory.includes(player_move) ){
        process.stdout.write(`\nINVALID ENTRY. You must choose from valid entries: `); // ${validEntries});
        return false;
    }
    return String(player_move);
}

function showMoveOnBoard(player_move, userMark){
    possibleMoves.forEach(element => {
        if (element == player_move){
            possibleMoves[possibleMoves.indexOf(element)] = userMark;
            drawBoard();
            playLog(player_move, userMark);
        }
    });
}

function playLog(player_move, userMark){
    if (userMark == 'H'){
        humanHistory.push(player_move);
    }else if(userMark == 'C'){
        computerHistory.push(player_move);
    }else{
        process.stdout.write("\n*** ERR: Please report this error (playerLog function ***\n)");
    }
}

function drawBoard(){
    process.stdout.write(`\n ${possibleMoves[0]} | ${possibleMoves[1]} | ${possibleMoves[2]}  \n`);
    process.stdout.write(`---+---+---\n`);
    process.stdout.write(` ${possibleMoves[3]} | ${possibleMoves[4]} | ${possibleMoves[5]}  \n`);
    process.stdout.write(`---+---+---\n`);
    process.stdout.write(` ${possibleMoves[6]} | ${possibleMoves[7]} | ${possibleMoves[8]}  \n`);
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