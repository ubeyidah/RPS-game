// grap Element
const rockBtnEl = document.querySelector('.js-rock-btn');
const paperBtnEl = document.querySelector('.js-paper-btn');
const scissorsBtnEl = document.querySelector('.js-scissors-btn');
const autoPlayBtn = document.querySelector('.js-auto-play-btn');
const continueBtn = document.querySelector('.js-continue');
const newGameBtn = document.querySelector('.js-new-game');
const welcomeEl = document.querySelector('.welcome');
const scoreDisplay = document.querySelector('.js-scores');
const scores = JSON.parse(localStorage.getItem('rps-game')) || { win: 0, loss: 0, tie: 0 };


// weclome page
if (scores.win || scores.loss || scores.tie) {
  welcomeEl.classList.add('is-new');
  continueBtn.addEventListener('click', () => welcomeEl.classList.remove('is-new'));
  newGameBtn.addEventListener('click', () => {
    removeScores();
    welcomeEl.classList.remove('is-new')
  })
}

// add event listners to the buttons
rockBtnEl.addEventListener('click', () => playGame('rock'));
paperBtnEl.addEventListener('click', () => playGame('paper'));
scissorsBtnEl.addEventListener('click', () => playGame('scissors'));
const resetBtn = document.querySelector('.js-reset-btn');
const ask = document.querySelector('.ask');


// auto play
let intervalId;
let isPlaying = false;
autoPlayBtn.addEventListener('click', () => {

  if (!isPlaying) {
    autoPlayBtn.textContent = 'Loading...';
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      autoPlayBtn.textContent = 'Stop';
    }, 1000);
    isPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlayBtn.textContent = 'Auto Play';
    isPlaying = false;
  }
})

// resate request confirm
resetBtn.addEventListener('click', () => {
  (scores.win > 0 || scores.loss > 0 || scores.tie > 0) && !isPlaying ? ask.classList.add('is-asking') : ask.classList.remove('is-asking');
  document.querySelector('.js-no-btn').addEventListener('click', () => {
    ask.classList.remove('is-asking');
  });
  document.querySelector('.js-yes-btn').addEventListener('click', () => {
    removeScores();
    ask.classList.remove('is-asking');
  });
});

// remove score
function removeScores() {
  localStorage.clear('rps-game');
  scores.win = 0;
  scores.loss = 0;
  scores.tie = 0;
  saveScores();
  scoreDisplay.textContent = `Wins: ${scores.win}, Losses: ${scores.loss}, Ties: ${scores.tie}`;
}


// kestork events
document.body.addEventListener('keydown', (e) => {
  if (e.key.toUpperCase() === 'R') {
    playGame('rock');
  } else if (e.key.toUpperCase() === 'P') {
    playGame('paper');
  } else if (e.key.toUpperCase() === 'S') {
    playGame('scissors');
  }
});


// save score in localStorage
function saveScores() {
  localStorage.setItem('rps-game', JSON.stringify(scores));
}
scoreDisplay.textContent = `Wins: ${scores.win}, Losses: ${scores.loss}, Ties: ${scores.tie}`;


// play game
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result;
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You loss.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You loss.';
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You loss.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }
  if (result === 'You win.') {
    scores.win++;
  } else if (result === 'You loss.') {
    scores.loss++;
  } else if (result === 'Tie.') {
    scores.tie++;
  }
  saveScores();
  updateContent(result, computerMove, playerMove)
}

// pick computer move
function pickComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const computerMove = moves[Math.floor(Math.random() * 3)];
  return computerMove;
}

// update pages
function updateContent(result = '', computerMove = '', playerMove = '') {
  document.querySelector('.js-result').textContent = result;
  document.querySelector('.js-move').innerHTML = `You <img src="../icons/${playerMove}-emoji.png"> Computer <img src="../icons/${computerMove}-emoji.png">`;
  scoreDisplay.textContent = `Wins: ${scores.win}, Losses: ${scores.loss}, Ties: ${scores.tie}`;
}

