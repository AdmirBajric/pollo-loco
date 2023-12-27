/**
 * Represents a moveable object with properties for movement and behavior.
 * @extends {DrawableObject}
 */
class MoveableObject extends DrawableObject {
  /**
   * Speed of the moveable object.
   * @type {number}
   */
  speed = 0.1;

  /**
   * Flag indicating the direction of movement.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Vertical speed of the moveable object.
   * @type {number}
   */
  speedY = 0;

  /**
   * Acceleration applied to the moveable object.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * Energy level of the moveable object.
   * @type {number}
   */
  energy = 100;

  /**
   * Timestamp of the last hit on the moveable object.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Flag indicating if the game is over for the moveable object.
   * @type {boolean}
   */
  gameOver = false;

  /**
   * Audio object for the chicken's death sound.
   * @type {Audio}
   */
  chickenDead = new Audio("./audio/chickendead.mp3");

  /**
   * Constructor to initialize the moveable object.
   */
  constructor() {
    // Call the constructor of the parent class (DrawableObject) using super()
    super();

    // Set the volume for the chicken's death sound.
    this.chickenDead.volume = 0.2;
  }

  /**
   * Play the chicken's death sound effect.
   */
  play() {
    this.chickenDead.play();
    this.chickenDead.volume = 0.025;
  }

  /**
   * Stop playing the chicken's death sound effect.
   */
  stop() {
    this.chickenDead.pause();
    this.chickenDead.currentTime = 0;
  }

  /**
   * Apply gravity to the object's vertical movement.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Check if the object is above the ground or a throwable object.
   * @returns {boolean} True if the object is above the ground or a throwable object, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 155;
    }
  }

  /**
   * Move the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Move the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Play an animation by cycling through a list of images.
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Make the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Check if the object is colliding with another movable object.
   * @param {MoveableObject} mo - The movable object to check for collision.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduce the object's energy and handle hit effects.
   */
  hit() {
    this.energy -= 2.5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Handle the object getting hit by a boss.
   */
  hitBoss() {
    this.energy = 0;
  }

  /**
   * Check if the object is hurt based on the time of the last hit.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.3;
  }

  /**
   * Check if the object is dead based on its energy level.
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }
}
