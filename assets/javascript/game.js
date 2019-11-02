
//Starting game value variables
let wins = 0;
let guessesLeft = 13;
let guessedLetters = [];
const wordArray = ["", "", "", "", "", ""];

//Chooses random word from wordArray
let currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
let brokenWordArray = [];
let displayedWord = [];

//variables tied to HTML elements
const winsText = document.getElementById("winsText");
const wordDiv = document.getElementById("wordDiv");
const guessCountDiv = document.getElementById("guessCountDiv");
const lastGuessedDiv = document.getElementById("lastGuessedDiv");
winsText.textContent = "WINS: " + wins;

//Setting the word that is to be guessed
function chooseWord() {
    brokenWordArray = [];
    displayedWord = [];
    currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    //This pushes the seperate letters of the currentWord into brokenWordArray
    for (let i = 0; i < currentWord.length; i++) {
        brokenWordArray.push(charAt(i));

        //Makes a blank(_) for every letter of the word
        displayedWord.push("_");
    }
}



//This runs every time the player types a letter
document.onkeyup = function (event) {
    //This is the key that the player pressed
    let guess = event.key.toLocaleLowerCase();
    guessesLeft--;
    //If the letter has not been chosen already
    if (!guessedLetters.includes(guess)) {

        //And... If the user guessed correctly
        if (currentWord.includes(guess)) {
            guessedLetters.push(guess);

            /*Cycles through word and updates every blank spot(e.g _) in displayedWords array with
            it's corresponding letter*/
            for (let i = 0; i < currentWord.length; i++) {
                if (brokenWordArray[i] === guess) {
                    displayedWord[i] = guess;
                }
            }

            winCheck();

        }
        //Guessed letter is incorrect
        else {
            guessedLetters.push(guess);
            loseCheck();
        }
    }
};

//Runs after every incorrectly chosen letter
function loseCheck() {
    //Run out of guesses and you lose
    if (guessesLeft === 0) {
        alert("Ye lost, matey!");

        //Resets game, chooses new word
        guessesLeft = 13;
        guessedLetters = [];

        //Chooses new word
        chooseWord();
    }
};

//Runs after every correctly chosen letter
function winCheck() {

    //If displayedWord no longer has any blanks (e.g. "_"), game is won
    if (!displayedWord.includes("_")) {
        //Updates wins
        wins++;
        winsText.textContent = "WINS: " + wins;
        alert("Ye have won " + wins + " times!");

        //Resets game
        guessesLeft = 13;
        guessedLetters = [];

        //Chooses new word
        chooseWord();
    }
}