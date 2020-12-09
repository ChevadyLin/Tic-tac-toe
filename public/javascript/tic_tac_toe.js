const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.querySelector('#winning-message');
const restartButton = document.querySelector('#restart');
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let CIRCLE_CLASS = 'circle';
let X_CLASS = 'x';
let circleTurn;

restartButton.addEventListener('click', startGame);

startGame();

function startGame(){
    for(cell of cellElements) {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    }
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    //Place marks
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    //Check for win
    if(checkWin(currentClass)){
        endGame(false);
    }
    //Check for draw
    else if(isDraw()){
        endGame(true);
    }
    else {
        //Switch turns
        swapTurn();
        setBoardHoverClass();
    }
};

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(element => {
       return element.classList.contains(CIRCLE_CLASS) || element.classList.contains(X_CLASS);
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

