/*----- constants -----*/
const MAX_LEVEL = 10;

/*----- app's state (variables) -----*/
let currentLevel = 0;
let gamePat = [];
let playerPat = [];

/*----- cached element references -----*/
const boardEl = document.getElementById("game_board");
const crystals = document.querySelectorAll(".crystal");
const levelEl = document.getElementById("level_num");
const msgEl = document.getElementById("message");
const buttonEl = document.querySelector("button");

/*----- event listeners -----*/
buttonEl.addEventListener("click", handleBtnClick);

crystals.forEach(function(crystal) {
    crystal.addEventListener("click", handleCrystalClick);
});

/*----- functions -----*/

//to start or retry the game
function handleBtnClick() {
    boardEl.style.pointerEvents = "none";
    buttonEl.style.display = "none";
    currentLevel = 1;
    getLevelPat();
};

//to generate game pattern for each level
function getLevelPat() {
    msgEl.textContent = "";
    levelEl.textContent = currentLevel;

    for(let i = 0; i < currentLevel; i++) {
        getRandomCrystal();
        gamePat.push(randomCrystal);
    };

    lightCrystal();
};

//to generate a random crystal.
function getRandomCrystal() {
    let randomIdx = Math.floor(Math.random() * 5);
    randomCrystal = crystals[randomIdx].getAttribute("id");
    return randomCrystal;
};

//to light up the crystals 
function lightCrystal() {
    gamePat.forEach(function(color, idx) {
        let activeCrystal = document.getElementById(color);

        setTimeout(function() {
            activeCrystal.style.opacity = "1";
            activeCrystal.style.transform = "scale(0.95)";
            activeCrystal.childNodes[0].play();

            setTimeout(function() {
                activeCrystal.style.opacity = "0.6";
                activeCrystal.style.transform = "scale(1)";
            }, 200);

        }, (idx+1) * 1000 + 500);
    });
    
    setTimeout(function(){
        boardEl.style.pointerEvents = "auto";
        msgEl.textContent = "YOUR TURN";
    }, gamePat.length * 1000 + 700);
};

//to save player's input into the playerPat array.
function handleCrystalClick(evt) {
    let clickedCrystal = evt.target.getAttribute("id");
    playerPat.push(clickedCrystal);

    evt.target.childNodes[0].play();
    evt.target.style.opacity = "1";
    evt.target.style.transform = "scale(0.95)";
    
    setTimeout(function(){
        evt.target.style.opacity = "0.6";
        evt.target.style.transform = "scale(1)";
    }, 100);
    
    playerPat.forEach(checkPlayerPat);
}


//to compare playerPat with gamePat.
function checkPlayerPat(color, idx) {
    if (color === gamePat[idx]) {
        if (idx+1 === gamePat.length) {
            if (currentLevel < MAX_LEVEL) {
                nextLevel();
            } else {
                winEffects();
                msgEl.textContent = "YOU WIN!";
                buttonEl.textContent = "START"
                document.getElementById("win").play();
                boardEl.style.pointerEvents = "none";
                buttonEl.style.display = "block";
                patReset();
            }
        }
    } else {
        setTimeout(function() {
            document.getElementById("lose").play();
            msgEl.textContent = "YOU LOSE";
            buttonEl.style.display  = "block";
            buttonEl.textContent = "RETRY";
        }, 500);
        patReset();
    }
}

//to generate a new gamePat array for the next level
function nextLevel() {
    boardEl.style.pointerEvents = "none";
    currentLevel++;
    patReset();
    getLevelPat();
}

//special effect for winner
function winEffects() {
    crystals.forEach(function(crystal, idx) {

        setTimeout(function() {
            crystals[idx].style.opacity = "1";

            setTimeout(function() {
                crystals[idx].style.opacity = "0.6";
            }, 400);

        }, (idx+1) * 300);
    });
};

//to reset game and player pattern
function patReset() {
    gamePat = [];
    playerPat = [];
};