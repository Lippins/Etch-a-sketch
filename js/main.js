const container = document.querySelector(".container");
let boxes;
let userChoice;
let currentColor;
let inEraseMode = false;

function createBoxes(num) {
  let boxWidth = 450 / num;
  for (i = 0; i < num; i++) {
    for (j = 0; j < num; j++) {
      box = document.createElement("div");
      box.style.width = `${boxWidth}px`;
      box.style.height = `${boxWidth}px`;
      container.appendChild(box);
      boxes = document.querySelectorAll(".container div");
    }
  }
}

function defaultSketch(color = "black") {
  currentColor = color;
  boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      box.style.backgroundColor = color;
    });
  });
}

function pickColor() {
  let selectColor = document.getElementById("pickColor");
  selectColor.addEventListener("click", () => {
    let userColorChoice = prompt("kindly Enter A Color Choice Or Hex Value");
    userColorChoice = userColorChoice.toLowerCase();
    defaultSketch(userColorChoice);
    currentColor = userColorChoice;
  });
}

function clearPad() {
  boxes.forEach((box) => {
    box.style.backgroundColor = "";
    box.style.opacity = "";
  });
}

function reset() {
  const resetPad = document.getElementById("reset");
  resetPad.addEventListener("click", clearPad);
}

function redrawSketchPad() {
  const redrawPad = document.getElementById("redraw");
  redrawPad.addEventListener("click", () => {
    userChoice = parseInt(
      prompt("How many squares per side do you want to draw?")
    );
    if (userChoice < 2 || userChoice > 100) {
      alert("Kindly enter a number between 2 and 100");
    } else {
      clearPad();
      container.innerHTML = "";
      createBoxes(userChoice);
      defaultSketch();
    }
  });
}

function generateRandomColor() {
  let redValue = Math.floor(Math.random() * 255 + 1);
  let greenValue = Math.floor(Math.random() * 255 + 1);
  let blueValue = Math.floor(Math.random() * 255 + 1);
  let generatedColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
  currentColor = generatedColor;

  return generatedColor;
}

function randomColorSketcher() {
  boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      box.style.backgroundColor = generateRandomColor();
    });
  });
}

function useRandomColorSketcher() {
  const randomColorPad = document.getElementById("random");
  randomColorPad.addEventListener("click", randomColorSketcher);
}

function erase() {
  boxes.forEach((box) => {
    box.removeEventListener("mouseenter", setOpacity);
  });

  boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      if (inEraseMode) {
        box.style.backgroundColor = "";
        box.style.opacity = "";
      }
    });
  });
}

function erasePad() {
  const eraser = document.getElementById("eraser");
  eraser.addEventListener("click", () => {
    inEraseMode = true;
    erase();
  });
}

function addOpacity() {
  const opacityButton = document.querySelector("#shader");
  opacityButton.addEventListener("click", () => {
    inEraseMode = false;
    boxes.forEach((box) => {
      box.addEventListener("mouseenter", setOpacity);
    });
  });
}

function setOpacity(e) {
  currentBox = e.target;
  currentBox.style.backgroundColor = currentColor;
  if (!currentBox.style.opacity) {
    currentBox.style.opacity = 0.1;
  } else if (+currentBox.style.opacity < 1) {
    currentBox.style.opacity = +currentBox.style.opacity + 0.1;
  }
}

function playEtchASketch() {
  createBoxes(16);

  defaultSketch();

  pickColor();

  reset();

  redrawSketchPad();

  useRandomColorSketcher();

  addOpacity();

  erasePad();
}

playEtchASketch();
