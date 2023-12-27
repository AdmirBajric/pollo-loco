/**
 * Represents a small chicken enemy that extends MoveableObject.
 * @extends {MoveableObject}
 */
class SmallChicken extends MoveableObject {
  /**
   * Height of the small chicken.
   * @type {number}
   */
  height = 60;

  /**
   * Width of the small chicken.
   * @type {number}
   */
  width = 80;

  /**
   * Initial y-coordinate of the small chicken.
   * @type {number}
   */
  y = 360;

  /**
   * Flag indicating if the small chicken is dead.
   * @type {boolean}
   */
  isDead = false;

  /**
   * Flag indicating if the small chicken should be deleted.
   * @type {boolean}
   */
  toDelete = false;

  /**
   * Array of image paths for the walking animation of small chickens.
   * @type {string[]}
   */
  IMAGES_WALKING_SMALL_CHICKEN = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Array of image paths for the dead state of small chickens.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    "img/background-none.png",
  ];

  /**
   * Constructor for initializing a small chicken object.
   * @param {number} speed - The speed of the small chicken's movement.
   * @param {number} x - The initial x-coordinate of the small chicken.
   */
  constructor(speed = 0.15, x) {
    // Call the parent class constructor and load the initial walking image.
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");

    // Load images for the walking animation sequence of the small chicken.
    this.loadImages(this.IMAGES_WALKING_SMALL_CHICKEN);

    // Load images for the dead animation sequence of the small chicken.
    this.loadImages(this.IMAGES_DEAD);

    // Set the small chicken's speed and initial horizontal position.
    this.speed = speed + Math.random() * 0.2;
    this.x = x + Math.random() * 1200;
  }

  /**
   * Animate the small chicken's movement and state changes.
   */
  animate() {
    // Create an interval to move the chicken to the left.
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    // Create an interval for enemy animations and state changes.
    const enemyInterval = setInterval(() => {
      if (this.isDead) {
        // Play the dead animation and delete the chicken after a delay.
        this.playAnimation([this.IMAGES_DEAD[0]]);
        this.play();
        setTimeout(() => {
          this.playAnimation([this.IMAGES_DEAD[1]]);
          setTimeout(() => {
            this.toDelete = true;
            clearInterval(enemyInterval);
          }, 300);
        }, 400);
      } else {
        // Play the walking animation when the chicken is alive.
        this.playAnimation(this.IMAGES_WALKING_SMALL_CHICKEN);
      }
    }, 100);
  }
}
