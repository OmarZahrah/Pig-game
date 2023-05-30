'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelectorAll('.btn--new');
const btnRoll = document.querySelectorAll('.btn--roll');
const btnHold = document.querySelectorAll('.btn--hold');
// ========================= starting conditions ======================
let scores,
  currentScore,
  activePlayer,
  playing,
  final = 50;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  final = prompt('What is the final score?');

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.add('hidden');
};
init();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// ==================functionality===================================
// rolling dice
for (let i = 0; i < btnRoll.length; i++)
  btnRoll[i].addEventListener('click', function () {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;

      if (dice != 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }
  });
for (let i = 0; i < btnHold.length; i++)
  btnHold[i].addEventListener('click', function () {
    if (playing) {
      //Add current score to player score
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      //   check if player's score >=100 : finish the game
      if (scores[activePlayer] >= final) {
        playing = false;
        diceEl.classList.add('hidden');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        querySelector(`.player--${activePlayer}`).classList.remove(
          'player--active'
        );
      } else {
        // switch players
        switchPlayer();
      }
    }
  });
for (let i = 0; i < btnNew.length; i++)
  btnNew[i].addEventListener('click', init);
