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
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
        }
    }

    canFlipCard(card) {
        return true;
        //return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
    let starts = Array.from(document.getElementsByClassName('text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new FindCard(100, cards);

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

