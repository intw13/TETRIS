const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const grid = 30; // 블록 크기

// 캔버스 크기
ctx.canvas.width = 10 * grid;
ctx.canvas.height = 20 * grid;

const playfield = []; // 게임 보드

const tetrominoSequence = []; // 블록 저장
const nextSequence = []; // 블록 저장

const score = document.getElementById('score');
const level = document.getElementById('level');

let count = 0;
let rAF = null;
let gameOver = false;
let linesCleared = 0;
let countScore = 0;
let speed = 40;

let point = 100;

const nextCanvas = document.getElementById('next');
const nextCtx = nextCanvas.getContext('2d');
