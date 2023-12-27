/**
 * Represents a drawable object.
 */
class DrawableObject {
  /**
   * Default x and y coordinates, height, width, and other properties.
   * @type {number}
   */
  x = 120;
  y = 250;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Offset values for positioning within the object's bounding box.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 20,
    bottom: 10,
    left: 20,
    right: 20,
  };

  /**
   * Load an image from the specified path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Load multiple images from an array and store them in the image cache.
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draw the object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
