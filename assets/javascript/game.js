const winningSound = new Audio('./assets/audio/winning-sound.mp3');
const losingSound = new Audio('./assets/audio/losing-sound.mp3');

const htmlEl = {
  winsNum: document.querySelector('.wins--num'),
  wordDisplay: document.querySelector('.current-word__display'),
  hint: document.querySelector('.hint__content'),
  guessesRemainNum: document.querySelector('.guesses-remain--num'),
  guessedLetters: document.querySelector('.guessed--letters'),
  direction: document.querySelector('.direction')
};

const messages = {
  start: 'Press any key to get started!',
  wrongKey: 'Please press only alphabet keys.',
  play: 'Please press an alphabet key which you think is included in the word.',
  fail: 'You have failed :(',
  win: 'You have guessed the word correctly!!'
}

const wordGuessGame = {
  isStarted: false,
  gameNum: 0,
  wins: 0,
  guessesDefaultNum: 12,
  guessesRemainNum: 12,
  lettersGuessed: [],
  words: [
    {
      word: 'sushi',
      hint1: 'food'
    },
    {
      word: 'sumo',
      hint1: 'sports'
    },
    {
      word: 'tokyo',
      hint1: 'city'
    },
    {
      word: 'sake',
      hint1: 'alcohol'
    },
    {
      word: 'ukiyoe',
      hint1: 'traditional painting'
    },
    {
      word: 'kimono',
      hint1: 'traditional dress'
    }
  ],
  addGameNum: function () {
    this.gameNum += 1;
  },
  resetGuessesRemainNum: function() {
    this.guessesRemainNum = this.guessesDefaultNum;
  },
  addWin: function () {
    this.wins += 1;
  },
  resetLettersGuessed: function() {
    this.lettersGuessed = [];
  }
};


const hiddenLetter = '_';
let currentWordArray = wordGuessGame.words[wordGuessGame.gameNum].word.toLowerCase().split('');
let displayedWordArray = [];

// Flag to prevent the key event from happening while waiting for the next word to start after winning / losing.
// 'wait' must start as false otherwise the game will never start!!
let wait = false;

function setUpPage() {
  writeWinsNum();
  writeGuessRemainNum();
  writeMessage(messages.start);
}

function writeMessage(direction) {
  htmlEl.direction.textContent = direction;
}

function writeWinsNum() {
  htmlEl.winsNum.textContent = wordGuessGame.wins;
}

function writeGuessRemainNum() {
  htmlEl.guessesRemainNum.textContent= wordGuessGame.guessesRemainNum;
}

function getCurrentWordArray() {
  currentWordArray = wordGuessGame.words[wordGuessGame.gameNum].word.toLowerCase().split('');
}

function startNewWord() {
  console.log('startNewWord!!!');

  wait = false;
  wordGuessGame.resetLettersGuessed();
  htmlEl.guessedLetters.textContent = wordGuessGame.lettersGuessed;

  wordGuessGame.resetGuessesRemainNum();
  writeGuessRemainNum();

  // Reset displayedWordArray.
  displayedWordArray = [];
  // Update currentWordArray.
  getCurrentWordArray();
  // create dynamic display word array based on length of current word
  currentWordArray.forEach((item, i) =>	displayedWordArray[i] = hiddenLetter);
  // join array for display
  console.log(displayedWordArray.join(""));
  htmlEl.wordDisplay.textContent = displayedWordArray.join('');

  htmlEl.hint.textContent = wordGuessGame.words[wordGuessGame.gameNum].hint1;
  writeMessage(messages.play);
}

document.addEventListener('DOMContentLoaded', () => {
  setUpPage();
});

document.onkeydown = function(e) {
  if (wait) {
    return;
  }

  const userGuess = e.key;

  // If the game is already started &&
  if (wordGuessGame.isStarted) {
    // If the key is an alphabet (enter, shift, and etc keys' length is longer than 1)
    if (userGuess.length === 1 &&
      (userGuess.charCodeAt(0) >= 65 && userGuess.charCodeAt(0) <= 90)
      || (userGuess.charCodeAt(0) >= 97 && userGuess.charCodeAt(0) <= 122)) {
      const userGuessLowercase = userGuess.toLowerCase();
      writeMessage(messages.play);

      // Logic to what to show on Current Word ====================
      // Iterate over currentWordArray, if match update display word array
      currentWordArray.forEach((letter, i) => { if (letter === userGuessLowercase) displayedWordArray[i] = letter; });
      // Join updated array for display
      const displayedWord = displayedWordArray.join('');
      console.log(displayedWord);
      htmlEl.wordDisplay.textContent = displayedWord;

      // Reduce "Number of Guesses Remaining" until it hits 0 if the displayedWord is not the same as currentWord.
      if (wordGuessGame.guessesRemainNum > 0) {
        if (wordGuessGame.lettersGuessed.indexOf(userGuess) < 0) {
          wordGuessGame.guessesRemainNum -= 1;
          htmlEl.guessesRemainNum.textContent = wordGuessGame.guessesRemainNum;
        } else {
          htmlEl.guessesRemainNum.textContent = wordGuessGame.guessesRemainNum;
        }
      }

      // Only if the userGuess is not included in the lettersGuessed array, add it to the array.
      if (wordGuessGame.lettersGuessed.indexOf(userGuess) < 0) {
        wordGuessGame.lettersGuessed.push(userGuess);
        let html = '';
        wordGuessGame.lettersGuessed.forEach(function (letter) {
          html += `<span class="guessed--letter">${letter}</span>`;
        })
        htmlEl.guessedLetters.innerHTML = html;
      }

      // *************** WIN!!! The player succeed to guess the word correctly.
      if (displayedWord === wordGuessGame.words[wordGuessGame.gameNum].word.toLowerCase()) {
        wait = true;
        wordGuessGame.addWin();
        htmlEl.winsNum.textContent = wordGuessGame.wins;
        writeMessage(messages.win);
        wordGuessGame.addGameNum();
        winningSound.play();
        winningSound.addEventListener("ended", function () {
          startNewWord();
        }, false);
      }  // *************

      // *************** LOSE!!! The player failed to guess the word. ("Number of Guesses Remaining" hits 0)
      if (wordGuessGame.guessesRemainNum <= 0) {
        wait = true;
        htmlEl.guessesRemainNum.textContent = '0';
        writeMessage(messages.fail);
        if (wordGuessGame.gameNum < wordGuessGame.words.length) {
          wordGuessGame.addGameNum();
          losingSound.play();
          losingSound.addEventListener("ended", function () {
            startNewWord();
          }, false);
        }
      } // ********************

    } else { // If the userGuess is NOT an alphabet
      writeMessage(messages.wrongKey);
    }

  } else { // When the game hasn't started yet. (Before the player press any key.)
    console.log('game is not started!')
    startNewWord();
    wordGuessGame.isStarted = true;
  }

};




