/**
 * Selects elements from the HTML document.
 * @returns {HTMLElement[]} An array of selected HTML elements.
 */
const [
  infoBoxContainer,
  containerController,
  gameInstructionContainer,
  mobileControllers,
  rotate,
  mainHeader,
  changeOrientation,
  mainContainer,
] = selectedElements();

/**
 * Images for toggling sound on/off.
 * @type {string[]}
 */
const images = ["./img/volume-down.png", "./img/volume-up.png"];

/**
 * Initializes audio and variables.
 */
let audioSound = new Audio("./audio/westernsound.mp3");
audioSound.volume = 0.005;
let currentImageIndex = 0;
let endGame = false;

/**
 * Displays the information box.
 */
const infoBox = () => {
  infoBoxContainer.style.display = "flex";
  containerController.style.display = "none";
};

/**
 * Closes information or game instruction boxes.
 * @param {string} text - The text indicating which box to close ("infoBoxContainer" or other).
 */
const closeInfoBox = (text) => {
  if (text == "infoBoxContainer") {
    infoBoxContainer.style.display = "none";
  } else {
    gameInstructionContainer.style.display = "none";
  }
  containerController.style.display = "flex";
};

/**
 * Displays game instructions.
 */
const gameInstruction = () => {
  gameInstructionContainer.style.display = "flex";
  containerController.style.display = "none";
};

/**
 * Toggles sound on/off.
 */
const toggleSound = () => {
  playAudio();
  const imageElement = document.querySelector("#image-element");
  currentImageIndex = (currentImageIndex + 1) % images.length;
  const newImageSrc = images[currentImageIndex];
  imageElement.src = newImageSrc;
  imageElement.alt = `Image ${currentImageIndex + 1}`;
};

/**
 * Plays or pauses audio.
 */
const playAudio = () => {
  if (audioSound.paused) {
    audioSound.loop = true;
    audioSound.play();
  } else {
    audioSound.pause();
  }
};

/**
 * Toggles full-screen mode.
 */
const toggleFullScreen = () => {
  const fullScreenElement = document.documentElement;

  if (
    !document.fullscreenElement && // Standard
    !document.mozFullScreenElement && // Firefox
    !document.webkitFullscreenElement && // Chrome, Safari, Opera
    !document.msFullscreenElement
  ) {
    // IE/Edge
    enterFullScreen(fullScreenElement);
  } else {
    exitFullScreen();
  }
};

/**
 * Enters full-screen mode for a specified HTML element.
 * @param {HTMLElement} fullScreenElement - The HTML element to enter full-screen mode for.
 */
const enterFullScreen = (fullScreenElement) => {
  // Check if the browser supports standard full-screen mode.
  if (fullScreenElement.requestFullscreen) {
    fullScreenElement.requestFullscreen(); // Request full-screen mode.
  }
  // Check if the browser supports Mozilla Firefox-specific full-screen mode.
  else if (fullScreenElement.mozRequestFullScreen) {
    fullScreenElement.mozRequestFullScreen(); // Request full-screen mode in Firefox.
  }
  // Check if the browser supports Google Chrome, Safari, and Opera-specific full-screen mode.
  else if (fullScreenElement.webkitRequestFullscreen) {
    fullScreenElement.webkitRequestFullscreen(); // Request full-screen mode in Chrome, Safari, and Opera.
  }
  // Check if the browser supports Microsoft-specific full-screen mode.
  else if (fullScreenElement.msRequestFullscreen) {
    fullScreenElement.msRequestFullscreen(); // Request full-screen mode in Microsoft Edge and IE.
  }
};

/**
 * Exits full-screen mode.
 */
const exitFullScreen = () => {
  // Check if the browser supports standard full-screen exit.
  if (document.exitFullscreen) {
    document.exitFullscreen(); // Exit full-screen mode.
  }
  // Check if the browser supports Mozilla Firefox-specific full-screen exit.
  else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen(); // Exit full-screen mode in Firefox.
  }
  // Check if the browser supports Google Chrome, Safari, and Opera-specific full-screen exit.
  else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen(); // Exit full-screen mode in Chrome, Safari, and Opera.
  }
  // Check if the browser supports Microsoft-specific full-screen exit.
  else if (document.msExitFullscreen) {
    document.msExitFullscreen(); // Exit full-screen mode in Microsoft Edge and IE.
  }
};

/**
 * Alternative (quick and dirty) method to clear all intervals.
 */
const clearAllIntervals = () => {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
};

/**
 * Shows the end screen (game over or victory).
 * @param {string} txt - The text indicating the game outcome ("Enemy" or other).
 */
const showEndScreen = (txt) => {
  if (!endGame) {
    displayControllers();
    setEndImg(txt);
    const endContainer = document.querySelector("#end-container");
    endContainer.style.display = "flex";
    setReloadListener();
    endGame = true;
    stopAudio();
  }
};

/**
 * Stops the Audio if it is playing.
 */
const stopAudio = () => {
  if (!audioSound.paused) {
    playAudio();
  }
};

/**
 * Hides controllers.
 */
const displayControllers = () => {
  containerController.style.display = "none";
  mobileControllers.style.display = "none";
};

/**
 * Sets a listener for reloading the page.
 */
const setReloadListener = () => {
  const reloadContainer = document.querySelector("#reload-container");
  reloadContainer.addEventListener("click", () => {
    location.reload();
  });
};

/**
 * Sets the end screen image based on the game outcome.
 * @param {string} txt - The text indicating the game outcome ("Enemy" or other).
 */
const setEndImg = (txt) => {
  const endImg = document.querySelector("#game-over-img");
  if (txt === "Enemy") {
    endImg.src = "img/9_intro_outro_screens/game_over/you lost.png";
  } else {
    endImg.src = "img/9_intro_outro_screens/game_over/game over.png";
  }
};

/**
 * Handles window resize events.
 */
const handleResize = () => {
  if (window.innerWidth < 930) {
    mobileControllers.style.display = "flex";
    rotate.style.fontSize = "40%";
    mainHeader.style.display = "none";
    handleOrientationChange();
  } else {
    mobileControllers.style.display = "none";
    rotate.style.fontSize = "62.5%";
    mainHeader.style.display = "block";
    handleOrientationChange();
  }
};

/**
 * Handles orientation change events.
 */
const handleOrientationChange = () => {
  if (window.matchMedia("(orientation: portrait)").matches) {
    // Portrait mode
    changeOrientation.style.display = "flex";
  } else {
    // Landscape mode
    changeOrientation.style.display = "none";
  }
};

// Call the initial resize handling function
handleResize();

// Add event listeners for window resize and orientation change
window.addEventListener("resize", handleResize);
