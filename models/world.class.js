/**
 * Represents the game world that manages game objects and interactions.
 */
class World {
  /**
   * Canvas rendering context.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * HTML canvas element.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * Keyboard input handling.
   * @type {KeyboardInputHandler}
   */
  keyboard;

  /**
   * Animation frame ID.
   * @type {number}
   */
  animationId;

  /**
   * Camera position.
   * @type {number}
   */
  camera_x = 0;

  /**
   * Flag to track if the character is dead.
   * @type {boolean}
   */
  isDead = false;

  /**
   * Current game level (e.g., level1).
   * @type {Level}
   */
  level = level1;

  /**
   * Flag to track if audio has been played.
   * @type {boolean}
   */
  audioPlayed = true;

  /**
   * Array to store throwable objects (e.g., bottles).
   * @type {ThrowableObject[]}
   */
  throwableObjects = [];

  /**
   * Flag to track if the boss animations have started.
   * @type {boolean}
   */
  bossIsStarted = false;

  /**
   * Flag to show the boss status.
   * @type {boolean}
   */
  showBossStatus = false;

  /**
   * Instance of the Bottle class.
   * @type {Bottle}
   */
  bottles = new Bottle();

  /**
   * Instance of the Character class.
   * @type {Character}
   */
  character = new Character();

  /**
   * Instance of the LifeStatusBar class.
   * @type {LifeStatusBar}
   */
  statusBar = new LifeStatusBar();

  /**
   * Instance of the BossStatusBar class.
   * @type {BossStatusBar}
   */
  bossStatusBar = new BossStatusBar();

  /**
   * Instance of the CoinStatusBar class.
   * @type {CoinStatusBar}
   */
  coinStatusBar = new CoinStatusBar();

  /**
   * Instance of the BottleStatusBar class.
   * @type {BottleStatusBar}
   */
  bottleStatusBar = new BottleStatusBar();

  /**
   * Instance of the BossStatusBarSecond class.
   * @type {BossStatusBarSecond}
   */
  bossStatusBarSecond = new BossStatusBarSecond();

  /**
   * Last enemy (boss) in the level.
   * @type {Endboss}
   */
  endBoss = level1.enemies[level1.enemies.length - 1];

  /**
   * Constructs a new World instance.
   * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
   * @param {KeyboardInputHandler} keyboard - The keyboard input handling.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // Get 2D rendering context from the canvas
    this.canvas = canvas; // Store canvas element
    this.keyboard = keyboard; // Store keyboard input handler
    this.startEnemies(); // Start animating enemies
    this.draw(); // Start the game loop
    this.setWorld(); // Set the world reference for the character
    this.run(); // Start game logic and collision checks
    this.audio = new Audio("./audio/win.mp3"); // Load winning audio for the game
    this.audio.volume = 0.025;
    this.win = new Audio("audio/win.mp3");
    this.win.volume = 0.025;
    this.lose = new Audio("audio/lose.mp3");
    this.lose.volume = 0.025;
  }

  /**
   * Start animations for enemies in the level.
   */
  startEnemies() {
    // Start animations for enemies in the level
    this.level.enemies.forEach((enemy) => {
      enemy.animate();
    });
  }

  /**
   * Set the reference to the world for the character.
   */
  setWorld() {
    // Set the reference to the world for the character
    this.character.world = this;
  }

  /**
   * Run game logic and collision checks.
   */
  run() {
    // Run game logic and collision checks

    // Check collisions and other logic every 50 milliseconds
    setInterval(() => {
      this.checkCollisions(); // Check collisions between character and enemies
      this.checkBossIsStarted(); // Check if the boss battle has started
      this.checkCollisionWithBottle(); // Check collisions between bottles and enemies

      if (this.character.energy === 0 && !this.isDead) {
        this.isDead = true;
        this.lose.play();
        this.checkIfGameOver(); // Check if the character has run out of energy (health)
      }
    }, 50);

    // Check for throwable objects (bottles) every 150 milliseconds
    setInterval(() => {
      this.checkThrowObjects(); // Check if throwable objects (bottles) need to be thrown
    }, 150);
  }

