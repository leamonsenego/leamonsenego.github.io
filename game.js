class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreenLose = document.getElementById("game-end-lose");
    this.gameEndScreenWin = document.getElementById("game-end-win");
    this.player = new Player(
      this.gameScreen,
      500,
      800,
      160,
      200,
      "./images/dogface.png"
    );
    this.height = 1000;
    this.width = 1200;
    this.wasp = [];
    this.treat = [];

    this.timerDuration = 20000;
    this.timerElement = document.getElementById("game-timer");
    this.timer = null;
    this.timeLeft = 3000;

    this.treatscore = document.getElementById("treats-score");
    this.waspscore = document.getElementById("wasps-score");

    this.treatsCaught = 0;
    this.waspBites = 0;

    this.waspCreationInterval = 1000; // Creates a new wasp every 1 second
    this.waspCreationTimer = null;
    this.treatCreationInterval = 1000; // Creates a new treat every 1 second
    this.treatCreationInterval = null;

    this.backgroundAudio = document.getElementById("background-audio");
    this.gameOverAudio = document.getElementById("game-over-audio");
    this.winnerAudio = document.getElementById("winner-audio");

    this.gameIsOver = false;
  }

  start() {
    // To stop the game over audio from playing:
    this.stopGameOverAudio();

    // Stop the background audio in case it was already playing
    this.stopBackgroundAudio();

    // To set the game screen's dimensions
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hiding the start screen
    this.startScreen.style.display = "none";

    // Showing the game screen
    this.gameScreen.style.display = "block";

    // Start the audio
    this.playBackgroundAudio();

    // Start the timer
    this.startTimer();

    // Start the wasp creation interval
    this.startWaspCreation();

    // Add a delay of 500 milliseconds before starting treat creation interval
    setTimeout(() => {
      this.startTreatCreation(); // Start treat creation interval after the initial delay
    }, 500);

    // To start the game loop
    this.gameLoop();
  }

  playBackgroundAudio() {
    this.backgroundAudio.play();
  }

  startTimer() {
    let startTime = Date.now();
    this.timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      this.timeLeft = Math.max(0, this.timerDuration - elapsedTime);
      const seconds = Math.floor(this.timeLeft / 1000);

      this.timerElement.innerHTML = "Time: " + seconds + " seconds";

      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000); // Update the timer every 1 second (1000 milliseconds)
  }

  startWaspCreation() {
    this.waspCreationTimer = setInterval(() => {
      if (this.wasp.length < 8) {
        this.wasp.push(new Wasp(this.gameScreen));
      }
    }, this.waspCreationInterval);
  }

  startTreatCreation() {
    this.treatCreationTimer = setInterval(() => {
      if (this.treat.length < 10) {
        this.treat.push(new Treat(this.gameScreen));
      }
    }, this.treatCreationInterval);
  }

  gameLoop() {
    // Interrupts function if the game is over
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();

    // Check for collision and if a wasp is still on the screen
    for (let i = 0; i < this.wasp.length; i++) {
      const wasp = this.wasp[i];
      wasp.move();

      // If the player collides with a wasp
      if (this.player.didCollideWasp(wasp)) {
        // Remove the obstacle element from the DOM
        wasp.element.remove();
        // Remove the wasp object from the array
        this.wasp.splice(i, 1);
        // Update the counter variable to account for the wasp
        this.waspBites++;
        // Add 1 to the wasp score
        this.waspscore.innerHTML = "Wasp bites: " + this.waspBites;
        // If 5 wasp bites, game is over
        if (this.waspBites >= 5 || this.timeLeft <= 0) {
          this.endGameLose();
          return; // Exist the function to avoid further updates
        }
      }
    }

    // Check for collision and if a treat is still on the screen
    for (let j = 0; j < this.treat.length; j++) {
      const treat = this.treat[j];
      treat.move();

      //If the player catches a treat
      if (this.player.didCollideTreat(treat)) {
        // Remove the obstacle element from the DOM
        treat.element.remove();
        // Remove the treat object from the array
        this.treat.splice(j, 1);
        // Increment the treat counter
        this.treatsCaught++;
        // Update the treat score
        this.treatscore.innerHTML = "Treats caught: " + this.treatsCaught;
        // Decrement j to account for removed element
        j--;
        // If 8 treats caught, player wins and game is over
        if (this.treatsCaught >= 8) {
          this.endGameWin();
          return; // Exist the function to avoid further updates
        }
      }
    }

    // Remove excess wasps if the limit is exceeded
    while (this.wasp.length > 8) {
      // Remove the last (newest) wasp from the array and the DOM
      const removedWasp = this.wasp.pop();
      removedWasp.element.remove();
    }

    // Remove excess treats if the limit is exceeded
    while (this.treat.length > 10) {
      // Remove the first (oldest) treat from the array and the DOM
      const removedTreats = this.treat.pop();
      removedTreats.element.remove();
    }
  }

  stopBackgroundAudio() {
    this.backgroundAudio.pause();
  }

  playGameOverAudio() {
    // Set the audio to autoplay and loop
    this.gameOverAudio.autoplay = true;
    this.gameOverAudio.loop = true;

    // Play the audio
    this.gameOverAudio.play();
  }

  stopGameOverAudio() {
    // Pause and reset the audio
    this.gameOverAudio.pause();
    this.gameOverAudio.currentTime = 0;
  }

  playWinnerAudio() {
    // Set the audio to autoplay and loop
    this.winnerAudio.autoplay = true;
    this.winnerAudio.loop = true;

    // Play the audio
    this.winnerAudio.play();
  }

  stopWinnerAudio() {
    // Pause and reset the audio
    this.winnerAudio.pause();
    this.winnerAudio.currentTime = 0;
  }

  endGameLose() {
    this.player.element.remove();
    this.wasp.forEach(function (wasp) {
      wasp.element.remove();
    });
    this.treat.forEach(function (treat) {
      treat.element.remove();
    });

    this.gameIsOver = true;
    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreenLose.style.display = "block";
    // Stops the music
    this.stopBackgroundAudio();
    // Play the game over audio
    this.playGameOverAudio();

    // Clear the timer interval when the game ends
    clearInterval(this.timer);

    // Clear wasp and treat interval creation
    clearInterval(this.waspCreationTimer);
    clearInterval(this.treatCreationTimer);
  }

  endGameWin() {
    this.player.element.remove();
    this.wasp.forEach(function (wasp) {
      wasp.element.remove();
    });
    this.treat.forEach(function (treat) {
      treat.element.remove();
    });

    this.gameIsOver = true;
    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreenWin.style.display = "block";
    // Stops the music
    this.stopBackgroundAudio();
    // Play the game over audio
    this.playWinnerAudio();

    // Clear the timer interval when the game ends
    clearInterval(this.timer);

    // Clear wasp and treat interval creation
    clearInterval(this.waspCreationTimer);
    clearInterval(this.treatCreationTimer);
  }
}


