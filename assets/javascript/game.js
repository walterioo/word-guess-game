//Hang man game
// I have to make an array and put all the words that are going to be guessed
var words = ["The Witcher", "Fallout", "Warcraft", "Mass Effect", "Warframe", "Dark Souls",
    "Call of Duty", "Battlefield", "Destiny", "Halo", "Resident Evil", "Metal Gear Solid", "Half Life",
    "Tomb Raider", "Bioshock", "DOOM", "The Elder Scrolls", "Metro", "Stalker", "Knights of the old republic",
    "Warhammer", "Diablo", "Starcraft", "Mario Bros", "Street Fighter", "Mortal Kombat", "Dead Space", "Star Wars",
    "Overwatch", "Assassins Creed", "Forza Motorsport", "Gran Turismo", "Need for Speed", "Homeworld", "The Legend of Zelda", "Mega Man"];
//I need to select a random word for the array, and asign that word to another variable to split in single letters 
/* I need to display the lenght of the word in dashes and then when the player chooses a letter that 
  is in the word it has to change the dash to the letter */
var wordDashes = [];
var randomLowerCase = [];
var random = [];
var guesses = 0;
var loss = 0;
var wins = 0;
var usedLetters = [];
var gameOver = new Audio("assets/audio/gameover.mp3");
var winSound = new Audio("assets/audio/win.mp3");

// Need to lower case all the letters
//Function to get all indexes of the press key and peshes it to wordDashes to be displayed
function getIndexes(key) {
    var index = randomLowerCase.indexOf(key);
    while (index != -1) {
        wordDashes[index] = randomWord[index];
        index = randomLowerCase.indexOf(key, index + 1);
        console.log(wordDashes);
    }
}
function showGif (par) {
    document.getElementById(par).style.visibility="visible";
}

/* function hideGif(){
    document.getElementById("win-gif").style.visibility="hidden";  
    document.getElementById("lose-gif").style.visibility="hidden";
}*/


/* I need to check if the pressed key exist in the randomWord string and asign the position 
to another variable, then make an if to push the key to the wordLeght array
 */
function gameStart() {
    usedLetters = [];
    wordDashes = [];
    randomWord = words[Math.floor(Math.random() * words.length)];
    randomLowerCase = randomWord.toLowerCase().split("");
    randomWord = randomWord.split("");
    guesses = randomWord.length;
    console.log(randomWord);

    for (var i = 0; i < randomWord.length; i++) {
        wordDashes.push("-");
        if (randomWord[i] === " ") {
            wordDashes[i] = " ";
        }
    }
    console.log(wordDashes);
    console.log(randomLowerCase);
    document.querySelector("#word-to-guess").textContent = wordDashes.join("");
    console.log(wordDashes.join(""));
    document.querySelector("#lives").innerHTML = guesses;

}



window.onload = gameStart;

document.onkeyup = function (event) {
    var pressKey = event.key.toLowerCase();
    var letterExists = randomLowerCase.indexOf(pressKey);
    
    
    console.log(pressKey);

    if (letterExists >= 0) {
        getIndexes(pressKey);
    } else {
        guesses--;
    }
    if (guesses === 0) {
        gameOver.play();
        gameStart();
        loss++;
    }

    console.log(guesses);
    var wordDisplay = wordDashes.join("");
    var wordCompare = randomWord.join("");
    console.log(wordDisplay, wordCompare);

    if (wordDisplay === wordCompare) {
        wins++;
        winSound.play();
        gameStart();
    }

    if (usedLetters.indexOf(pressKey) >= 0) {

    } else {
        usedLetters.push(pressKey);
        document.querySelector("#used-letters").textContent = usedLetters;
    }

    document.querySelector("#word-to-guess").textContent = wordDashes.join("");
    document.querySelector("#lives").innerHTML = guesses;
    document.getElementById("wins").textContent = wins;
    document.getElementById("loss").textContent = loss;
}