window.onload = function () {
  const startButton = document.getElementById("start-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  // Function to start the game
  function startGame() {
    console.log("start");
    game = new Game();

    game.start();
  }

  // Function to handle keydown event
    function handleKeydown(event) {
      const key = event.key;
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];

    // Control if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directions based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -4;
          break;
        case "ArrowUp":
          game.player.directionY = -4;
          break;
        case "ArrowRight":
          game.player.directionX = 4;
          break;
        case "ArrowDown":
          game.player.directionY = 4;
          break;
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);

};
