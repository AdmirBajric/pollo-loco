/**
 * Represents a life/health status bar.
 * @extends {DrawableObject}
 */
class LifeStatusBar extends DrawableObject {
  /**
   * An array of image paths representing different percentage levels of life/health.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Current percentage of life/health (default value is 100).
   * @type {number}
   */
  percentage = 100;

  /**
   * Constructor to initialize the life status bar.
   */
  constructor() {
    super();

    // Load the images for different percentage levels.
    this.loadImages(this.IMAGES);

    // Set the initial position and dimensions of the status bar.
    this.x = 30;
    this.y = 90;
    this.width = 250;
    this.height = 60;

    // Initialize the percentage and set the corresponding image.
    this.setPercentage(100);
  }

  /**
   * Set the current percentage of life/health and update the displayed image.
   * @param {number} percentage - The current percentage of life/health.
   */
  setPercentage(percentage) {
    this.percentage = percentage;

    // Determine the appropriate image based on the percentage and set it as the displayed image.
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolve the index of the image based on the current percentage.
   * @returns {number} - The index of the image based on the percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
