"use strict";
var gElCanvas;
var gCtx;
var gIsDragable = false;
var gIsTextClicked;
var gOnDownPos;
var gisFirst = true;

function initMemes(id) {
  gElCanvas = document.getElementById("meme-canvas");
  gCtx = gElCanvas.getContext("2d");
  createMeme();
  setImg(id);
  setTextPos(0, gElCanvas.width / 2, gElCanvas.height / 4);
  renderMeme(gElCanvas, gCtx);
  addListiners();
}

function renderMeme(elCanvas, ctx) {
  var meme = getMeme();
  var imgUrl = gImgs[meme.selectedImgId].url;
  var img = new Image();
  img.src = imgUrl;
  ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
  darwLines(ctx);
}

function darwLines(ctx) {
  var meme = getMeme();
  meme.lines.forEach((line) => {
    ctx.font = line.size + "px Impact";
    ctx.fillStyle = line.color;
    ctx.textAlign = line.align;
    ctx.fillText(line.txt, line.pos.x, line.pos.y);
    // drawFrame(ctx, line);
  });
}

// function drawFrame(ctx, line) {
//   var metrics = getTextWidth(ctx, line);
//   var width = metrics.width;
//   ctx.rect(
//     line.pos.x - width / 2 - 100,
//     line.pos.y - line.size,
//     300,
//     line.size
//   );
//   ctx.strokeStyle = "white";
//   ctx.stroke();
// }

function onLineChange(val) {
  setLineTxt(val);
  renderMeme(gElCanvas, gCtx);
}

function onColorChange(color) {
  setMemeColor(color);
  renderMeme(gElCanvas, gCtx);
}

function changeFontSize(val) {
  setFontSize(val);
  renderMeme(gElCanvas, gCtx);
}

function addLine() {
  addLineToMeme(gElCanvas);
  var elLineText = document.getElementById("line-text");
  elLineText.value = "";
  elLineText.placeHolder = "Enter Text";
  renderMeme(gElCanvas, gCtx);
}

function changeLine() {
  var meme = getMeme();
  if (meme.selectedLineIdx === meme.lines.length - 1) {
    setSelectedLine(0);
  } else {
    setSelectedLine(meme.selectedLineIdx + 1);
  }
  var elLineText = document.getElementById("line-text");
  meme = getMeme();
  elLineText.value = meme.lines[meme.selectedLineIdx].txt;
}

function onCloseBtn() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  toggleSections();
}

function onDeleteLine() {
  var flag = deleteLine();
  renderMeme(gElCanvas, gCtx);
}

function onDown(ev) {
  gOnDownPos = getEvPos(ev);
  gIsDragable = isTextClicked(gOnDownPos, gCtx);
}

function onMove(ev) {
  if (!gIsDragable) return;
  const pos = getEvPos(ev);
  const dx = pos.x - gOnDownPos.x;
  const dy = pos.y - gOnDownPos.y;
  moveText(dx, dy);
  gOnDownPos = pos;
  renderMeme(gElCanvas, gCtx);
}

function onUp(ev) {
  gIsDragable = false;
}

function addListiners() {
  addMouseListeners();
}
function addMouseListeners() {
  gElCanvas.addEventListener("mousedown", (event) => {
    onDown(event);
  });
  gElCanvas.addEventListener("mousemove", (event) => {
    onMove(event);
  });
  gElCanvas.addEventListener("mouseup", (event) => {
    onUp(event);
  });
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  return pos;
}
