
//Starting game value variables
let wins = 0;
let guessesLeft = 7;
let guessedLetters = [];
const wordArray = ["booty", "scallywag", "cutlass", "seadog", "privateer", "crossbones"];

//Chooses random word from wordArray
let currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
let brokenWordArray = [];
let displayedWord = [];

//variables tied to HTML elements
const winsText = document.getElementById("winsText");
const wordDiv = document.getElementById("wordDiv");
const guessCountDiv = document.getElementById("guessCountDiv");
const GuessedDiv = document.getElementById("GuessedDiv");
const currentImage = document.getElementById("currentImage");
winsText.textContent = "WINS: " + wins;
guessCountDiv.innerHTML = guessesLeft;
GuessedDiv.innerHTML = guessedLetters.join(" ");

//This pushes the seperate letters of the currentWord into brokenWordArray
for (let i = 0; i < currentWord.length; i++) {
    brokenWordArray.push(currentWord.charAt(i));

    //Makes a blank(_) for every letter of the word
    displayedWord.push("_");
}
//Updates word on html page
wordDiv.innerHTML = displayedWord.join(" ");

//Setting the word that is to be guessed
function chooseWord() {
    brokenWordArray = [];
    displayedWord = [];
    currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    //This pushes the seperate letters of the currentWord into brokenWordArray
    for (let i = 0; i < currentWord.length; i++) {
        brokenWordArray.push(currentWord.charAt(i));

        //Makes a blank(_) for every letter of the word
        displayedWord.push("_");
    }
    //Updates word on html page
    wordDiv.innerHTML = displayedWord.join(" ");
}


//This runs every time the player types a letter
document.onkeyup = function (event) {
    //This is the key that the player pressed
    let guess = event.key.toLocaleLowerCase();


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

            //Updates HTML Elements
            winsText.textContent = "WINS: " + wins;
            wordDiv.innerHTML = displayedWord.join(" ");
            guessCountDiv.innerHTML = guessesLeft;
            GuessedDiv.innerHTML = guessedLetters.join(" ");

        }

        //Guessed letter is incorrect
        else {
            guessesLeft--;
            guessedLetters.push(guess);
            loseCheck();

            //Updates HTML Elements
            winsText.textContent = "WINS: " + wins;
            wordDiv.innerHTML = displayedWord.join(" ");
            guessCountDiv.innerHTML = guessesLeft;
            GuessedDiv.innerHTML = guessedLetters.join(" ");
        }

        //Does nothing if user types a letter than has already been chosen.
    }
};

//Runs after every incorrectly chosen letter
function loseCheck() {
    //Run out of guesses and you lose
    if (guessesLeft < 1) {
        alert("Ye lost, matey!");

        //Resets game, chooses new word
        guessesLeft = 7;
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
        guessesLeft = 7;
        guessedLetters = [];

        //change image source depending on word
        currentImage.src = ("assets/images/" + currentWord + ".jpg");

        //Chooses new word
        chooseWord();
    }
}