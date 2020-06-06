class AudioController {
    constructor() {
        this.bgMusic = new Audio('./assets/Audio/background.mp3');
        this.flipSound = new Audio('./assets/Audio/flip.wav');
        this.matchSound = new Audio('./assets/Audio/match.wav');
        this.winnerSound = new Audio('./assets/Audio/winner.wav');
        this.gameOverSound = new Audio('./assets/Audio/gameover.wav');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    winner() {
        this.stopMusic();
        this.winnerSound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class FindCard {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);

        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }

    winner() {
        clearInterval(this.countDown);
        this.audioController.winner();
        document.getElementById('winner-text').classList.add('visible');
    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0 ; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else 
                this.cardToCheck = card;
        }
    }

    checkForCardMatch(card) {
        if(this.getCardType(card)  === this.getCardType(this.cardToCheck))
            this.cardMatch(card);
        else 
            this.cardMisMatch(card);
    }

    cardMatch(card) {
        // funksionin per mu bo match frutat
    }

    cardMisMatch(card) {
        // funksionin kur nuk jon match frutat
    }

    getCardType(card) {
        return card.getElementsByClassName('middle')[1].src;
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
    let starts = Array.from(document.getElementsByClassName('text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new FindCard(50, cards);

    starts.forEach( start => {
        start.addEventListener('click', () => {
            start.classList.remove('visible');
            game.startGame();
      
        });
    });

    cards.forEach( card => {
        card.addEventListener('click', () => {
            // rrotullimi i kartes
            game.flipCard(card);
        })
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready())
} else {
    ready();
}

