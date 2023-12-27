/**
 * Represents a second boss status bar that extends DrawableObject.
 *
 * @class
 */
class BossStatusBarSecond extends DrawableObject {
  /**
   * An array of image paths for different boss status bar colors.
   * @type {string[]}
   */
  IMAGES = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

  /**
   * Constructor for creating a BossStatusBarSecond object.
   */
  constructor() {
    // Call the constructor of the parent class (DrawableObject) using super().
    super().loadImage("img/7_statusbars/3_icons/icon_health_endboss.png");

    // Load the boss status bar images.
    this.loadImages(this.IMAGES);

    // Set the initial position, width, and height of the boss status bar.
    this.x = 445;
    this.y = 8;
    this.width = 60;
    this.height = 60;
  }

  /**
   * Animate the bottle object by loading a specific image.
   */
  animate() {
    this.loadImage("img/7_statusbars/3_icons/icon_health_endboss.png");
  }
}
