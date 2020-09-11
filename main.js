// global variables
var secretWord = null;
var displayWord = '';
var guessedLetters = [];
var incorrectGuessNum = 0;
var guessNum = 0;
const bodyPics = ['head', 'rightarm', 'torso', 'leftarm', 'rightleg', 'leftleg'];

// find document elements for later use in functions
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
const gallowImg = document.getElementById('gallow');

// add event listeners to forms and buttons
secretWordForm.addEventListener('submit', getSecretWord);
guessForm.addEventListener('submit', getGuessLetter);
guessWordForm.addEventListener('submit', getGuessWord);
startNewGameBtn.addEventListener('click', startNewGame);

// handler function for submitting the secret word
// saves secret word in global variable
// calls displayGame() to display the start of the game
function getSecretWord(event) {
  event.preventDefault();
  secretWord = secretWordInput.value.toLowerCase();
  startScreen.style.display = 'none';
  displayGame();
};

// displays the start of the game
// displays the guess letter and guess word forms
// displays the hidden word
// displays the gallow image
function displayGame() {
  for(var i = 0; i < secretWord.length; i++){
    if(secretWord.charAt(i) === ' '){
      displayWord+= ' ';
    } else {
      displayWord+= '*';
    }
  }
  displayWordElement.innerHTML = displayWord;
  secretWordDisplay.style.display = '';
  guessForm.style.display = '';
  guessWordForm.style.display = '';
  gallowImg.style.display='';
}

// handler function for submitting the guess Letter
// checks if the input is valid (1 char), is already guessed and then if it is correct or incorrect
function getGuessLetter(event) {
  event.preventDefault();
  messageElement.innerHTML = '';
  var letter = guessLetterInput.value.toLowerCase();
  if(letter.length !== 1){
    messageElement.innerHTML = 'Invalid input, please submit one letter at a time.';
  } else if(guessedLetters.includes(letter)){
      messageElement.innerHTML = 'Already guessed: ' + letter + '. Please guess another letter.';
  } else {
      guessNum++;
      if(guessedLetters.length === 0){
        guessedLettersElement.innerHTML = 'Guessed Letters: ' + letter;
      } else {
        guessedLettersElement.innerHTML = guessedLettersElement.innerHTML + ', ' + letter;
      }
      guessedLetters.push(letter);
      const indexes = [...secretWord.matchAll(new RegExp(letter, 'gi'))].map(letter => letter.index);
      if(indexes.length !== 0){
        correctGuess(indexes, letter);
      } else {
        incorrectGuess();
      }
  }
  guessLetterInput.value = '';
}

// handler function for submitting the guess words
// checks if guess is correct and wins the game or is incorrect
function getGuessWord(event) {
  event.preventDefault();
  guessNum++;
  messageElement.innerHTML = '';
  var word = guessWordInput.value.toLowerCase();
  if(secretWord === word) {
    winGame();
  } else {
    incorrectGuess();
  }
  guessWordInput.value = '';
}

// updates the display word, replacing * with the guessed letter at the correct spots
// checks if the guess reveals the entire word and wins Game
// if so call winGame() to end the game
function correctGuess(indexes, letter) {
  for(var index of indexes){
    displayWord = displayWord.substring(0, index) + letter + displayWord.substring(index + 1);
  }
  displayWordElement.innerHTML = displayWord;
  if(displayWord.includes('*')){
    messageElement.innerHTML = 'Correct guess!';
  } else {
    winGame();
  }
}

// checks if the incorrect guess was the last allowed
// if so then loseGame() is called to end the Game
// otherwise displays the incorrect guess message and the new body part
function incorrectGuess() {
  incorrectGuessNum++;
  messageElement.innerHTML = 'Incorrect guess';
  var bodyPart = document.getElementById(bodyPics[incorrectGuessNum - 1]);
  bodyPart.style.display = '';
  if(incorrectGuessNum >= 6){
    loseGame();
  }

}

// display losing game messages
function loseGame() {
  messageElement.innerHTML = 'You Lose :(. The secret word was: ' + secretWord;
  displayWordElement.innerHTML = secretWord;
  displayEndScreen();
}

// display winning game messages
function winGame() {
  displayWordElement.innerHTML = secretWord;
  messageElement.innerHTML = 'You Win :)! It took you ' + guessNum + ' attempt(s). The number of attempts includes all guesses, correct or incorrect.';
  displayEndScreen();

}

// displays end game screen by hiding guess forms and displaying the start new game button
function displayEndScreen() {
  guessForm.style.display = 'none';
  guessWordForm.style.display = 'none';
  startNewGameBtn.style.display = '';
}

// reloads the page to start a new game and to show secret word input
function startNewGame(event) {
  event.preventDefault();
  window.location.reload();
}
