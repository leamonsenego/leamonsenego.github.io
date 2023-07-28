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
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(wasps) {
    const playerRect = this.element.getBoundingClientRect();
    const waspsRect = wasps.element.getBoundingClientRect();

    if (
      playerRect.left < waspsRect.right &&
      playerRect.right > waspsRect.left &&
      playerRect.top < waspsRect.bottom &&
      playerRect.bottom > waspsRect.top
    ) {
      return true;
    } else {
      return false;
    }

  }

}
