/**
 * Represents a throwable object that extends MoveableObject.
 * @extends {MoveableObject}
 */
class ThrowableObject extends MoveableObject {
  /**
   * Flag to track if the object is broken.
   * @type {boolean}
   */
  broken = false;

  /**
   * Index to keep track of the current image being displayed.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Interval for animating the splash effect.
   * @type {number}
   */
  splashInterval;

  /**
   * Image paths for bottle rotation animation.
   * @type {string[]}
   */
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Image paths for bottle splash animation.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    "img/background-none.png",
  ];

  /**
   * Constructor for initializing a throwable object.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   */
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    ); // Call the constructor of the parent class (MoveableObject)
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.audio = new Audio("audio/bottle.mp3");
    this.audio.volume = 0.025;
    this.x = x; // Set the initial x-coordinate
    this.y = y; // Set the initial y-coordinate
    this.height = 60; // Set the height of the object
    this.width = 50; // Set the width of the object

    this.throw(); // Initiate the throwing action
  }

  /**
   * Perform the throwing action, including animation and movement.
   */
  throw() {
    this.speedY = 25; // Set the vertical speed for the throw
    this.applyGravity(); // Apply gravity to the object
    this.animateBottle(); // Start the bottle animation
    this.moveInterval = setInterval(() => {
      if (this.y < 350 && !this.broken) {
        this.x += 10; // Move the object horizontally
      } else {
        this.currentImage = 0; // Reset the current image index
        clearInterval(this.moveInterval); // Stop the movement interval
      }
    }, 25);
  }

  /**
   * Animate the bottle's rotation and splash effect.
   */
  animateBottle() {
    this.splashInterval = setInterval(() => {
      if (this.y < 350 && !this.broken) {
        this.playAnimation(this.IMAGES_ROTATION); // Animate the rotation
      } else {
        this.audio.volume = 0.025;
        this.audio.play();
        this.playAnimation(this.IMAGES_SPLASH); // Animate the splash effect
        // this.broken = true;
        if (this.currentImage == this.IMAGES_SPLASH.length)
          clearInterval(this.splashInterval); // Stop the splash animation when done
      }
    }, 10);
  }
}
