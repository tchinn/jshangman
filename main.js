var secretWord = null;
var displayWord = '';
var guessedLetters = [];
var incorrectGuessNum = 0;
var guessNum = 0;
var bodyPics = ['head', 'rightarm', 'torso', 'leftarm', 'rightleg', 'leftleg'];

const secretWordForm = document.getElementById('secretWordForm');
const secretInput = document.getElementById('secretWordInput');
const startScreen = document.getElementById('startScreen');
const guessForm = document.getElementById('guessForm');
const guessLetterInput = document.getElementById('guessLetterInput');
const guessWordForm = document.getElementById('guessWordForm');
const guessWordInput = document.getElementById('guessWordInput');
const messageElement = document.getElementById('message');
const guessedLettersElement = document.getElementById('guessedLetters');
const secretWordDisplay = document.getElementById('secretWordDisplay');
const displayWordElement = document.getElementById('displayWord');
const startNewGameBtn = document.getElementById('startNewGameBtn');
//startScreen.classList.add('hide');
//guessForm.classList.add('hide');
//guessWordInput.classList.add('hide');

function getSecretWord(event) {
  event.preventDefault();
  secretWord = secretWordInput.value.toLowerCase();
  console.log('secretWord: ' + secretWord);
  startScreen.style.display = 'none';
  displayGame();
};

secretWordForm.addEventListener('submit', getSecretWord);

function displayGame() {
//  var wordBlank = '<h2>Secret Word: </h2><h2>';
  for(var i = 0; i < secretWord.length; i++){
    if(secretWord.charAt(i) === ' '){
      displayWord+= ' ';
      //wordBlank+= ' ';
    }
    //wordBlank += '*';
    displayWord+= '*';
  }
  //wordBlank += displayWord + '</h2>';
  //const word = document.getElementById('word');
  //word.innerHTML = wordBlank;
  displayWordElement.innerHTML = displayWord;
  secretWordDisplay.style.display = '';
  guessForm.style.display = '';
  guessWordForm.style.display = '';
}

guessForm.addEventListener('submit', getGuessLetter);
guessWordForm.addEventListener('submit', getGuessWord);
startNewGameBtn.addEventListener('click', startNewGame);

function getGuessLetter(event) {
  event.preventDefault();
  messageElement.innerHTML = '';
  var letter = guessLetterInput.value.toLowerCase();
  console.log('guess letter: ' + letter);
  if (letter.length !== 1){
    messageElement.innerHTML = 'Invalid input, please submit one letter at a time.';
  } else if (guessedLetters.includes(letter)){
      messageElement.innerHTML = 'Already guessed: ' + letter + '. Please guess another letter.';
  } else {
      guessNum++;
      if (guessedLetters.length === 0){
        guessedLettersElement.innerHTML = 'Guessed Letters: ' + letter;
      } else {
        guessedLettersElement.innerHTML = guessedLettersElement.innerHTML + ', ' + letter;
      }
      guessedLetters.push(letter);
      //const indexes = secretWord.matchAll(new RegExp(letter, 'gi')).map(letter => letter.index);
      const indexes = [...secretWord.matchAll(new RegExp(letter, 'gi'))].map(letter => letter.index);
      console.log(indexes);
      if(indexes.length !== 0){
        correctGuess(indexes, letter);
      } else {
        incorrectGuess();
      }
  }
  guessLetterInput.value = '';
}

function getGuessWord(event) {
  event.preventDefault();
  guessNum++;
  messageElement.innerHTML = '';
  var word = guessWordInput.value.toLowerCase();
  console.log('guess word: ' + word);
  if (secretWord === word) {
    winGame();
  } else {
    incorrectGuess();
  }
  guessWordInput.value = '';
}

function correctGuess(indexes, letter) {
  console.log('correctGuess');
  console.log(indexes);
  console.log('letter: ' + letter);
  console.log('displayWord: ' + displayWord);
  for(var index of indexes){
    //console.log('displayWord[index] before: ' + displayWord[index]);
    // displayWord[index] = letter;
    // console.log('displayWord[index] after: ' + displayWord[index]);
    displayWord = displayWord.substring(0, index) + letter + displayWord.substring(index + 1);
  }
  displayWordElement.innerHTML = displayWord;
  messageElement.innerHTML = 'Correct guess!';
  console.log('displayWord: ' + displayWord);
}

function incorrectGuess() {
  incorrectGuessNum++;
  if(incorrectGuessNum > 6){
    loseGame();
  } else {
    messageElement.innerHTML = 'Incorrect guess';
    var bodyPart = document.getElementById(bodyPics[incorrectGuessNum - 1]);
    bodyPart.style.display = '';
    //hangmanImages.innerHTML = hangmanImages.innerHTML + '<image src="assets/' + bodyPics[incorrectGuessNum - 1] + '.jpg"></image>';
  }
  console.log('incorrectGuess');

}

function loseGame() {
  console.log('loseGame');
  messageElement.innerHTML = 'You Lose :(. The secret word was: ' + secretWord;
  displayWordElement.innerHTML = secretWord;
  displayEndScreen();
}

function winGame() {
  console.log('winGame');
  messageElement.innerHTML = 'You Win :)! It took you ' + guessNum + ' attempt(s).';
  displayEndScreen();

}

function displayEndScreen() {
  guessForm.style.display = 'none';
  guessWordForm.style.display = 'none';
  startNewGameBtn.style.display = '';
}

function startNewGame(event) {
  event.preventDefault();
  window.location.reload();
}
