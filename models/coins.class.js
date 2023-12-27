/**
 * Represents a Coin object that extends MoveableObject.
 */
class Coins extends MoveableObject {
  /**
   * Default height and width for the coin object.
   * @type {number}
   */
  height = 110;
  width = 110;

  /**
   * The y-coordinate of the coin.
   * @type {number}
   */
  y;

  /**
   * A flag to indicate whether the coin has been collected.
   * @type {boolean}
   */
  collected = false;

  /**
   * Array of image paths for the coin animation.
   * @type {string[]}
   */
  IMAGES_COINS = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

  /**
   * Constructor for creating a Coins object.
   * @param {number} x - The initial x-coordinate of the coin.
   * @param {number} y - The initial y-coordinate of the coin (defaulted to 320 if not provided).
   */
  constructor(x, y = 320) {
    // Call the constructor of the parent class (MoveableObject) using super().
    super().loadImage("./img/8_coin/coin_1.png");

    // Load images for the coin animation.
    this.loadImages(this.IMAGES_COINS);

    // Set the initial x and y coordinates of the coin with some randomness.
    this.x = x + Math.random() * 1600;
    this.y = y;
  }

  /**
   * Animate the coin by cycling through its images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 500);
  }

  /**
   * Mark the coin as collected.
   */
  collect() {
    this.collected = true;
  }
}
