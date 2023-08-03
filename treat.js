class Treat {
  static treats = []
  constructor(gameScreen){
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 1000 + 70);
    this.top = 0;
    this.width = 60;
    this.height = 60;
    this.element = document.createElement("img");

    this.element.src="./images/dogstreats.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);

    Treat.treats = [...Treat.treats, this]
  }

  updatePosition(){
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move(){
    // Move the object down and update its position on the screen
    this.top = this.top + 3;
    this.updatePosition();
  }

}
