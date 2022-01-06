/*----- constants -----*/
const MAX_LEVEL = 3;

/*----- app's state (variables) -----*/
let currentLevel = 0;
let gamePat = [];
let playerPat = [];

/*----- cached element references -----*/
const crystals = document.querySelectorAll(".crystal");
const buttonEl = document.querySelector("button");
const levelEl = document.getElementById("level_num");
const msgEl = document.getElementById("message");
const bodyEl = document.querySelector("body");

/*----- event listeners -----*/
buttonEl.addEventListener("click", handleBtnClick);

crystals.forEach(function(crystal){
    crystal.addEventListener("click", handleCrystalClick)
});


/*----- functions -----*/

//to start/restart the game at level one.
function handleBtnClick() {
    bodyEl.style.pointerEvents = "none";
    buttonEl.style.display = "none";
    msgEl.textContent = "game start";
    currentLevel = 1;
    levelEl.textContent = currentLevel;
    getRandomCrystal();
    gamePat.push(randomCrystal);
    console.log(gamePat)
    lightCrystal();
}

//to generate a random crystal.
function getRandomCrystal() {
    let randomNum = Math.floor(Math.random() * 5);
    randomCrystal = crystals[randomNum].getAttribute("id");
    return randomCrystal;
}

//to save player's input into the playerPat array.
//then validate player's choices.
function handleCrystalClick(evt) {
    let clickedCrystal = evt.target.getAttribute("id");
    playerPat.push(clickedCrystal);
    console.log(playerPat)
    evt.target.style.opacity = "1"
    setTimeout(function(){
        evt.target.style.opacity = "0.6"
    }, 500)
    
    playerPat.forEach(checkPlayerPat);
}




//to compare playerPat with gamePat.
//level 2: gamePat = [purple, green]
//palyerPat = [purple]
function checkPlayerPat(color, idx){
    if (color === gamePat[idx]){
        console.log(gamePat.length)
        console.log(playerPat.length)
        console.log(idx)
        if (idx+1 === gamePat.length) {
            
            if (currentLevel < MAX_LEVEL){
                nextLevel()
                console.log(gamePat)
            } else {
                msgEl.textContent = "YOU ARE THE WINNER!!!";
                buttonEl.style.display = "block";
                gamePat = [];
                playerPat = [];
            }
        }else{console.log("hah")}
    } else {
        msgEl.textContent = "you lose, start over";
        buttonEl.style.display  = "block";
        gamePat = [];
        playerPat = [];
    }
}

//to generate a new gamePat array for the next level
function nextLevel() {
    bodyEl.style.pointerEvents = "none";
    currentLevel++;
    levelEl.textContent = currentLevel;
    gamePat = [];
    playerPat = [];
    for(let i = 0; i < currentLevel; i++) {
        getRandomCrystal()
        gamePat.push(randomCrystal);
    }
    lightCrystal();
    msgEl.textContent = "AI";
}

//to light up the crystals 
//level 3: gamePat = [blue, green, yellow]
//index: 0, 1, 2
//timer: 1s, 2s, 3s from now
function lightCrystal() {
    gamePat.forEach(function(color, idx) {
        let activeCrystal = document.getElementById(color)
        setTimeout(function() {
            activeCrystal.style.opacity = "1";
            setTimeout(function() {
                activeCrystal.style.opacity = "0.6";
            },500)
        }, (idx+1) * 1500)
    })
    setTimeout(function(){
        bodyEl.style.pointerEvents = "all";
        msgEl.textContent = "your turn";
    }, gamePat.length * 1500 + 500)
}
