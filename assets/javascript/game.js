//Hang man game
// Array with all the words to be guessed
var words = ["The Witcher", "Fallout", "Warcraft", "Mass Effect", "Warframe", "Dark Souls",
    "Call of Duty", "Battlefield", "Destiny", "Halo", "Resident Evil", "Metal Gear Solid",
    "Half Life","Tomb Raider", "Bioshock", "DOOM", "The Elder Scrolls", "Metro", "Stalker", 
    "Knights of the old republic", "Warhammer", "Diablo", "Starcraft", "Mario Bros", "Street Fighter", 
    "Mortal Kombat", "Dead Space", "Star Wars", "Overwatch", "Assassins Creed", "Forza Motorsport", 
    "Gran Turismo", "Need for Speed", "Homeworld", "The Legend of Zelda", "Mega Man", "Donkey Kong", "Red Dead Redemption",
    "Grand Theft Auto", "Monster Hunter World", "Path of Exile", "Sid Meiers Civilization", "Darksiders", "Kingdom of Amalur",
    ];

//Global Variables
var wordDashes = [];
var randomLowerCase = [];
var random = [];
var guesses = 0;
var loss = 0;
var wins = 0;
var usedLetters = [];
var gameOver = new Audio("assets/audio/gameover.mp3");
var winSound = new Audio("assets/audio/win.mp3");
var wordDisplay = []; // var used to compare in an if to the full word if equial wins++

// wordDashed is the hidden word and letters are pushed to it when guessed
//Function to get all indexes of the press key and pushes it to wordDashes to be displayed
function getIndexes(key) {
    var index = randomLowerCase.indexOf(key);
    while (index != -1) {
        wordDashes[index] = randomWord[index];
        index = randomLowerCase.indexOf(key, index + 1);
        
    }
 
// Function to show gif when user wins or loses    
}
function showGif (par) {
    document.getElementById(par).style.visibility="visible";
}

/* function hideGif(){
    document.getElementById("win-gif").style.visibility="hidden";  
    document.getElementById("lose-gif").style.visibility="hidden";
}*/

//Global function to start the game
function gameStart() {
    usedLetters = [];
    wordDashes = [];
    randomWord = words[Math.floor(Math.random() * words.length)];   //word randomizer
    randomLowerCase = randomWord.toLowerCase().split("");           // converts the array to lower case
    randomWord = randomWord.split("");
    guesses = randomWord.length;  // guesses equals to the length of the word
    

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
}

// Call gameStart when function when loaded
window.onload = gameStart;

// listens to keypress and runs code
document.onkeyup = function (event) {
    var pressKey = event.key.toLowerCase();
    var winChecker = 0;
    var wordCompare = randomWord.join(""); // var used to compare the random word
    letterExists = randomLowerCase.indexOf(pressKey); // assigns a value to letterExist of -1 if it isnt found in the random array or higher than 0 if it exists
    // This checks if repeated letters exist in the word
    if (letterExists >= 0) {
        getIndexes(pressKey);
        wordDisplay = wordDashes.join(""); // Puts the current guessed array to wordDisplay, it is used in an if to compare to the full word   
    } // only allows wrong keys to be deducted one time 
    else if(letterExists === -1 && usedLetters.indexOf(pressKey) === -1){
        guesses--;
    }

    if (usedLetters.indexOf(pressKey) >= 0) {
        //Add error sound for repeated keys
    } 
    else { // Pushes the letter to the array and displays it in the screen
        usedLetters.push(pressKey);
        document.querySelector("#used-letters").textContent = usedLetters;
    }

    if (guesses === 0) {
        gameOver.play();
        gameStart();
        loss++;
        winChecker = -1;
    }
    // wordDashes feeds wordDisplay when there are no more hidden words it will compere to de orginal word in the var wordCompare
    if (wordDisplay === wordCompare) {
        wins++;
        winChecker = 1;
        winSound.play();
        gameStart();    
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