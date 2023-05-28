'use strict';

// Look at the flow chart and implement it

// 0 is for player1 (why not 1) ? - Its just for making somethings handy (you can change it if u want !)
// 1 is for player2 (why not 2) ? - Its just for making somethings handy (you can change it if u want !)
// Selecting DOM elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const totalScore0El = document.querySelector('#score--0');
const totalScore1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// state variables
let scores, currentScore, activePlayer, playing;

// initialization function
const init = function () {
    // Starting Conditions

    // game can be resetted at any point of time (not only when the game is finished)
    // we can still tell JavaScript to remove a class from a classList even if that class is not present
    // we can still tell JavaScript to add a class to a classList even if that class is present (that class will not be added again)

    // Visible part of the user interface
    totalScore0El.textContent = 0;
    totalScore1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    // In starting of the game removing player--winner class from both the player elements
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    // Player 0 should be the active player in starting of the game
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    // Resetting the internal state variables back to initial state
    // Hiding the dice by adding the 'hidden' class to the classList of the diceElement
    diceEl.classList.add('hidden');

    // below 4 variables are state variables

    // At index 0 - the total score of player 1
    // At index 1 - the total score of player 2
    scores = [0, 0];

    // this cannot be inside event handler function because everytime when event is fired and it will be called then
    // currentScore variable will be redefined and will reset its value and so it will now no longer store its previous value.
    currentScore = 0;

    // when game start player 1 is active not player 2
    // 0 - player 1
    // 1 - player 2
    activePlayer = 0;

    // state variable that tells us the state of the system
    // game is being played or not ?
    // in beginning we are playing
    // playing - true
    // not playing (game finished) - false
    playing = true;
};

init();

const switchPlayer = function () {
    // Setting the current score of the active player to 0 before making the other player the active one.
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // Switch to next player
    // making the other player the active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    // player--active has the chunk of CSS styles that is applied to the player inorder to make it active visually
    // removing the player--active class from the player having that class in classList
    // adding the player--active class from the player not having that class in classList
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    // btnRoll will not execute anything if playing is false (game is finished) as there is nothing other than 'if' in this event handler function.
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden'); // making dice visible
        diceEl.src = `dice-${dice}.png`; // dice image should match the dice number generated

        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to the current totalScore
            currentScore += dice;
            // temporary (displaying to player 1)
            // but we need to display score to the player which is active (the one having the class 'player--active'

            // id is current--0 for player 1
            // id is current--1 for player 2
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    // btnHold will not execute anything if playing is false (game is finished) as there is nothing other than 'if' in this event handler function.
    if (playing) {
        // 1. Add current score to active player's total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if active player's total score >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game (active player wins)
            playing = false;
            // hide the dice when any player wins ,i.e. when game is finished
            diceEl.classList.add('hidden');
            // player--active class applied to the active player element
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            // removing the player--active class from the active player element as the game is over and player--winner class is applied to the active player element.
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
