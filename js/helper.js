/**
 * Select and return various HTML elements from the document.
 * These elements are used in the game's user interface and layout.
 * @returns {HTMLElement[]} An array of selected HTML elements.
 */
const selectedElements = () => {
  // Select various HTML elements by their class or ID attributes.
  // These elements are used for game controls, instructions, and layout.
  const infoBoxContainer = document.querySelector(".info-box-container");
  const containerController = document.querySelector("#container-controller");
  const gameInstructionContainer = document.querySelector(
    ".game-instruction-container"
  );
  const mobileControllers = document.querySelector("#mobile-controllers");
  const rotate = document.querySelector(".resize");
  const mainHeader = document.querySelector("#main-header");
  const changeOrientation = document.querySelector("#change-orientation");
  const mainContainer = document.querySelector("#main-container");

  // Return an array containing the selected HTML elements.
  return [
    infoBoxContainer,
    containerController,
    gameInstructionContainer,
    mobileControllers,
    rotate,
    mainHeader,
    changeOrientation,
    mainContainer,
  ];
};
