import assert from "node:assert/strict";
import { test } from "node:test";
import { bestMove, emptyBoard, freeCells, isOver, other, play, winner } from "../game.js";

const parse = (rows) => [...rows.join("")].map((c) => (c === "." ? null : c));

test("detecteaza castigatorul pe linii, coloane si diagonale", () => {
  assert.equal(winner(parse(["XXX", "OO.", "..."])), "X");
  assert.equal(winner(parse(["O.X", "O.X", "O.."])), "O");
  assert.equal(winner(parse(["X.O", ".XO", "..X"])), "X");
  assert.equal(winner(parse(["XO.", "...", "..."])), null);
});

test("jocul se termina la castig sau tabla plina", () => {
  assert.equal(isOver(emptyBoard()), false);
  assert.equal(isOver(parse(["XOX", "XOO", "OXX"])), true);
});

test("mutarile nu modifica tabla initiala", () => {
  const board = emptyBoard();
  assert.equal(play(board, 4, "X")[4], "X");
  assert.equal(board[4], null);
  assert.equal(freeCells(play(board, 4, "X")).length, 8);
  assert.equal(other("X"), "O");
});

test("calculatorul castiga cand poate", () => {
  assert.equal(bestMove(parse(["OO.", "XX.", "X.."]), "O"), 2);
});

test("calculatorul blocheaza castigul adversarului", () => {
  assert.equal(bestMove(parse(["XX.", "O..", "..."]), "O"), 2);
});

test("doi jucatori perfecti termina la egalitate", () => {
  let board = emptyBoard();
  let player = "X";
  while (!isOver(board)) {
    board = play(board, bestMove(board, player), player);
    player = other(player);
  }
  assert.equal(winner(board), null);
});
