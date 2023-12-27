/**
 * Represents a Chicken that extends MoveableObject.
 */
class Chicken extends MoveableObject {
  /**
   * Default height of the chicken.
   * @type {number}
   */
  height = 60;

  /**
   * Default width of the chicken.
   * @type {number}
   */
  width = 80;

  /**
   * Default y-coordinate of the chicken.
   * @type {number}
   */
  y = 360;

  /**
   * Flag to indicate if the chicken is dead.
   * @type {boolean}
   */
  isDead = false;

  /**
   * Flag to indicate if the chicken should be deleted.
   * @type {boolean}
   */
  toDelete = false;

  /**
   * Array of image paths for walking animation of the chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Array of image paths for the dead state of the chicken.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "img/background-none.png",
  ];

  /**
   * Constructor for creating a Chicken object.
   * @param {number} speed - The speed of the chicken's movement.
   * @param {number} x - The initial x-coordinate of the chicken.
   */
  constructor(speed = 0.15, x) {
    // Call the constructor of the parent class (MoveableObject) using super().
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    // Load images for walking and dead animations.
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    // Set the speed of the chicken with some randomness.
    this.speed = speed + Math.random() * 0.25;

    // Set the initial x-coordinate of the chicken with some randomness.
    this.x = x + Math.random() * 1100;
  }

  /**
   * Animate the chicken's movement and state.
   */
  animate() {
    setInterval(() => {
      // Move the chicken to the left.
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    // Define an interval to handle chicken animations and state changes.
    const enemyInterval = setInterval(() => {
      if (this.isDead) {
        // Play the dead animation and delete the chicken after a delay.
        this.playAnimation([this.IMAGES_DEAD[0]]);
        this.play();
        playDeadAnimation(); // Call the playDeadAnimation function
      } else {
        // Play the walking animation when the chicken is alive.
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);

    // Function to play the dead animation and delete the chicken.
    const playDeadAnimation = () => {
      setTimeout(() => {
        this.playAnimation([this.IMAGES_DEAD[1]]);
        setTimeout(() => {
          this.toDelete = true;

          // Clear the interval to stop animations.
          clearInterval(enemyInterval);
        }, 300);
      }, 400);
    };
  }
}
