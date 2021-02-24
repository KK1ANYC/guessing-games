/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  let num = Math.random() * 100;
  return Math.ceil(num);
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let randomIndex = Math.ceil(Math.random() * i);
    let temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    this.count = 0;
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    if (this.playersGuess < this.winningNumber) {
      return true;
    } else {
      return false;
    }
  }
  playersGuessSubmission(guess) {
    this.playersGuess = guess;
    if (guess < 1 || guess > 100 || typeof guess !== "number") {
      throw `That is an invalid guess.`;
    }
    return this.checkGuess();
  }
  checkGuess() {
    let feedbackText = "";
    this.count++;
    if (this.winningNumber === this.playersGuess) {
      this.pastGuesses.push(this.playersGuess)
      feedbackText = `You Win!`;
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      feedbackText = `You have already guessed that number.`;
    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.count >= 5) {
        //if (this.pastGuesses.length === 5)
        feedbackText = "You Lose.";
      } else {
        let diff = this.difference();
        if (diff < 10) {
          feedbackText = `You're burning up!`;
        } else if (diff < 25) {
          feedbackText = `You're lukewarm.`;
        } else if (diff < 50) {
          feedbackText = `You're a bit chilly.`;
        } else {
          feedbackText = `You're ice cold!`;
        }
      }
      document.querySelector(
        `#guess-list li:nth-child(${this.pastGuesses.length})`
      ).innerHTML = this.playersGuess;
    }
    document.querySelector("#guess-feedback > h4").innerHTML = feedbackText;
    return feedbackText;
  }
  provideHint() {
    let arr = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(arr);
  }
}

function newGame() {
  return new Game();
}

function playGame() {

  //submitButton
  const game = newGame();
  const button = document.querySelector("button");

  button.addEventListener("click", function () {
    const playersGuess = +document.querySelector("input").value;
    document.querySelector("input").value = "";

    game.playersGuessSubmission(playersGuess);
  });

//resetButton
  const resetButton = document.querySelector("#resetButton");

  resetButton.addEventListener("click", function () {
    let iconEl = document.createElement('img')
    iconEl.src = "https://www.pngkit.com/png/detail/991-9910768_flappy-bird-pixel-art-flappy-bird.png"

    iconEl.className = 'icon'

    const guesses = document.querySelectorAll(".guess");
    guesses.forEach(guess => {
      let iconDub = iconEl.cloneNode()
      guess.innerHTML = ""
      guess.append(iconDub)
    });

    document.querySelector("#guess-feedback > h4").innerHTML = "Start Guessing!";
    document.querySelector("#show-hint > h4").innerHTML = "Hint?";

    game.playersGuess = null;
    game.pastGuesses = [];
    game.winningNumber = generateWinningNumber();
    game.count = 0;
  });

//hintButton
  const hintButton = document.querySelector(".hintButton");

  hintButton.addEventListener("click", function () {
      const hintNumbers = game.provideHint()
      const showHint = document.querySelector("#show-hint > h4")
      showHint.innerHTML = hintNumbers
  })
}

playGame();
