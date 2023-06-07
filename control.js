document.addEventListener('keydown', function (event) {
  if (gameOver) {
    return;
  }

  // 왼쪽 오른쪽
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const col =
      event.key === 'ArrowLeft' ? tetromino.col - 1 : tetromino.col + 1;

    if (isVaildMove(tetromino.matrix, tetromino.row, col)) {
      tetromino.col = col;
    }
  }
  // 아래
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    const row = tetromino.row + 1;

    if (!isVaildMove(tetromino.matrix, row, tetromino.col)) {
      tetromino.row = row - 1;

      placeTetromino(); // 생성
      let currentScore = parseInt(score.textContent);
      score.textContent = currentScore + 5;
      return;
    }
    tetromino.row = row;
  }
  // 위 (rotate)
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    const matrix = rotate(tetromino.matrix);
    if (isVaildMove(matrix, tetromino.row, tetromino.col)) {
      tetromino.matrix = matrix;
    }
  }
  // Space( hard drop )
  if (event.keyCode === 32) {
    event.preventDefault();

    let row = tetromino.row;
    while (isVaildMove(tetromino.matrix, row + 1, tetromino.col)) {
      row++;
    }

    tetromino.row = row;
    placeTetromino();
    let currentScore = parseInt(score.textContent);
    score.textContent = currentScore + 5;
  }
});

function rotate(matrix) {
  const n = matrix.length - 1;
  const result = matrix.map((row, i) => row.map((val, j) => matrix[n - j][i]));
  return result;
}

function play() {
  drawNext();
  loop();
}
