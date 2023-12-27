/**
 * Represents a boss status bar that extends DrawableObject.
 *
 * @class
 */
class BossStatusBar extends DrawableObject {
  /**
   * An array of image paths for different boss status bar colors.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * The current percentage of the boss's status.
   * @type {number}
   */
  percentage = 100;

  /**
   * Constructor for creating a BossStatusBar object.
   */
  constructor() {
    // Call the constructor of the parent class (DrawableObject) using super().
    super();

    // Load the boss status bar images.
    this.loadImages(this.IMAGES);

    // Set the initial position, width, and height of the boss status bar.
    this.x = 450;
    this.y = 0;
    this.width = 250;
    this.height = 60;

    // Initialize the percentage and set the initial boss status.
    this.setPercentage();
  }

  /**
   * Set the boss status bar image based on the current percentage.
   */
  setPercentage() {
    // Determine the image path based on the current percentage.
    let path = this.IMAGES[this.resolveImageIndex()];

    // Set the image to be displayed.
    this.img = this.imageCache[path];
  }

  /**
   * Increase the boss's status by 20% and update the status bar image.
   */
  showBossStatus() {
    if (this.percentage >= 40) {
      this.percentage -= 20;
    } else {
      this.percentage -= 40;
    }
    this.setPercentage();
  }

  /**
   * Resolve the image index based on the current percentage.
   *
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 4;
    } else if (this.percentage >= 80) {
      return 3;
    } else if (this.percentage >= 60) {
      return 2;
    } else if (this.percentage >= 40) {
      return 1;
    } else {
      return 0;
    }
  }
}
