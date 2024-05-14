import { style } from "./style.css";
import icon from "./assets/images/chess-knight.svg";
import { findShortestPath, result } from "./logic";

function createGameboard() {
  const gameboard = document.querySelector(".gameboard");
  for (let i = 0; i < 8; i++) {
    let xSquare = document.createElement("div");
    xSquare.classList.add("outernode");
    gameboard.appendChild(xSquare);
    for (let j = 0; j < 8; j++) {
      let ySquare = document.createElement("div");
      ySquare.classList.add("innernode");
      xSquare.appendChild(ySquare);
    }
  }
}

createGameboard();

const container = document.querySelector(".container");
const gameboard = document.querySelector(".gameboard");

const chessPiece = new Image();
chessPiece.src = icon;
chessPiece.classList.add("piece");

container.appendChild(gameboard);
gameboard.appendChild(chessPiece);

function moveKnight(x, y) {
  const targetNode = document.querySelector(
    `.outernode:nth-child(${x + 1}) .innernode:nth-child(${y + 1})`
  );
  const targetRect = targetNode.getBoundingClientRect();
  const pieceRect = chessPiece.getBoundingClientRect();

  const moveX = targetRect.left - pieceRect.left;
  const moveY = targetRect.top - pieceRect.top;

  chessPiece.style.setProperty("--move-x", `${moveX}px`);
  chessPiece.style.setProperty("--move-y", `${moveY}px`);

  chessPiece.classList.add("moving");

  chessPiece.addEventListener(
    "animationend",
    () => {
      targetNode.appendChild(chessPiece);
      chessPiece.classList.remove("moving");
      chessPiece.style.removeProperty("--move-x");
      chessPiece.style.removeProperty("--move-y");
    },
    { once: true }
  );
}

let startPosition = [0, 0];
function getUserSubmit(event) {
  event.preventDefault();
  const userX = document.querySelector(".horizontal").value;
  const userY = document.querySelector(".vertical").value;
  const errorMessage = document.querySelector(".error");

  if (isNaN(userX) || isNaN(userY)) {
    errorMessage.textContent = "Please Input 2 Single Digit Numbers";
    errorMessage.style.display = "block";
  } else if (userX < 0 || userX > 7 || userY < 0 || userY > 7) {
    errorMessage.textContent =
      "Numbers must be between 0-7 to match position on chess board.";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    const endGoal = [parseInt(userX), parseInt(userY)];
    const result = findShortestPath(startPosition, endGoal);
    for (let i = 0; i < result.path.length; i++) {
      let currentXPathd = result.path[i][0];
      let currentYPathd = result.path[i][1];
      setTimeout(() => {
        moveKnight(currentXPathd, currentYPathd);
      }, 2000 * i);
      startPosition = endGoal;
    }
    result.path = [];
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", getUserSubmit);

function outputResult() {
  if (result) {
    console.log("Minimum moves:", result.moveCount);
    console.log("Path:", result.path);
    const moveQueue = result.path;
    console.log(moveQueue);
  } else {
    console.log("No path found.");
  }
}
