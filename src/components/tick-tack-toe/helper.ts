function findWinner(
  squares: Array<"X" | "O" | null>
): { player: "X" | "O" | null; win: Array<number> } | null {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
      return { player: squares[a], win: winConditions[i] };
  }
  return null;
}

function isDraw(square: Array<"X" | "O" | null>): boolean {
  for (let i = 0; i < 9; i++) {
    if (square[i] === null) {
      return false;
    }
  }
  return true;
}

function checkWinner(
  board: Array<"X" | "O" | null>
): { player: "X" | "O" | null; win: Array<number> } | "draw" | null {
  const winner = findWinner(board);
  const draw = isDraw(board);
  if (winner !== null) return winner;
  else if (draw) return "draw";
  else return null;
}

function random(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MMax(
  board: Array<"X" | "O" | null>,
  depth: number,
  is_max: boolean,
  ai: "X" | "O",
  hn: "X" | "O",
  alpha = -Infinity,
  beta = Infinity
) {
  let winner = checkWinner(board);

  const scoresX = {
    X: 10,
    O: -10,
    d: 0,
  };

  const scoresO = {
    X: -10,
    O: 10,
    d: 0,
  };

  if (winner && winner !== "draw") {
    return ai === "X"
      ? scoresX[winner.player as "X" | "O" | "d"]
      : scoresO[winner.player as "X" | "O" | "d"];
  }

  if (is_max) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = ai; //.
        let score =
          MMax(board, depth + 1, false, ai, hn, alpha, beta) + random(-5, 5);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, score);
        if (beta >= alpha) return 0;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = hn; //.
        let score =
          MMax(board, depth + 1, true, ai, hn, alpha, beta) + random(-5, 5);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
        alpha = Math.min(beta, score);
        if (alpha >= beta) return 1;
      }
    }
    return bestScore;
  }
}

function AImove(
  square: Array<"X" | "O" | null>,
  Turn: "X" | "O",
  HN: "X" | "O"
) {
  let board = square.slice();
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = Turn;
      let score = MMax(board, 0, false, Turn, HN);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

export { checkWinner, AImove };
