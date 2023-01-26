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
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            // update flip counter
            this.totalClicks++;
            this.flipCount.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    
    canFlipCard(card) {
        /* 
        boolean to check if game is busy/started, card is not matched, 
        card is not the card to check if matched
        then return true so card can be flipped
        gives time for shuffle to run
        all statements should be false to return true, then user can flip the card
        */
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}
}


/* 
Event listener - to start game on DOM load
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
            // game.startGame();
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