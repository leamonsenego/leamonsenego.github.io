class Wasp {
  static wasps = []

  constructor(gameScreen){
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 1000 + 70);
    this.top = 0;
    this.width = 50;
    this.height = 50;
    this.element = document.createElement("img");

    this.element.src="./images/wasp.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);

    Wasp.wasps = [...Wasp.wasps, this]
  }

  updatePosition(){
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move(){
  // Move the obstacle down and update its position on the screen
    this.top = this.top + 3;
    this.updatePosition();
  }

}
