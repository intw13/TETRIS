const tetrominos = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

const colors = {
  I: 'cyan',
  O: 'yellow',
  T: 'purple',
  S: 'green',
  Z: 'red',
  J: 'blue',
  L: 'orange',
};

function generateSequence() {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

  while (sequence.length) {
    const rand = Math.floor(Math.random() * sequence.length);
    const name = sequence.splice(rand, 1)[0];
    tetrominoSequence.push(name);
  }
}

function getNextTetromino() {
  if (tetrominoSequence.length === 0) {
    generateSequence();
  }

  const name = tetrominoSequence.pop();
  const matrix = tetrominos[name];

  const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

  const row = name === 'I' ? -1 : -2;

  return {
    name: name, // 랜덤으로 생성된 문자중 뒤에 하나
    matrix: matrix, // 블록의 이름
    col: col, // 배열의 중간
    row: row, // 블록 이름이 I면 -1 아니면 -2
  };
}

function isVaildMove(matrix, cellRow, cellCol) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (
        matrix[row][col] &&
        (cellCol + col < 0 ||
          cellCol + col >= playfield[0].length || // 가로 범위 벗어날경우
          cellRow + row >= playfield.length || // 세로 범위 벗어날경우
          playfield[cellRow + row][cellCol + col]) // 조각끼리 충돌할경우
      ) {
        return false;
      }
    }
  }
  return true;
}

function placeTetromino() {
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col]) {
        if (tetromino.row + row < 0) {
          // 블록 범위가 0 을 넘을경우 게임 오버
          return showGameOver();
        }

        playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
        // 블록 지정된 위치에 배열 값(블록 이름) 넣기
      }
    }
  }
  for (let row = playfield.length - 1; row >= 0; ) {
    if (playfield[row].every(cell => !!cell)) {
      // 현재 행이 모두 채워져 있는지 확인
      for (let r = row; r >= 0; r--) {
        // 현재 행부터 위쪽으로 모든 행에 대해서 반복
        for (let c = 0; c < playfield[r].length; c++) {
          playfield[r][c] = playfield[r - 1][c];
          // 현재 행의 각 열을 위쪽 행의 값으로 복사
        }
      }
      linesCleared++; // 줄이 지워질 때마다 linesCleared 값을 1씩 증가시킴

      if (linesCleared) {
        let currentScore = parseInt(score.textContent);
        score.textContent = currentScore + 100;
      }
      if (linesCleared % 5 === 0) {
        // 5번 지워질 때마다 level.textContent 값을 1씩 증가시킴
        let currentLevel = parseInt(level.textContent);
        level.textContent = currentLevel + 1;

        speed -= 5; // 속도 5씩 증가
        if (speed <= 10) {
          speed = 10; // 10 이하로 안떨어지게
        }
      }
    } else {
      row--; // 줄 지우기
    }
  }
  tetromino = getNextTetromino();
  drawNext();
}
let tetromino = getNextTetromino();

function drawNext() {
  nextCtx.clearRect(0, 0, nextCtx.canvas.width, nextCtx.canvas.height);

  if (tetrominoSequence.length === 0) {
    generateSequence();
  }

  const nextTetromino = tetrominoSequence[tetrominoSequence.length - 1];
  const nextMatrix = tetrominos[nextTetromino];

  for (let row = 0; row < nextMatrix.length; row++) {
    for (let col = 0; col < nextMatrix[row].length; col++) {
      if (nextMatrix[row][col]) {
        const x = col * grid;
        const y = row * grid;

        nextCtx.fillStyle = colors[nextTetromino];
        nextCtx.fillRect(x, y, grid - 1, grid - 1);
      }
    }
  }
}
