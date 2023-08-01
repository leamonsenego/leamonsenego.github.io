class Player{
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";

    // Setting up the default element's property values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Update player's position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    // Update the player's position on the screen
    this.updatePosition();
    
    // Ensure the player stays within the game screen
    if (this.left < 10) {
      this.left = 10;
    }
    if (this.top < 10) {
      this.top = 10;
    }
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }
  }

  didCollideWasp(wasp) {
    const playerRect = this.element.getBoundingClientRect();
    const waspRect = wasp.element.getBoundingClientRect();

    if (
      playerRect.left < waspRect.right &&
      playerRect.right > waspRect.left &&
      playerRect.top < waspRect.bottom &&
      playerRect.bottom > waspRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  didCollideTreat(treat){
    const playerRect = this.element.getBoundingClientRect();
    const treatRect = treat.element.getBoundingClientRect();

    if (
      playerRect.left < treatRect.right &&
      playerRect.right > treatRect.left &&
      playerRect.top < treatRect.bottom &&
      playerRect.bottom > treatRect.top
    ) {
      return true;
    } else {
      return false;
    }

  }


  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

}
