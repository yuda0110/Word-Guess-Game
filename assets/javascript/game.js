const htmlEl = {
  winsNum: document.querySelector('.wins--num'),
  wordDisplay: document.querySelector('.current-word__display'),
  hint: document.querySelector('.hint__content'),
  guessesRemainNum: document.querySelector('.guesses-remain--num'),
  guessedLetters: document.querySelector('.guessed--letters'),
  direction: document.querySelector('.direction')
};

const directions = {
  start: 'Press any key to get started!',
  wrongKey: 'Please press only alphabet keys.',
  play: 'Please press an alphabet key which you think is included in the word.',
  fail: 'You have failed :('
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
  writeWinsNum: function () {
    htmlEl.winsNum.textContent= this.wins;
  },
  // writeHint: function () {
  //   htmlEl.hint.textContent= this.wins;
  // },
  writeGuessRemainNum: function () {
    htmlEl.guessesRemainNum.textContent= this.guessesRemainNum;
  },
};

function setUpPage() {
  wordGuessGame.writeWinsNum();
  wordGuessGame.writeGuessRemainNum();
  htmlEl.direction.textContent = directions.start;
}

document.addEventListener('DOMContentLoaded', () => {
  setUpPage();
});

const hiddenLetter = '_'
const currentWord = wordGuessGame.words[wordGuessGame.gameNum].word.toLowerCase();
let displayedWord = '';

function startNewWord() {
  wordGuessGame.resetGuessesRemainNum();
  wordGuessGame.writeGuessRemainNum();
  displayedWord = hiddenLetter.repeat(currentWord.length);
  htmlEl.wordDisplay.textContent = displayedWord;

  htmlEl.hint.textContent = wordGuessGame.words[wordGuessGame.gameNum].hint1;
  htmlEl.direction.textContent = directions.play;
}

document.onkeyup = function(e) {
  const letter = e.key.toLowerCase();
  let updatedWord = '';

  // If the game is already started &&
  if (wordGuessGame.isStarted) {
    // If the key is an alphabet
    if (letter.match(/[a-z]/g)) {
      htmlEl.direction.textContent = directions.play;

      // Logic to what to show on Current Word
      for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
          updatedWord += currentWord[i];
          console.log('1: ' + updatedWord);
        } else if (displayedWord[i] !== hiddenLetter) {
          updatedWord += currentWord[i];
          console.log('2: ' + updatedWord);
        } else {
          updatedWord += hiddenLetter;
          console.log('3: ' + updatedWord);
        }
      }
      displayedWord = updatedWord
      htmlEl.wordDisplay.innerHTML = updatedWord;


      // Reduce "Number of Guesses Remaining" until it hits 0.
      if (wordGuessGame.guessesRemainNum > 1) {
        console.log('letter: ' + letter);
        console.log('index: ' + wordGuessGame.lettersGuessed.indexOf(letter));
        if (wordGuessGame.lettersGuessed.indexOf(letter) < 0) {
          wordGuessGame.guessesRemainNum -= 1;
          htmlEl.guessesRemainNum.textContent = wordGuessGame.guessesRemainNum;
        } else {
          htmlEl.guessesRemainNum.textContent = wordGuessGame.guessesRemainNum;
        }
      } else {  // The player failed to guess the word. ("Number of Guesses Remaining" hits 0)
        htmlEl.guessesRemainNum.textContent = '0';
        htmlEl.direction.textContent = directions.fail;
        if (wordGuessGame.gameNum < wordGuessGame.words.length) {
          wordGuessGame.addGameNum();
          console.log('wordGuessGame.gameNum: ' + wordGuessGame.gameNum);
          window.setTimeout(startNewWord, 5000);
        }
      }

      // Only if the letter is not included in the lettersGuessed array, add it to the array.
      if (wordGuessGame.lettersGuessed.indexOf(letter) < 0) {
        wordGuessGame.lettersGuessed.push(letter);
        let html = '';
        wordGuessGame.lettersGuessed.forEach(function (letter) {
          html += `<span class="guessed--letter">${letter}</span>`;
        })
        htmlEl.guessedLetters.innerHTML = html;
      }

    } else { // If the key is NOT an alphabet
      htmlEl.direction.textContent = directions.wrongKey;
    }

  } else { // When the game hasn't started yet. (Before the player press any key.)
    console.log('game is not started!')
    console.log(wordGuessGame.isStarted);
    startNewWord();
    wordGuessGame.isStarted = true;
    console.log(wordGuessGame.isStarted);
  }

};




