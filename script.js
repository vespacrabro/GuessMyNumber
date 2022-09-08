let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const resetButton = document.querySelector(".newGame");
const container = document.querySelector(".container");
let guessCount = 1;

function changeBgStateTo(state){
  if (state !== "neutral" && state !== "failure" && state !== "success") {
    console.log(`wrong function parameter 'state' in changeBgStateTo, expected: "neutral"/"success"/"failure", receieved: ${state}`);
    return;
  }
  container.classList.remove("neutral")
  container.classList.remove("failure")
  container.classList.remove("success")
  container.classList.add(`${state}`)
}

function typeOfWrongInput(userGuess) {
  comparisonResult = userGuess < randomNumber ? "low" : "high";
  lowOrHigh.textContent = `Last guess was too ${comparisonResult}!`;
}

function setBoolGameState(state) {
  if (state !== true && state !== false) {
    console.log("wrong function parameter in setBoolGameState: bool value expected")
    return;
  } 
  guessField.disabled = !state;
  guessSubmit.disabled = !state;
}

function resetGuessField(){
  guessField.value = "";
  guessField.focus();
}
function checkGuess() {
  const userGuess = Number(guessField.value); 
  const numberIsValid = !isNaN(userGuess) && userGuess >= 1 && userGuess <= 100;

 resetGuessField();

  if (!numberIsValid) {
    lowOrHigh.textContent = "Enter valid number!";
    return;
  }
  if (guessCount === 1) guesses.textContent = "Previous guesses: ";
  guesses.textContent += userGuess + "  ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHigh.textContent = "";
    changeBgStateTo("success");
    setBoolGameState(false);
    return;
  }
  if (guessCount === 10) {
    lastResult.textContent = "GAME OVER";
    lowOrHigh.textContent = "";
    changeBgStateTo("failure");
    setBoolGameState(false);
    return;
  }

  lastResult.textContent = "Wrong!";
  lastResult.style.backgroundColor = "red";
  changeBgStateTo("failure");
  typeOfWrongInput(userGuess);
  guessCount++;
}

function resetGame() {
  guessCount = 1;
  const resetParagraphs = document.querySelectorAll(".resultParagraphs p");
  for (const resetParagraph of resetParagraphs) {
    resetParagraph.textContent = "";
  }
  setBoolGameState(true);
  resetGuessField();

  lastResult.style.backgroundColor = "inherit";
  randomNumber = Math.floor(Math.random() * 100) + 1;
  changeBgStateTo("neutral");
}



guessSubmit.addEventListener("click", checkGuess);
resetButton.addEventListener("click", resetGame);
