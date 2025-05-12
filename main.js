const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");
const fontPicker = document.getElementById("fontPicker");

const ctx = canvas.getContext('2d');
ctx.lineWidth = 3;

let isDrawing = false;
let lastX, lastY;

colorPicker.addEventListener('change',(e)=>{
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown',(e)=>{
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove',(e)=>{
  if(isDrawing){
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener('mouseup',()=>{
  isDrawing = false;
});

canvas.addEventListener('touchstart',(e)=>{
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  lastX = (e.touches[0].clientX - rect.left) * scaleX;
  lastY = (e.touches[0].clientY - rect.top) * scaleY;
  e.preventDefault();
  document.body.style.overflow = 'hidden';
});

canvas.addEventListener('touchmove',(e)=>{
  if(isDrawing){
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo((e.touches[0].clientX - rect.left) * scaleX, (e.touches[0].clientY - rect.top) * scaleY);
    ctx.stroke();

    lastX = (e.touches[0].clientX - rect.left) * scaleX;
    lastY = (e.touches[0].clientY - rect.top) * scaleY;
  }
  e.preventDefault();
});

canvas.addEventListener('touchend',()=>{
  isDrawing = false;
  document.body.style.overflow = 'auto';
});

canvasColor.addEventListener('change',(e)=>{
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0,0,800,500);
});

fontPicker.addEventListener('change',(e)=>{
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener('click',()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
});

saveButton.addEventListener('click',()=>{
  localStorage.setItem('canvasContents',canvas.toDataURL());

  let link = document.createElement('a');
  link.download = 'my-signature.png';
  link.href = canvas.toDataURL();
  link.click();
});

retrieveButton.addEventListener('click',()=>{
  let savedContents = localStorage.getItem('canvasContents');

  if(savedContents){
    let img = new Image();
    img.src = savedContents;
    ctx.drawImage(img,0,0);
  }
});
