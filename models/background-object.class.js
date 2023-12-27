/**
 * Represents a background object that extends MoveableObject.
 *
 * @class
 */
class BackgroundObject extends MoveableObject {
  /**
   * Default width for background objects.
   * @type {number}
   */
  width = 720;

  /**
   * Default height for background objects.
   * @type {number}
   */
  height = 480;

  /**
   * Constructor for creating a BackgroundObject.
   *
   * @param {string} imagePath - The path to the image used for the background.
   * @param {number} x - The initial x-coordinate where the background object will be placed.
   */
  constructor(imagePath, x) {
    // Call the constructor of the parent class (MoveableObject) using super(),
    // and load the background image using the provided imagePath.
    super().loadImage(imagePath);

    // Set the initial x-coordinate of the background object.
    this.x = x;

    // Calculate the initial y-coordinate to position the object at the bottom of the canvas.
    this.y = 480 - this.height;
  }
}
