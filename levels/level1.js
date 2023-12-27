// Create the first level with specified game objects and backgrounds.
/**
 * Create the first level with specified game objects and backgrounds.
 *
 * @param {GameObject[]} gameObjects - An array of game objects to populate the level.
 * @param {Cloud[]} clouds - An array of cloud objects to display in the background.
 * @param {BackgroundObject[]} backgroundObjects - An array of background objects.
 * @returns {Level} The created level instance.
 */
const level1 = new Level(
  [
    new Chicken(1, 300),
    new Chicken(0.5, 600),
    new Chicken(0.3, 500),
    new Chicken(0.2, 900),
    new Chicken(0.4, 1200),
    new SmallChicken(0.5, 700),
    new SmallChicken(0.1, 600),
    new SmallChicken(0.3, 1900),
    new SmallChicken(0.1, 300),
    new SmallChicken(0.4, 1600),
    new Coins(400, 250),
    new Coins(700, 260),
    new Coins(200, 270),
    new Coins(500, 280),
    new Coins(600, 300),
    new Bottle(100),
    new Bottle(300),
    new Bottle(400),
    new Bottle(500),
    new Bottle(600),
    new Bottle(700),
    new Bottle(700),
    new Endboss(),
  ],

  [new Cloud()],

  [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),
  ]
);
