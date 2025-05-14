//define constants
const buttons = document.querySelectorAll('circle-btn');
const startButton = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');

const buttons = ['one', 'two', 'three', 'four'];
let gameSequence = [];
let userSequence = [];
let score = 0; //store previous later
let gameActive = false;
//functions
function startGame() {
    //score keep
    score = 0;
    //initialisations
    gameSequence = [];
    userSequence = [];
    gameActive = true;
    updateScore();
    nextRound();
}

//update current score
function scoreUpdate() {
    scoreDisplay.textContent = `Current High: ${score}`;
}

//generate next round
function nextRound() {
    userSequence = [];
    score++;
    scoreUpdate();

    //store and add sequences
    const randomButton = buttons[math.floor(math.random() * buttons.length)];
    gameSequence.push(randomButton);

    showSequence();
}

function showSequence() {
    let index = 0;
    const interval = setInterval(() => {
        flashColor(gameSequence[index]);
        index++;
        if (index === gameSequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

//flash the buttons
function flashButton(button) {
    const btn = document.getElementById(button);
    btn.style.opacity = 1;
    setTimeout(() => {
        btn.style.opacity = 0.7;
    }, 500);
}

function handleUserClick(event) {
    if (!gameActive) return;

    const clickedButton = event.target.id;
    userSequence.push(clickedButton);


    flashButton(clickedButton);

    //match with user
    if (!checkUserSequence()) {
        endGame();
    } else if (userSequence.length === gameSequence.length) {
        setTimeout(nextRound, 1000);
    }
}

function checkUserSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;

}

function endGame() {
    gameActive = false;
    //change here
    alert('Final score + score');
}

//Event listeners for buttons
buttons.forEach(button => {
    button.addEventListener('click', handleUser);
});

startButton.addEventListener('click', startGame);