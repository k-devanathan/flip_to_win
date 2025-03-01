const cardsArray = [
    { id: 1, value: '😀' },
    { id: 2, value: '😁' },
    { id: 3, value: '😂' },
    { id: 4, value: '😈' },
    { id: 5, value: '😘' },
    { id: 6, value: '😄' },
    { id: 7, value: '😅' },
    { id: 8, value: '😍' },
    { id: 1, value: '😀' },
    { id: 2, value: '😁' },
    { id: 3, value: '😂' },
    { id: 4, value: '😈' },
    { id: 5, value: '😘' },
    { id: 6, value: '😄' },
    { id: 7, value: '😅' },
    { id: 8, value: '😍' }
];

let flippedCards = [];
let matchedCards = [];
let lockBoard = false;

const startButton = document.getElementById('start-button');
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const homeButton = document.getElementById('home-button');
const controls = document.getElementById('controls');

// Shuffle cards
function shuffleCards() {
    cardsArray.sort(() => Math.random() - 0.5);
}

// Create card elements
function createBoard() {
    shuffleCards();
    gameBoard.innerHTML = ''; // Clear previous cards

    cardsArray.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', card.id);
        cardElement.setAttribute('data-value', card.value);
        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    });
}

// Flip card
function flipCard() {
    if (lockBoard || flippedCards.includes(this)) return;

    this.classList.add('flip');
    this.innerText = this.getAttribute('data-value');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    lockBoard = true;

    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-id') === secondCard.getAttribute('data-id')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            firstCard.innerText = '';
            secondCard.classList.remove('flip');
            secondCard.innerText = '';
            resetBoard();
        }, 1000);
    }
}

// Reset the board after each turn
function resetBoard() {
    flippedCards = [];
    lockBoard = false;

    if (matchedCards.length === cardsArray.length) {
        setTimeout(() => {
            alert('Congratulations! You\'ve matched all the cards!');
            createBoard(); // Reset the game
        }, 500);
    }
}

// Start the game
startButton.addEventListener('click', function () {
    gameBoard.style.display = 'grid'; // Show the game board
    controls.style.display = 'block'; // Show the controls (Restart and Home buttons)
    startButton.style.display = 'none'; 
    createBoard(); // Create the game board
});

// Restart the game
restartButton.addEventListener('click', function () {
    matchedCards = [];
    flippedCards = [];
    gameBoard.style.display = 'grid'; // Show the game board
    controls.style.display = 'block'; // Show the controls
    startButton.style.display = 'none'; 
    createBoard(); // Create the game board
});

// Home button functionality
homeButton.addEventListener('click', function () {
    window.location.href = 'file:///D:/memory_game/memory.html'; 
});
