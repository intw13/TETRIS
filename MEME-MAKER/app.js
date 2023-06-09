const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'))
const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraserBtn = document.getElementById('eraser-btn');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.color = color.value;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(e){
    if(isPainting){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(e.offsetX,e.offsetY);
}
function onMouseDown(){
    isPainting = true;
}
function onMouseUp(){
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(e){
    ctx.lineWidth = e.target.value
}
function onColorChange(e){
    ctx.strokeStyle = e.target.value
    ctx.fillStyle = e.target.value
}
function onColorClick(e){
    const colorValue =e.target.dataset.color;
    ctx.strokeStyle = colorValue
    ctx.fillStyle = colorValue
}
function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw"
    }
}
function onCanvasClick(){
    if(isFilling){
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    }
}
function onDestroyClick() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}
function onEraserClick() {
 ctx.strokeStyle = 'white'
 isFilling = false;
 modeBtn.innerText = 'Fill'
}
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('click', onCanvasClick)
lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach( color => color.addEventListener('click',onColorClick));

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click',onDestroyClick);
eraserBtn.addEventListener('click',onEraserClick);