  /**
   * Check if the boss battle has started and handle related actions.
   */
  checkBossIsStarted() {
    if (this.character.x >= 2000 && !this.bossIsStarted) {
      this.bossIsStarted = true;
      this.showBossStatus = true; // Display the boss status when the character reaches a certain point

      setTimeout(() => {
        this.endBoss.onStart = false;
        this.endBoss.attack = true;
      }, 1000);

      setTimeout(() => {
        this.endBoss.attack = false;
        this.endBoss.walk = true;
      }, 2000);

      this.level.enemies.forEach((i) => {
        if (i instanceof Endboss && !i.started) {
          i.started = true;
          setInterval(() => {
            if (this.character.isColliding(i)) {
              this.character.hitBoss(); // Handle character's collision with the boss
              this.statusBar.setPercentage(0); // Update the life status bar
            }
          }, 100);
        }
      });
    }
  }

  /**
   * Check if throwable objects (bottles) need to be thrown and handle the throwing action.
   */
  checkThrowObjects() {
    if (
      this.keyboard.D &&
      this.character.bottles > 0 &&
      this.character.startRight
    ) {
      let bottle = this.createNewThrowableInstance(); // Create a new throwable object (bottle)
      this.throwableObjects.push(bottle); // Add the bottle to the throwable objects array
      this.character.count = 0; // Reset count > character is not sleeping if the bottle is thrown
      this.character.bottles -= 1; // Reduce the number of available bottles
      this.bottleStatusBar.percentage = this.character.bottles * 2 * 10; // Update the bottle status bar
      this.bottleStatusBar.showBottleStatus(); // Display bottle status
    }
  }

  /**
   * Create a new throwable object (bottle).
   * @returns {ThrowableObject} The newly created throwable object.
   */
  createNewThrowableInstance() {
    // Create a new throwable object (bottle)
    return new ThrowableObject(this.character.x + 100, this.character.y + 100);
  }

