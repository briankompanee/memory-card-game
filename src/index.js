import "./scss/styles.scss"

class MemoryCardGame {
    // Set properties of global obj
    constructor(totalTime, cards) {
        // statically set
        this.cardsArray = cards;
        this.totalTime = totalTime;
        // dynamically set timer and flipcount
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('timeRemaining')
        this.flipCount = document.getElementById('flips');
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        // Animation is happening, card has been clicked & matched, or cardtoCheck is not null
        this.busy = true;
        // wait 500 milisecs before starting these functions, smoother transition for game over/start game
        setTimeout(() => {
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.flipCount.innerText = this.totalClicks;
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            // update flip counter
            this.totalClicks++;
            this.flipCount.innerText = this.totalClicks;
            card.classList.add('visible');
            // should we check for a match or not
        }
    }

    /* Fisher-Yates Shuffle Algorithm
        Algo to shuffle array lenght of array - 1
        loop backwards from last item in the array
        for each item in array create a random integer
        random int is <= 0 
        exchange the random int with the current item
    */
    shuffleCards(cardsArray) { 
        for (let i = cardsArray.length - 1; i > 0; i--) {
            // creates random float between 0 and 1 (not 1 itself) and rounds the number down
            let randomIndex = Math.floor(Math.random() * (i + 1));
            // use order from style css grid property 
            cardsArray[randomIndex].style.order = i;
            // takes random item in card list and swaps css grid order
            cardsArray[i].style.order = randomIndex;
        }
    }

    canFlipCard(card) {
        /* Boolean to check if game is busy/started, card is not matched, 
            card is not the card to check if matched
            then return true so card can be flipped
            gives time for shuffle to run
            all statements should be false to return true, then user can flip the card
        */
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}
}


/* Event listener - to start game on DOM load
    If DOM is still loading call "ready" function when DOM is loaded
    If not then page is loaded and call "ready" function
*/
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// "ready" function
function ready() {
    // create and array for overlay elements
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    // create and array for card elements
    let cards = Array.from(document.getElementsByClassName('card'));

  
    //for each item in the overlay call event listener click function
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            // remove visible class
            overlay.classList.remove('visible');
            // call start the game function
            game.startGame();
        });
    });

    //for each card call event listener click function
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // On click function will flip the card over
            game.flipCard(card);
        });
    });
}