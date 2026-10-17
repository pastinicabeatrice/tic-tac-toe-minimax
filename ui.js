import { bestMove, emptyBoard, isOver, play, winner } from "./game.js";

const HUMAN = "X";
const COMPUTER = "O";
const MESSAGES = { [HUMAN]: "Ai castigat!", [COMPUTER]: "Calculatorul a castigat", draw: "Remiza" };

const boardElement = document.querySelector("#board");
const statusElement = document.querySelector("#status");
const cells = Array.from({ length: 9 }, (_, i) => {
  const cell = document.createElement("button");
  cell.className = "cell";
  cell.addEventListener("click", () => humanMove(i));
  boardElement.append(cell);
  return cell;
});

const scores = { [HUMAN]: 0, [COMPUTER]: 0, draw: 0 };
let board;
let computerStarts = true;

const result = () => winner(board) ?? "draw";

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i] ?? "";
    cell.disabled = Boolean(board[i]) || isOver(board);
  });
  statusElement.textContent = isOver(board) ? MESSAGES[result()] : "Randul tau";
  for (const key in scores) document.querySelector(`#score-${key}`).textContent = scores[key];
}

function move(cell, player) {
  board = play(board, cell, player);
  if (isOver(board)) scores[result()]++;
}

function humanMove(cell) {
  move(cell, HUMAN);
  if (!isOver(board)) move(bestMove(board, COMPUTER), COMPUTER);
  render();
}

function newGame() {
  board = emptyBoard();
  computerStarts = !computerStarts;
  if (computerStarts) move(bestMove(board, COMPUTER), COMPUTER);
  render();
}

document.querySelector("#new-game").addEventListener("click", newGame);
newGame();
