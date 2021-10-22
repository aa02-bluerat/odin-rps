//box
const playerScoreBox = document.querySelector('.playerscore');
const aiScoreBox = document.querySelector('.aiscore');
const battleText = document.querySelector('#head-text');
const battleResult = document.querySelector('#battle-result');

//hidden box
const modalBox = document.querySelector('.modal');
const overlayBg = document.querySelector('.overlay');
const modalMessage = document.querySelector('#result-message');
const btnPlayAgain = document.querySelector('.play-again')
const btnPlayExit = document.querySelector('.play-exit')

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
    return Math.floor(Math.random()*3);
}

function winGame(){
    console.log('win');
    storedPlayerScore++;
    battleResult.textContent=' You WIN';
    battleResult.style.color='#33ff00';
    updateScore();
}

function loseGame(){
    console.log('lose');
    storedAIScore++;
    battleResult.textContent='You LOST';
    battleResult.style.color='#ff0000';
    updateScore();
}

function noGame(){
    console.log('no game');
    battleResult.textContent="It's a DRAW";
    battleResult.style.color='#ff9d00';
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

function toggleModal(){
    modalBox.classList.toggle('hidden');
    overlayBg.classList.toggle('hidden') ;
}

function removeTransition(e){
    // console.log(e);
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
        selectHand[i].classList.add('pressed');
        playGame(playerHand,aiHand);
        battleLog(playerHand,aiHand);
        if(storedPlayerScore==10 ){
            toggleModal();
            modalMessage.textContent = 'VICTORY!';
            modalMessage.style.color = 'green';
        }
        else if(storedAIScore==10){
            toggleModal();
            modalMessage.textContent = 'BETTER LUCK NEXT TIME!';
            modalMessage.style.color = 'red';
        }
    })
}

btnPlayAgain.addEventListener('click', function(){
    storedPlayerScore=0;
    storedAIScore=0;
    battleText.textContent='Choose a hand...'
    battleResult.textContent=''
    updateScore();
    toggleModal();
})
btnPlayExit.addEventListener('click', function(){
    alert('good bye!')
})

imageGrab.forEach((key)=>{
    key.addEventListener('transitionend', removeTransition)
})

//regarding transtion end: after clicking the options, '.option .key' will
//append '.pressed'. and the '.option .key' should have the transition timer to
//determine if it has ended or not