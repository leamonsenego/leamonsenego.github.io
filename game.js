class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      500,
      800,
      160,
      200,
      "./images/dogface.png",
    );
    this.height = 1000;
    this.width = 1200;
    this.wasp = [];
    this.treat = [];
    this.treatscore = document.getElementById("treats-score");
    this.waspscore = document.getElementById("wasps-score");
    this.gameIsOver = false;
  }

  start() {
    // To set the game screen's dimensions
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;


    // Hiding the start screen
    this.startScreen.style.display = "none";

    // Showing the game screen
    this.gameScreen.style.display = "block";

    // To start the game loop
    this.gameLoop();
  }

  gameLoop() {
    // Interrupts function if the game is over
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop())
  }

  update(){
    this.player.move();


    // Check for collision and if a wasp is still on the screen
    for (let i = 0; i < this.wasp.length; i++) {
      const wasp = this.wasp[i];
      wasp.move();

      // If the player collides with a wasp
      if (this.player.didCollideWasp(wasp)) {
        // Remove the obstacle element from the DOM
        wasp.element.remove();
        // Add wasp object from the array
        this.wasp = [...this.wasp];
        // Update the counter variable to account for the wasp
        i++;
        // Add 1 to the wasp score
        this.waspscore.innerHTML = ("Wasp bites: " + i)
        // If 5 wasp bites, game is over
        if (this.waspscore > 5) {
          this.endGame();
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
        // Add treat object from the array
        this.treat = [...this.treat];
        // Update the counter variable to account for the treat (yummy!)
        j++;
        // Add 1 to the treat score
        this.treatscore.innerHTML = ("Treats caught: " + j)
      }
    }


    // Create a new wasp obstacle based on a random probability
    // max 8 wasps at once on the screen
    if (Math.random() > 0.98 && this.wasp.length < 8) {
      this.wasp.push(new Wasp(this.gameScreen));
    }

    // Create the treats based on random probability
    // max 10 treats at once on the screen
    if (Math.random() > 0.98 && this.treat.length < 10) {
      this.treat.push(new Treat(this.gameScreen));
    }
  }


  endGame() {
    
    console.log("game over")
      this.player.element.remove();
      this.gameIsOver = true;

    // Hides game screen and displays end game screen
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
