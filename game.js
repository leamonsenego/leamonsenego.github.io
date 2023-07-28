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
    this.wasps = [];
    this.treats = [];
    this.score = 0;
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

  update() {
    this.player.move();
  }


  endGame() {

    // Hides game screen and displays end game screen
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
