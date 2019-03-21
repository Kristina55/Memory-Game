const cards = document.querySelectorAll('.memoryCard');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
   
 } 

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;
  //console.log(firstCard.dataset.name);
  //console.log(secondCard.dataset.name);
  checkForMatch();
}


function checkForMatch() {
  if(firstCard.dataset.name === secondCard.dataset.name){
      disableCards();
  } else {
      unflipCards();
  }
     
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


// How many clicks you've made  
var howManyClicks = document.getElementsByClassName("back-face");


function timesClicked (){
    for(var i=0; i<howManyClicks.length; i++){
        var score = 0;
        howManyClicks[i].addEventListener("click", function(){
        var insertCount = document.getElementById('countClicks'); 
        score += 1;
        insertCount.innerHTML = score;

        // Store score value at end of game
        localStorage.setItem("Score", JSON.stringify(score))
        }); 
    }    
}      
timesClicked();


var BestGame = document.getElementById("BestGame");
BestGame.addEventListener("click", function(){
 for (var i = 0; i < localStorage.length; i++){
    var key = localStorage.key(i);   
    console.log("storage " + key + " = " + JSON.parse(localStorage.getItem('Score'))); 
 }
 });

function refreshPage(){
    window.location.reload();
}