  /**
   * Check collisions between the character and enemies or collectible objects (Coins and Bottles).
   */
  checkCollisions() {
    // Check collisions between character and enemies or collectible objects (Coins and Bottles)
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead) {
        if (this.character.isAboveGround() && !this.character.isHurt()) {
          enemy.isDead = true; // Mark enemy as dead if character collides while above ground
          this.character.jump();
        } else {
          this.character.hit(); // Handle character getting hit
          this.statusBar.setPercentage(this.character.energy); // Update life status bar
        }
      } else if (
        this.character.isColliding(enemy) &&
        (enemy instanceof Coins || enemy instanceof Bottle)
      ) {
        this.setEnemy(enemy); // Handle character collecting Coins or Bottles
      }
    });
  }

  /**
   * Handle character collecting Coins or Bottles and update related game elements.
   * @param {CollectibleObject} enemy - The collectible object being collected by the character.
   */
  setEnemy(enemy) {
    // Handle character collecting Coins or Bottles
    enemy.collect();
    this.setCoinsBottle(enemy); // Update character's Coins or Bottles count
    let newFilteredArr = this.level.enemies.filter((a) => !a.collected);
    this.level.enemies = newFilteredArr; // Remove collected objects from the level
    this.setStatusBars(enemy); // Update status bars based on collected object type
  }

  /**
   * Update character's Coins or Bottles count based on the type of collected object.
   * @param {CollectibleObject} enemy - The collected object (Coin or Bottle).
   */
  setCoinsBottle(enemy) {
    // Update character's Coins or Bottles count
    if (enemy instanceof Coins) {
      this.character.coins += 1; // Increase Coins count
    } else {
      this.character.bottles += 1; // Increase Bottles count
    }
  }

  /**
   * Update status bars based on the type of collected object (Coins or Bottles).
   * @param {CollectibleObject} enemy - The collected object (Coin or Bottle).
   */
  setStatusBars(enemy) {
    // Update status bars based on collected object type (Coins or Bottles)
    if (enemy instanceof Coins) {
      this.coinStatusBar.percentage += 20; // Increase the Coins status bar percentage
      this.coinStatusBar.showCoinsStatus(this.coinStatusBar.percentage); // Display Coins status
    } else {
      this.bottleStatusBar.percentage += 20; // Increase the Bottles status bar percentage
      this.bottleStatusBar.showBottleStatus(this.bottleStatusBar.percentage); // Display Bottles status
    }
  }

  /**
   * Check collisions between thrown bottles and the end boss.
   */
  checkCollisionWithBottle() {
    // Check collisions between thrown bottles and the end boss
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (
          bottle.isColliding(enemy) &&
          enemy instanceof Endboss &&
          !bottle.broken
        ) {
          bottle.broken = true;
          if (!this.endBoss.firstHit) {
            this.animateFirstHit();
          } else if (this.endBoss.secondHit) {
            this.animateSecondHit();
            this.endGame();
          }
        }
      });
    });
    this.ifIsGameOver(); // Check if the game is over
  }

  /**
   * Animate the first hit on the Boss.
   */
  animateFirstHit() {
    this.endBoss.hurtAnimation(); // Play boss hurt animation
    this.bossStatusBar.showBossStatus(); // Display boss status
    this.character.play(); // Play character's animation
  }

  /**
   * Animate the second hit on the Boss and end the game.
   */
  animateSecondHit() {
    this.endBoss.walk = false;
    this.endBoss.hurt = false;
    this.endBoss.endGame = true;
    this.character.play(); // Play character's animation
    this.bossStatusBar.showBossStatus(); // Display boss status
  }

  /**
   * End the game by playing the winning audio and cancelling the game animation frame.
   */
  endGame() {
    setTimeout(() => {
      this.win.play();
      this.cancelGamesAnimationFrame(); // Cancel game animation frame
    }, 300);
  }

  /**
   * Check if the character has lost the game and handle game over conditions.
   */
  ifIsGameOver() {
    // Check if the character has lost the game
    if (this.character.gameOver) {
      clearAllIntervals(); // Clear all game intervals
      showEndScreen("Boss"); // Show the end screen
    }
  }

  /**
   * Cancel the game's animation frame and set the game over flag.
   */
  cancelGamesAnimationFrame() {
    // Cancel the game's animation frame
    setTimeout(() => {
      cancelAnimationFrame(this.animationId);
      this.character.gameOver = true; // Set the game over flag
    }, 500);
  }

  /**
   * Check if the game is over (character has lost).
   */
  checkIfGameOver() {
    // Check if the game is over (character has lost)
    this.character.checkState(); // Check the character's state
    setTimeout(() => {
      cancelAnimationFrame(this.animationId); // Cancel the game's animation frame
      showEndScreen("Enemy"); // Show the "Game Over" screen
    }, 300);
  }

  /**
   * Main game loop to draw objects on the canvas.
   */
  draw() {
    // Main game loop to draw objects on the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // Apply camera (scrolling) transformation

    this.addObjectsToMap(this.level.backgroundObjects); // Draw background objects

    this.ctx.translate(-this.camera_x, 0); // Revert camera transformation

    this.addObjectsToMap(this.level.clouds); // Draw clouds

    this.addToMap(this.statusBar); // Draw the life status bar

    this.addToMap(this.coinStatusBar); // Draw the Coins status bar

    this.addToMap(this.bottleStatusBar); // Draw the Bottles status bar

    if (this.showBossStatus) {
      this.addToMap(this.bossStatusBar); // Draw the boss status bar (if applicable)
      this.addToMap(this.bossStatusBarSecond);
    }

    this.ctx.translate(this.camera_x, 0); // Apply camera (scrolling) transformation

    this.addToMap(this.character); // Draw the character

    this.addObjectsToMap(this.level.enemies); // Draw enemies

    this.addObjectsToMap(this.throwableObjects); // Draw throwable objects (bottles)

    this.ctx.translate(-this.camera_x, 0); // Revert camera transformation

    this.animationId = requestAnimationFrame(() => this.draw()); // Request the next animation frame
  }

  /**
   * Helper function to add multiple objects to the drawing map.
   * @param {Object[]} objects - An array of objects to add to the drawing map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Helper function to add an object to the drawing map.
   * @param {Object} mo - The object to add to the drawing map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo); // Flip the image if required
    }

    mo.draw(this.ctx); // Draw the object on the canvas

    if (mo.otherDirection) {
      this.flipImageBack(mo); // Revert image flipping
    }
  }

  /**
   * Helper function to flip the image horizontally.
   * @param {Object} mo - The object whose image needs to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Helper function to revert image flipping.
   * @param {Object} mo - The object whose image needs to be flipped back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
