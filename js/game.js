// Declare global variables for canvas, world, and keyboard input.
let canvas;
let world;
let isPressed = false;
let keyboard = new Keyboard();

// Function to initialize the game.
const init = () => {
  // Hide the start container screen and power button.
  const powerBtn = document.querySelector("#controller");
  const startContainerScreen = document.querySelector(
    "#start-container-screen"
  );
  startContainerScreen.style.display = "none";
  powerBtn.style.display = "none";

  // Get the canvas element and create the game world.
  canvas = document.querySelector("#canvas");
  world = new World(canvas, keyboard);
};

// Event listener for keydown events to handle keyboard input.
window.addEventListener("keydown", (e) => {
  // Detect key presses and update the keyboard object.
  if (e.keyCode === 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode === 38) {
    keyboard.UP = true;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode === 68) {
    keyboard.D = true;
  }
});

// Event listener for keyup events to handle keyboard input.
window.addEventListener("keyup", (e) => {
  // Detect key releases and update the keyboard object.
  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode === 38) {
    keyboard.UP = false;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode === 68) {
    keyboard.D = false;
  }
});

// Event listeners for touch events on mobile devices.
document.getElementById("left").addEventListener("touchstart", (ev) => {
  // Handle touchstart events for left button.
  keyboard.LEFT = true;
  ev.preventDefault(); // Prevent default touch behavior.
});

document.getElementById("right").addEventListener("touchstart", (ev) => {
  // Handle touchstart events for right button.
  keyboard.RIGHT = true;
  ev.preventDefault(); // Prevent default touch behavior.
});

document.getElementById("jump").addEventListener("touchstart", (ev) => {
  // Handle touchstart events for jump button.
  keyboard.SPACE = true;
  ev.preventDefault(); // Prevent default touch behavior.
});

document.getElementById("throw").addEventListener("touchstart", (ev) => {
  // Handle touchstart events for throw button.
  keyboard.D = true;
  ev.preventDefault(); // Prevent default touch behavior.
});

document.getElementById("left").addEventListener("touchend", (ev) => {
  // Handle touchend events for left button.
  keyboard.LEFT = false;
  ev.preventDefault(); // Prevent default touch behavior.
});

document.getElementById("right").addEventListener("touchend", (ev) => {
  // Handle touchend events for right button.
  keyboard.RIGHT = false;
  ev.preventDefault(); // Prevent default touch behavior.
});

document.getElementById("jump").addEventListener("touchend", (ev) => {
  // Handle touchend events for jump button.
  keyboard.SPACE = false;
  ev.preventDefault(); // Prevent default touch behavior.
});

document.getElementById("throw").addEventListener("touchend", (ev) => {
  // Handle touchend events for throw button.
  keyboard.D = false;
  ev.preventDefault(); // Prevent default touch behavior.
});
