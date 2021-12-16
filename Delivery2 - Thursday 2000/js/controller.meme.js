"use strict";
var gElCanvas;
var gCtx;
var gIsDragable = false;
var gIsTextClicked;
var gOnDownPos;
var gisFirst = true;
var gIsforSave = false;

function initMemes(id, flag = false) {
  gElCanvas = document.getElementById("meme-canvas");
  gCtx = gElCanvas.getContext("2d");
  if (!flag) {
    createMeme();
    setTextPos(0, gElCanvas.width / 2, gElCanvas.height / 4);
  } else {
    id = createSavedMeme(id);
  }
  setImg(id);
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
  let count = 0;
  meme.lines.forEach((line) => {
    ctx.lineWidth = 2;
    ctx.font = line.size + "px " + line.font;
    ctx.fillStyle = line.color;
    ctx.textAlign = line.align;
    ctx.strokeStyle = "black";
    ctx.fillText(line.txt, line.pos.x, line.pos.y);
    ctx.strokeText(line.txt, line.pos.x, line.pos.y);
    ctx.fill();
    ctx.stroke();
    var metrics = getTextWidth(ctx, line);
    var width = metrics.width;
    if (count === gMeme.selectedLineIdx && !gIsforSave) {
      ctx.strokeStyle = "white";
      if (line.align === "center") {
        ctx.strokeRect(
          line.pos.x - width / 2 - 10,
          line.pos.y - line.size,
          width + 20,
          line.size + 10
        );
      } else if (line.align === "left") {
        ctx.strokeRect(
          line.pos.x - 10,
          line.pos.y - line.size,
          width + 20,
          line.size + 10
        );
      } else {
        ctx.strokeRect(
          line.pos.x + 10,
          line.pos.y - line.size,
          -(width + 20),
          line.size + 10
        );
      }
    }
    count++;
  });
}

function onLineChange(val) {
  setLineTxt(val);
  renderMeme(gElCanvas, gCtx);
}

function onColorChange(color) {
  setMemeColor(color);
  renderMeme(gElCanvas, gCtx);
}

function onSetTextAliignment(align) {
  setLineAlign(align, gElCanvas, gCtx);
  renderMeme(gElCanvas, gCtx);
}
function onSetFontStyle(value) {
  setFontStyle(value);
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

function onDownload(elLink) {
  gIsforSave = true;
  renderMeme(gElCanvas, gCtx);
  const data = gElCanvas.toDataURL("image/png");
  elLink.href = data;
  elLink.download = "my-meme.png";
  gIsforSave = false;
  renderMeme(gElCanvas, gCtx);
}

function onSave() {
  gIsforSave = true;
  renderMeme(gElCanvas, gCtx);
  const data = gElCanvas.toDataURL();
  saveMeme(data);
  gIsforSave = false;
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
  renderMeme(gElCanvas, gCtx);
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
