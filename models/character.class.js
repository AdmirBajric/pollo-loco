/**
 * Represents a character that extends MoveableObject.
 */
class Character extends MoveableObject {
  /**
   * Default height of the character.
   * @type {number}
   */
  height = 280;

  /**
   * Default y-coordinate of the character.
   * @type {number}
   */
  y = 80;

  /**
   * Flag to indicate if the character starts moving right.
   * @type {boolean}
   */
  startRight = true;

  /**
   * A count property to keep track of animation frames.
   * @type {number}
   */
  count = 0;

  /**
   * Count of collected coins.
   * @type {number}
   */
  coins = 0;

  /**
   * Count of collected bottles.
   * @type {number}
   */
  bottles = 0;

  /**
   * Speed of character movement.
   * @type {number}
   */
  speed = 10;

  /**
   * Current game level (assumed to be an object called level1).
   * @type {object}
   */
  level = level1;

  /**
   * Arrays of image paths for character walking animations.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Arrays of image paths for character jumping animations.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Arrays of image paths for character idle animations.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Arrays of image paths for character long idle animations.
   * @type {string[]}
   */

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Arrays of image paths for character death animations.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Arrays of image paths for character hurt animations.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Constructor for creating a Character object.
   */
  constructor() {
    // Call the constructor of the parent class (MoveableObject) using super().
    super();

    this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);

    // Initialize audio objects for character sounds.
    this.walking_sound = new Audio("./audio/running.mp3");
    this.walking_sound.volume = 0.025;
    this.characterHurt = new Audio("./audio/hurt.mp3");
    this.characterHurt.volume = 0.025;
    this.jumping = new Audio("./audio/jump.mp3");
    this.jumping.volume = 0.025;

    // Apply gravity and start the character's animation.
    this.applyGravity();
    this.animate();
  }

  /**
   * Play the character hurt sound.
   */
  playHurtSound() {
    this.characterHurt.play();
  }

  /**
   * Play the walking sound for the character.
   */
  playWalkingSound() {
    this.walking_sound.play();
  }

  /**
   * Start the character's animation loop.
   */
  animate() {
    setInterval(() => {
      this.characterMoveRight();
      this.characterMoveLeft();
      this.characterJump();

      // Update the camera position based on the character's x-coordinate.
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    // Check the character's current state for animation.
    this.checkState();
  }

  /**
   * Move the character to the right if the RIGHT key is pressed and if the character x-coordinate is lower than the world end coordinate.
   */
  characterMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.startRight = true;
      this.otherDirection = false;
    }
  }

  /**
   * Move the character to the left if the LEFT key is pressed and the character coordinate is greater than 0.
   */
  characterMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.startRight = false;
      this.otherDirection = true;
    }
  }

  /**
   * Make the character jump if the SPACE key is pressed and it's not already in the air.
   */
  characterJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jumping.play();
      this.jump();
    }
  }

  /**
   * Check the character's state and determine the appropriate animation.
   */
  checkState() {
    setInterval(() => {
      this.walking_sound.pause();
      this.count += 1;
      this.characterCheckStates();
    }, 100);
  }

  /**
   * Check the character's state and play the corresponding animation.
   */
  characterCheckStates() {
    if (this.isDead()) {
      this.characterAnimationDead();
    } else if (this.isHurt()) {
      this.characterAnimationHurt();
    } else if (this.isAboveGround()) {
      this.characterAboveGround();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.characterIsWalking();
    } else if (this.count > 50) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Play the animation for the character's death.
   */
  characterAnimationDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.count = 0;
  }

  /**
   * Play the animation for the character getting hurt.
   */
  characterAnimationHurt() {
    this.playAnimation(this.IMAGES_HURT);
    if (!this.gameOver) {
      this.playHurtSound();
    }
    this.count = 0;
  }

  /**
   * Play the animation for the character when in the air.
   */
  characterAboveGround() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.count = 0;
  }

  /**
   * Play the walking animation and sound for the character.
   */
  characterIsWalking() {
    this.playAnimation(this.IMAGES_WALKING);
    if (!this.gameOver) {
      this.walking_sound.play();
    }
    this.count = 0;
  }
}
