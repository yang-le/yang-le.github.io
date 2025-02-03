'use strict';

let body = document.querySelector('body');
let number = document.querySelector('.number');
let guess = document.querySelector('.guess');
let check = document.querySelector('.check');
let message  = document.querySelector('.message');
let score = document.querySelector('.score');
let highscore = document.querySelector('.highscore');
let again = document.querySelector('.again');

let answer = Math.trunc(Math.random() * 20) + 1;

check.addEventListener('click', function() {
    if (guess.value < 1 || guess.value > 20) {
        message.textContent = "⛔ No number!";
        return;
    }

    if (guess.value == answer) {
        message.textContent = "🎉 Correct Number!";
        if (score.textContent > highscore.textContent) {
            highscore.textContent = score.textContent;
        }
        check.setAttribute('disabled', "");
        guess.setAttribute('disabled', "");

        body.style.backgroundColor = '#60b347';
        number.style.width = '30rem';
        number.textContent = answer;
        return;
    }

    if (guess.value > answer) {
        message.textContent = "📈 Too high!";
    } else {
        message.textContent = "📉 Too low!";
    }

    if (score.textContent > 1) {
        --score.textContent;
    } else {
        score.textContent = 0;
        message.textContent = "💥 You lost the game!";
        check.setAttribute('disabled', "");
        guess.setAttribute('disabled', "");
    }
});

again.addEventListener('click', function() {
    answer = Math.trunc(Math.random() * 20) + 1;
    message.textContent = "Start guessing...";
    score.textContent = 20;
    guess.value = '';
    guess.removeAttribute('disabled');
    check.removeAttribute('disabled');

    body.style.backgroundColor = '#222';
    number.style.width = '15rem';
    number.textContent = '?';
});
