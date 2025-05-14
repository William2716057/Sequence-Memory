const buttons = document.querySelectorAll('.circle-btn');
const startButton = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');

const colors = ['red', 'blue', 'green', 'yellow'];
let gameSequence = [];
let userSequence = [];
let score = 0;
let gameActive = false;


function startGame() {
    score = 0;
    gameSequence = [];
    userSequence = [];
    gameActive = true;
    updateScore();
    nextRound();
}


function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}


function nextRound() {
    userSequence = [];
    score++;
    updateScore();


    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);


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


function flashColor(color) {
    const btn = document.getElementById(color);
    btn.style.opacity = 1;
    setTimeout(() => {
        btn.style.opacity = 0.7;
    }, 500);
}


function handleUserClick(event) {
    if (!gameActive) return;

    const clickedColor = event.target.id;
    userSequence.push(clickedColor);

    flashColor(clickedColor);


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
    alert('Game Over! Your final score is ' + score);
}


buttons.forEach(button => {
    button.addEventListener('click', handleUserClick);
});


startButton.addEventListener('click', startGame);