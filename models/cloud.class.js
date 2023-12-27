/**
 * Represents a Cloud that extends MoveableObject.
 */
class Cloud extends MoveableObject {
  /**
   * Initial y-coordinate of the cloud.
   * @type {number}
   */
  y = 50;

  /**
   * Width of the cloud.
   * @type {number}
   */
  width = 500;

  /**
   * Height of the cloud.
   * @type {number}
   */
  height = 200;

  /**
   * Constructor for creating a Cloud object.
   */
  constructor() {
    // Call the constructor of the parent class (MoveableObject) using super().
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    // Set the initial x-coordinate of the cloud with some randomness.
    this.x = Math.random() * 500;

    // Start the cloud's animation.
    this.animate();

    // Define an interval to move the cloud to the left.
    setInterval(() => {
      this.x -= 1;
    }, 50);
  }

  /**
   * Animate the cloud's movement.
   */
  animate() {
    this.moveLeft(); // Move the cloud to the left.
  }
}
