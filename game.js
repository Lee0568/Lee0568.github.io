// 定义游戏参数
const rows = 50;
const cols = 50;
const cellSize = 10;
let board = [];
let intervalId;

// 初始化游戏板
function initBoard() {
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i][j] = Math.random() < 0.5 ? 0 : 1;
    }
  }
}

// 更新游戏板状态
function updateBoard() {
  let newBoard = [];
  for (let i = 0; i < rows; i++) {
    newBoard[i] = [];
    for (let j = 0; j < cols; j++) {
      let neighbors = countNeighbors(i, j);
      if (board[i][j] === 1) {
        newBoard[i][j] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
      } else {
        newBoard[i][j] = (neighbors === 3) ? 1 : 0;
      }
    }
  }
  board = newBoard;
}

// 计算细胞邻居数量
function countNeighbors(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let nx = x + i;
      let ny = y + j;
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !(i === 0 && j === 0)) {
        count += board[nx][ny];
      }
    }
  }
  return count;
}

// 绘制游戏板
function drawBoard() {
  const boardContainer = document.getElementById('board');
  boardContainer.innerHTML = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.className = board[i][j] ? 'alive' : 'dead';
      cell.style.width = cell.style.height = cellSize + 'px';
      boardContainer.appendChild(cell);
    }
  }
}

// 启动游戏
function startGame() {
  intervalId = setInterval(() => {
    updateBoard();
    drawBoard();
  }, 100);
}

// 停止游戏
function stopGame() {
  clearInterval(intervalId);
}

// 重置游戏
function resetGame() {
  initBoard();
  drawBoard();
}

// 初始化游戏
initBoard();
drawBoard();

// 绑定按钮事件
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);
document.getElementById('reset').addEventListener('click', resetGame);
