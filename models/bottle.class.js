/**
 * Represents a bottle object that extends MoveableObject.
 *
 * @class
 */
class Bottle extends MoveableObject {
  /**
   * Default height for the bottle object.
   * @type {number}
   */
  height = 110;

  /**
   * Default width for the bottle object.
   * @type {number}
   */
  width = 110;

  /**
   * The y-coordinate of the bottle object.
   * @type {number}
   */
  y;

  /**
   * A flag indicating whether the bottle has been collected.
   * @type {boolean}
   */
  collected = false;

  /**
   * An array of image paths for the bottle object.
   * @type {string[]}
   */
  IMAGES_BOTTLE = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  /**
   * Constructor for creating a Bottle object.
   *
   * @param {number} x - The initial x-coordinate of the bottle.
   * @param {number} y - The initial y-coordinate of the bottle (default value is 320).
   */
  constructor(x, y = 320) {
    // Call the constructor of the parent class (MoveableObject) using super().
    super();

    // Load the bottle object image.
    this.loadImages(this.IMAGES_BOTTLE);

    // Set the initial y-coordinate of the bottle.
    this.y = y;

    // Set the initial x-coordinate of the bottle with some randomness.
    this.x = x + Math.random() * 1600;
  }

  /**
   * Animate the bottle object by loading a specific image.
   */
  animate() {
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
  }

  /**
   * Mark the bottle as collected by setting the collected flag to true.
   */
  collect() {
    this.collected = true;
  }
}
