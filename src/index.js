import { style } from "./style.css";
import icon from "./assets/images/chess-knight.svg";

function createGameboard() {
  const gameboard = document.querySelector(".gameboard");
  for (let i = 0; i < 8; i++) {
    let xSquare = document.createElement("div");
    xSquare.classList.add("outernode");
    gameboard.appendChild(xSquare);
    for (let j = 0; j < 8; j++) {
      let ySquare = document.createElement("div");
      ySquare.textContent = j;
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
container.appendChild(chessPiece);

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

setTimeout(() => {
  moveKnight(2, 3);
}, 2000);
