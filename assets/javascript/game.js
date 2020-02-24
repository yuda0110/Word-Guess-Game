const htmlEl = {
  winsNum: document.querySelector('.wins--num'),
  wordDisplay: document.querySelector('.current-word__display'),
  hint: document.querySelector('.hint__content'),
  guessesRemainNum: document.querySelector('.guesses-remain--num'),
  guessedLetters: document.querySelector('.guessed--letters')
};

const wordGuessGame = {
  isStarted: false,
  gameNum: 0,
  wins: 0,
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
    }
  ],
  addGameNum: function () {
    this.gameNum += 1;
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
}

document.addEventListener('DOMContentLoaded', () => {
  setUpPage();
});

const hiddenLetter = '_'
const currentWord = wordGuessGame.words[wordGuessGame.gameNum].word.toLowerCase();
let displayedWord = '';
let updatedWord = '';

document.onkeyup = function(e) {
  if (!wordGuessGame.isStarted) {
    console.log('game is not started!')
    wordGuessGame.isStarted = true;
    console.log(wordGuessGame.isStarted);
    displayedWord = hiddenLetter.repeat(currentWord.length);
    htmlEl.wordDisplay.textContent = displayedWord;

    htmlEl.hint.textContent = wordGuessGame.words[wordGuessGame.gameNum].hint1;
  }

  const letter = e.key.toLowerCase();

  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      updatedWord += letter;
      console.log('1: ' + updatedWord);
    } else if (displayedWord[i] !== hiddenLetter) {
      updatedWord += currentWord[i];
      console.log('2: ' + updatedWord);
    } else {
      updatedWord += hiddenLetter;
      console.log('3: ' + updatedWord);
    }
  }
  htmlEl.wordDisplay.innerHTML = updatedWord;


};




