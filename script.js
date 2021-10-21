//box
const playerScoreBox = document.querySelector('.playerscore');
const aiScoreBox = document.querySelector('.aiscore');
const battleText = document.querySelector('#head-text')

//scores
const playerScore = document.querySelector('#player-score');
const aiScore = document.querySelector('#ai-score');
let storedPlayerScore = 0;
let storedAIScore = 0;

//hands
const playRock = document.querySelector('#rock');
const playPaper = document.querySelector('#paper');
const playScissors = document.querySelector('#scissors');
const selectHand = document.querySelectorAll('.option .key');

//effects
const imageGrab = document.querySelectorAll('.option .key'); //this class should have the transition timer

function randomNumber(){
    return Math.floor(Math.random()*3)
}

function winGame(){
    console.log('win');
    storedPlayerScore++;
    updateScore()
}

function loseGame(){
    console.log('lose')
    storedAIScore++;
    updateScore()
}

function noGame(){
    console.log('no game')
}

function playGame(a,b){
    if (a==b){
        noGame()
    }
    else if (a=='ROCK' && b=='SCISSORS'){
        winGame()
    }
    else if (a=='PAPER' && b=='ROCK'){
        winGame()
    }
    else if (a=='SCISSORS' && b=='PAPER'){
        winGame()    
    }
    else{
        loseGame()
    }
}

function updateScore(){
    playerScore.textContent = storedPlayerScore;
    aiScore.textContent = storedAIScore;
}

function battleLog(a,b){
    battleText.textContent = `Player:${a} vs AI:${b}`;
}

function removeTransition(e){
    console.log(e);
    if (e.propertyName !== 'transform'){   //if not a transform property, return nothing, wont proceed
        return;
    }
    this.classList.remove('pressed')
}

for (let i=0; i<selectHand.length; i++){
    selectHand[i].addEventListener('click', function(){
        handList = ['ROCK', 'PAPER', 'SCISSORS'];
        playerHand = handList[i];
        aiHand = handList[randomNumber()];
        // console.log('your pick' + playerHand);
        // console.log(aiHand);
        selectHand[i].classList.add('pressed');
        playGame(playerHand,aiHand);
        battleLog(playerHand,aiHand);
        if(storedPlayerScore==10 || storedAIScore==10){
            alert('game over');
        }
    })
}

imageGrab.forEach((key)=>{
    key.addEventListener('transitionend', removeTransition)
})

//regarding transtion end: after clicking the options, '.option .key' will
//append '.pressed'. and the '.option .key' should have the transition timer to
//determine if it has ended or not