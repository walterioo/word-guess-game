var wordDashes = [];
var randomLowerCase = [];
var random = [];
var guesses = 0;
var loss = 0;
var wins = 0;
var usedLetters = [];
var gameOver = new Audio("assets/audio/gameover.mp3");
var winSound = new Audio("assets/audio/win.mp3");
var wordDisplay = [];

let game = {
    words: ["The Witcher", "Fallout", "Warcraft", "Mass Effect", "Warframe", "Dark Souls",
        "Call of Duty", "Battlefield", "Destiny", "Halo", "Resident Evil", "Metal Gear Solid",
        "Half Life", "Tomb Raider", "Bioshock", "DOOM", "The Elder Scrolls", "Metro", "Stalker",
        "Knights of the old republic", "Warhammer", "Diablo", "Starcraft", "Mario Bros", "Street Fighter",
        "Mortal Kombat", "Dead Space", "Star Wars", "Overwatch", "Assassins Creed", "Forza Motorsport",
        "Gran Turismo", "Need for Speed", "Homeworld", "The Legend of Zelda", "Mega Man", "Donkey Kong", "Red Dead Redemption",
        "Grand Theft Auto", "Monster Hunter World", "Path of Exile", "Sid Meiers Civilization", "Darksiders", "Kingdom of Amalur",
    ],

    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ñ"
    ],

    indexes: function getIndexes(key) {
        var index = randomLowerCase.indexOf(key);
        while (index != -1) {
            wordDashes[index] = randomWord[index];
            index = randomLowerCase.indexOf(key, index + 1);
        }
    },

    start: function gameStart() {
        usedLetters = [];
        wordDashes = [];
        randomWord = game.words[Math.floor(Math.random() * game.words.length)]; //word randomizer
        randomLowerCase = randomWord.toLowerCase().split(""); // converts the array to lower case
        randomWord = randomWord.split("");
        guesses = randomWord.length; // guesses equals to the length of the word
        // Creates the hidden word with "-" and pushes it to wordDahses
        for (var i = 0; i < randomWord.length; i++) {
            wordDashes.push("-");
            if (randomWord[i] === " ") {
                wordDashes[i] = " ";
            }
        }
        // Joins the dashed word array to be displayed in the game
        document.querySelector("#word-to-guess").textContent = wordDashes.join("");
        //Displays the lives 
        document.querySelector("#lives").innerHTML = guesses;
    },


}

window.onload = game.start;

document.onkeyup = function (event) {
    var pressKey = event.key.toLowerCase();
    var winChecker = 0;
    var wordCompare = randomWord.join(""); // var used to compare the random word
    letterExists = randomLowerCase.indexOf(pressKey); // assigns a value to letterExist of -1 if it isnt found in the random array or higher than 0 if it exists
    // This checks if repeated letters exist in the word
    
    if (letterExists >= 0) {
        game.indexes(pressKey);
        wordDisplay = wordDashes.join(""); // Puts the current guessed array to wordDisplay, it is used in an if to compare to the full word   
    } // only allows wrong keys to be deducted one time 
    else if(letterExists === -1 && usedLetters.indexOf(pressKey) === -1 && game.alphabet.indexOf(pressKey) >= 0 ){
        guesses--;
    }

    if (usedLetters.indexOf(pressKey) >= 0) {
        //Add error sound for repeated keys
    } 
    else if (game.alphabet.indexOf(pressKey) >= 0) { // Pushes the letter to the array and displays it in the screen
        usedLetters.push(pressKey);
        document.querySelector("#used-letters").textContent = usedLetters;
    }

    if (guesses === 0) {
        gameOver.play();
        game.start();
        loss++;
        winChecker = -1;
    }
    // wordDashes feeds wordDisplay when there are no more hidden words it will compere to de orginal word in the var wordCompare
    if (wordDisplay === wordCompare) {
        wins++;
        winChecker = 1;
        winSound.play();    
        game.start();  
    }

   // Clears the screen if the player wins
    if(winChecker == 1 || winChecker == -1){
        document.querySelector("#used-letters").textContent = " ";
    }

    document.querySelector("#word-to-guess").textContent = wordDashes.join("");
    document.querySelector("#lives").innerHTML = guesses;
    document.getElementById("wins").textContent = wins;
    document.getElementById("loss").textContent = loss;
}