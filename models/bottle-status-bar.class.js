/**
 * Represents a bottle status bar that extends DrawableObject.
 *
 * @class
 */
class BottleStatusBar extends DrawableObject {
  /**
   * An array of image paths for different bottle status bar states.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  /**
   * The current percentage of the bottle's status.
   * @type {number}
   */
  percentage = 0;

  /**
   * Constructor for creating a BottleStatusBar object.
   */
  constructor() {
    // Call the constructor of the parent class (DrawableObject) using super().
    super();

    // Load the bottle status bar images.
    this.loadImages(this.IMAGES);

    // Set the initial position, width, and height of the bottle status bar.
    this.x = 30;
    this.y = 0;
    this.width = 250;
    this.height = 60;

    // Initialize the percentage and set the initial bottle status.
    this.setPercentage(0);
  }

  /**
   * Set the bottle status bar image based on the current percentage.
   */
  setPercentage() {
    // Determine the image path based on the current percentage.
    let path = this.IMAGES[this.resolveImageIndex()];

    // Set the image to be displayed.
    this.img = this.imageCache[path];
  }

  /**
   * Update the bottle status bar to reflect the current percentage.
   */
  showBottleStatus() {
    this.setPercentage();
  }

  /**
   * Resolve the image index based on the current percentage.
   *
   * @returns {number} The index of the image to display.
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
