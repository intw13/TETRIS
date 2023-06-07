// 10 x 20(22) 배열 생성
for (let row = -2; row < 20; row++) {
  playfield[row] = [];
  for (let col = 0; col < 10; col++) {
    playfield[row][col] = 0;
  }
}

function loop() {
  rAF = requestAnimationFrame(loop);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 보드 초기화

  // 10 x 20 보드 생성
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      if (playfield[row][col]) {
        const name = playfield[row][col];
        ctx.fillStyle = colors[name]; // 배열 값(J,I,O,..)의 색

        // 블록 그리기
        ctx.fillRect(col * grid, row * grid, grid - 1, grid - 1);
      }
    }
  }

  // 테트리스 블록이 있을경우
  if (tetromino) {
    // 속도에 따라 블록 내려옴
    if (++count > speed) {
      tetromino.row++;
      count = 0;

      countScore++;

      if (countScore % 1 === 0) {
        let currentScore = parseInt(score.textContent);
        score.textContent = currentScore + 1;
      }

      if (!isVaildMove(tetromino.matrix, tetromino.row, tetromino.col)) {
        // 블록이 움직이지 않을경우
        tetromino.row--; // 한칸 위로 올리기
        placeTetromino(); // 다시 생성
        let currentScore = parseInt(score.textContent);
        score.textContent = currentScore + 5;
      }
    }
    ctx.fillStyle = colors[tetromino.name];

    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {
          ctx.fillRect(
            (tetromino.col + col) * grid,
            (tetromino.row + row) * grid,
            grid - 1,
            grid - 1
          );
        }
      }
    }
  }
}

function showGameOver() {
  cancelAnimationFrame(rAF);
  gameOver = true;

  ctx.fillStyle = 'black';
  ctx.globalAlpha = 0.75;
  ctx.fillRect(0, canvas.height / 2 - 100, canvas.width, 120);

  ctx.globalAlpha = 1;
  ctx.fillStyle = 'white';
  ctx.font = '36px DungGeunMo';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);

  setTimeout(() => {
    const playerName = prompt('이름을 입력하세요.');

    if (playerName === null) {
      return;
    }

    const playerScore = score.textContent;

    const previousData = JSON.parse(localStorage.getItem('playerData')) || [];

    // 새로운 데이터 생성
    const newData = {
      name: playerName,
      score: playerScore,
    };

    // 이전 데이터와 새로운 데이터를 합쳐서 새로운 배열 생성
    const updatedData = [...previousData, newData];

    // localStorage에 저장
    localStorage.setItem('playerData', JSON.stringify(updatedData));
  }, 500);

  // 리스타트
  function restart() {
    location.reload();
  }
  const btn = document.getElementById('btn');
  btn.onclick = restart;
  btn.innerText = 'RESTART';
}

const previousData = JSON.parse(localStorage.getItem('playerData')) || [];

if (previousData.length > 0) {
  // 데이터 있으면 왼쪽에 표시
  const highscore = document.querySelector('.highscore');
  const rank = document.querySelector('.rank');
  highscore.style.display = 'block';

  // 점수에 따라 내림차순으로 정렬
  const sortedData = previousData.sort((a, b) => b.score - a.score);
  // 상위 10개만 표시
  const displayData = sortedData.slice(0, 10);

  // 랭크 기록 삽입
  rank.innerHTML = displayData
    .map(score => `<li>${score.name} - ${score.score}`)
    .join('');
}
