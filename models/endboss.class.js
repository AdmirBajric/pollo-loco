/**
 * Represents an Endboss that extends MoveableObject.
 */
class Endboss extends MoveableObject {
  /**
   * Default height, width, y-coordinate, speed, and state flags.
   * @type {number}
   */
  height = 400;
  width = 250;
  y = 60;
  speed = 12;
  count = 0;
  firstHit = false;
  secondHit = false;
  started = false;
  onStart = true;
  attack = false;
  walk = false;

  /**
   * Arrays of image paths for different boss animations.
   * @type {string[]}
   */
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructor for creating an Endboss object.
   */
  constructor() {
    // Call the constructor of the parent class (MoveableObject) using super().
    super().loadImage(this.IMAGES_WALK[0]);

    // Load images for various boss animations.
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);

    // Set the initial x-coordinate for the boss.
    this.x = 2500;
  }

  /**
   * Animate the boss by playing different animations based on its state.
   */
  animate() {
    setInterval(() => {
      if (this.onStart) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.attack) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (this.walk) {
        this.playAnimation(this.IMAGES_WALK);
        this.x -= this.speed;
      } else if (this.hurt) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.endGame) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);
  }

  /**
   * Trigger the boss's hurt animation.
   */
  hurtAnimation() {
    this.count += 1;

    if (this.count === 3) {
      this.firstHit = true;
    }

    this.walk = false;
    this.hurt = true;

    setTimeout(() => {
      this.walk = true;
      this.hurt = false;
    }, 400);

    setTimeout(() => {
      this.secondHit = true;
    }, 1000);
  }
}
