/**
 * Represents a Coin Status Bar that extends DrawableObject.
 */
class CoinStatusBar extends DrawableObject {
  /**
   * Array of image paths for the coin status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * The current percentage of coins.
   * @type {number}
   */
  percentage = 0;

  /**
   * Constructor for creating a CoinStatusBar object.
   */
  constructor() {
    // Call the constructor of the parent class (DrawableObject) using super().
    super();

    // Load the images for the coin status bar.
    this.loadImages(this.IMAGES);

    // Set the initial x and y coordinates, width, and height of the status bar.
    this.x = 30;
    this.y = 45;
    this.width = 250;
    this.height = 60;

    // Initialize the percentage and set the initial coin status.
    this.setPercentage(0);
  }

  /**
   * Set the current image of the status bar based on the percentage.
   */
  setPercentage() {
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Update and show the coin status bar.
   */
  showCoinsStatus() {
    this.setPercentage();
  }

  /**
   * Determine the index of the image based on the percentage.
   * @returns {number} The index of the image.
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
