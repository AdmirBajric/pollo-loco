/**
 * Represents a game level.
 */
class Level {
  /**
   * An array to store enemy objects in the level.
   * @type {MoveableObject[]}
   */
  enemies;

  /**
   * An array to store cloud objects in the level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * An array to store background objects in the level.
   * @type {DrawableObject[]}
   */
  backgroundObjects;

  /**
   * The x-coordinate at which the level ends.
   * @type {number}
   */
  level_end_x = 2200;

  /**
   * Create a new Level with provided elements.
   * @param {MoveableObject[]} enemies - An array of enemy objects.
   * @param {Cloud[]} clouds - An array of cloud objects.
   * @param {DrawableObject[]} backgroundObjects - An array of background objects.
   */
  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies; // Initialize enemies array.
    this.clouds = clouds; // Initialize clouds array.
    this.backgroundObjects = backgroundObjects; // Initialize background objects array.
  }
}
