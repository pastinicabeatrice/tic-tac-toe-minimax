const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export const emptyBoard = () => Array(9).fill(null);

export const other = (player) => (player === "X" ? "O" : "X");

export const play = (board, cell, player) => board.map((value, i) => (i === cell ? player : value));

export const freeCells = (board) => board.flatMap((value, i) => (value ? [] : [i]));

export function winner(board) {
  const line = LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  return line ? board[line[0]] : null;
}

export const isOver = (board) => Boolean(winner(board)) || freeCells(board).length === 0;

function minimax(board, player, turn, depth) {
  const win = winner(board);
  if (win) return win === player ? 10 - depth : depth - 10;
  const cells = freeCells(board);
  if (cells.length === 0) return 0;
  const scores = cells.map((cell) => minimax(play(board, cell, turn), player, other(turn), depth + 1));
  return turn === player ? Math.max(...scores) : Math.min(...scores);
}

export function bestMove(board, player) {
  let best = { cell: -1, score: -Infinity };
  for (const cell of freeCells(board)) {
    const score = minimax(play(board, cell, player), player, other(player), 1);
    if (score > best.score) best = { cell, score };
  }
  return best.cell;
}
