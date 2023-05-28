'use strict';

// // document.querySelector('.message') gives you the element which has class-name = "message"
// console.log(document.querySelector('.message'));
//
// // document.querySelector('.message').textContent to get the text content of the element which has class-name = "message"
// console.log(document.querySelector('.message').textContent);
//
// // DOM manipulation of one of the DOM nodes (<p> having class-name="message")
// document.querySelector('.message').textContent = '🎉 Correct Number!';
//
// // There are also different ways of selecting elements (will be taught in future videos)
//
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

let secretNumber = Math.trunc(Math.random() * 20) + 1;

// State variable. Because the score is part of the so-called application state,
// which is basically all the data that is relevant to the application.
let score = 20;
let highScore = 0;
const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}
document.querySelector('.check').addEventListener('click', function () {
    // // This is not DOM manipulation
    // console.log(document.querySelector('.guess').value);
    //
    // // This is DOM manipulation
    // document.querySelector('.message').textContent = '🎉 Correct Number!';

    const guess = Number(document.querySelector('.guess').value);

    if (!guess) {
        // No input (User did not enter any input) (No number at all)
        displayMessage('⛔ No number!');
    } else if (guess === secretNumber) {
        // When guess is correct
        displayMessage('🎉 Correct Number!');
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = "#60b347";
        document.querySelector('.number').style.width = "30rem";
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    } else if (guess !== secretNumber) {
        // If guess is wrong
        if (score > 1) {
            // document.querySelector('.message').textContent = guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
            displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('😢 You lost the game!');
            document.querySelector('.score').textContent = 0;
        }
    }

    // else if (guess > secretNumber) {
    //     // When guess is too high
    //     if (score > 1) {
    //         document.querySelector('.message').textContent = '📈 Too High!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = '😢 You lost the game!';
    //         document.querySelector('.score').textContent = 0;
    //     }
    // } else if (guess < secretNumber) {
    //     // When guess is too low
    //     if (score > 1) {
    //         document.querySelector('.message').textContent = '📉 Too Low!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = '😢 You lost the game!';
    //         document.querySelector('.score').textContent = 0;
    //     }
    // }

});

document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});

