const rockBtnEl = document.querySelector('.js-rock-btn');
const paperBtnEl = document.querySelector('.js-paper-btn');
const scissorsBtnEl = document.querySelector('.js-scissors-btn');
const gameBtns = document.querySelectorAll('.js-game-btns');
let round = 0;
const score = {
  playerScore: 0,
  computerScore: 0
};

// add event listners to the buttons
rockBtnEl.addEventListener('click', () => playGame('rock'));
paperBtnEl.addEventListener('click', () => playGame('paper'));
scissorsBtnEl.addEventListener('click', () => playGame('scissors'));
document.body.addEventListener('keydown', (e) => {
  if (e.key.toUpperCase() === 'R') {
    playGame('rock');
    gameBtns.forEach(btn => btn.classList.remove('active-btn'));
    gameBtns[0].classList.add('active-btn');
  } else if (e.key.toUpperCase() === 'P') {
    playGame('paper');
    gameBtns.forEach(btn => btn.classList.remove('active-btn'));
    gameBtns[1].classList.add('active-btn');
  } else if (e.key.toUpperCase() === 'S') {
    playGame('scissors');
    gameBtns.forEach(btn => btn.classList.remove('active-btn'));
    gameBtns[2].classList.add('active-btn');
  }
});

document.querySelector('.js-play-btn')
  .addEventListener('click', () => {
    score.playerScore = 0;
    score.computerScore = 0;
    round = 0;
    updateResult();
    gameBtns.forEach(btn => btn.classList.remove('active-btn'));
    rateScor();
    gameOver();
  })



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
    score.playerScore++;
  } else if (result === 'You loss.') {
    score.computerScore++;
  }
  round++;
  updateResult(computerMove, result, round);
  rateScor();
  gameOver();
}

function pickComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const computerMove = moves[Math.floor(Math.random() * 3)];
  return computerMove;
}

function updateResult(computerMove = '', result = '', round = 0) {
  document.querySelector('.js-computer-move')
    .innerHTML = computerMove ? `<img src="./../icons/${computerMove}-emoji.png" alt="result">` : '';
  document.querySelector('.js-result')
    .textContent = result;
  document.querySelector('.js-round-display')
    .textContent = `ROUND ${round}`;
}

function rateScor() {
  const playerScoreEl = document.querySelectorAll('.js-player-score-display');
  const computerScoreEl = document.querySelectorAll('.js-computer-score-display');


  if (score.playerScore) {
    for (let i = 0; i < score.playerScore; i++)
      playerScoreEl[i].classList.add('rate');
  } else if (score.playerScore === 0) {
    playerScoreEl.forEach(score => score.classList.remove('rate'));
  }
  if (score.computerScore) {
    for (let i = 0; i < score.computerScore; i++)
      computerScoreEl[i].classList.add('rate');
  } else if (score.computerScore === 0) {
    computerScoreEl.forEach(score => score.classList.remove('rate'));
  }
}

function gameOver() {
  const gameOverContainer = document.querySelector('.js-game-over-container');
  let winner;
  if (score.playerScore === 3 || score.computerScore === 3) {
    gameOverContainer.classList.add('is-game-over');
    document.querySelector('.js-score-ratio')
      .textContent = `${score.playerScore}:${score.computerScore}`;
    if (score.playerScore === 3) {
      winner = 'You win.';
    } else if (score.computerScore === 3) {
      winner = 'Computer win.';
    }
    document.querySelector('.js-winner')
      .textContent = winner;
  } else {
    gameOverContainer.classList.remove('is-game-over');
  }
}


function activeGameBtn() {
  gameBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gameBtns.forEach(btn => btn.classList.remove('active-btn'));
      btn.classList.add('active-btn');
    });
  });
}
activeGameBtn();