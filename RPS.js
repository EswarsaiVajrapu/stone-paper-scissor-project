document.addEventListener('DOMContentLoaded', function () {
// Game elements
const choices = document.querySelectorAll('.choice');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultArea = document.getElementById('result-area');
const playAgainBtn = document.getElementById('play-again');
const playAgainWinBtn = document.getElementById('play-again-win');
const playerPickEmoji = document.getElementById('player-pick-emoji');
const playerPickText = document.getElementById('player-pick-text');
const computerPickEmoji = document.getElementById('computer-pick-emoji');
const computerPickText = document.getElementById('computer-pick-text');
const resultMessage = document.getElementById('result-message');
const winScreen = document.getElementById('win-screen');
const rulesBtn = document.getElementById('rules-btn');
const rulesModal = document.getElementById('rules-modal');
const closeRulesBtn = document.getElementById('close-rules');
// Game state
let playerScore = 0;
let computerScore = 0;
const WINNING_SCORE = 5;
// Emoji mapping
const choiceEmojis = {
    rock: {
        emoji: '✊', text: 'Rock'
    },
    paper: {
        emoji: '✋', text: 'Paper'
    } ,
    scissors: {
        emoji: '✌️', text: 'Scissors'
    }
} ;
// Event listeners
choices.forEach(choice => {
    choice.addEventListener('click', playRound);
});

playAgainBtn.addEventListener('click', resetRound);
playAgainWinBtn.addEventListener('click', resetGame);
rulesBtn.addEventListener('click', () => rulesModal.style.display = 'flex');
closeRulesBtn.addEventListener('click', () => rulesModal.style.display = 'none');
// Close modal when clicking outside
rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
});
// Main game function
function playRound(e) {
    const playerChoice = e.currentTarget.getAttribute('data-choice');
    const computerChoice = getComputerChoice();

    // Hide choices and show result area
    document.querySelector('.choices').style.display = 'none';
    resultArea.style.display = 'flex';

    // Display picks
    playerPickEmoji.textContent = choiceEmojis[playerChoice].emoji;
    playerPickText.textContent = choiceEmojis[playerChoice].text;
    computerPickEmoji.textContent = choiceEmojis[computerChoice].emoji;
    computerPickText.textContent = choiceEmojis[computerChoice].text;

    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);

    // Update score and display result
    updateScore(result);
    displayResult(result);

    // Check for game win
    if (playerScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
        showWinScreen();
    }
}

// Computer makes random choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine the winner of the round
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }

    if ((playerChoice === 'rock' && computerChoice === 'scissors') || (playerChoice === 'paper' && computerChoice === 'rock') || (playerChoice === 'scissors' && computerChoice === 'paper')) {
        return 'player';
    }

    else {
        return 'computer';
    }
}
// Update the score
function updateScore(result) {
    if (result === 'player') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    }
    else if (result === 'computer') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}
// Display the result message
function displayResult(result) {
    if (result === 'draw') {
        resultMessage.textContent = "TIE UP 😐";
    }
    else if (result === 'player') {
        resultMessage.textContent = "YOU WIN AGAINST PC 🎉";
    }
    else if (result === 'computer'){
        resultMessage.textContent = "YOU LOSE AGAINST PC 😢";
    }
}
// Reset the round (show choices again)
function resetRound() {
    document.querySelector('.choices').style.display = 'flex';
    resultArea.style.display = 'none';
}
// Show win screen when someone reaches winning score
function showWinScreen() {
    resultArea.style.display = 'none';
    winScreen.style.display = 'flex';
}
// Reset the entire game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    document.querySelector('.choices').style.display = 'flex';
    resultArea.style.display = 'none';
    winScreen.style.display = 'none';
}
});