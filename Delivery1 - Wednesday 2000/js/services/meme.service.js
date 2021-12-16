"use strict";
var gKeywordSearchCountMap = { funny: 0, cat: 0, baby: 0, celebs: 0 };
var gImgs = [
  { id: 0, url: "img/meme-images/1.jpg", keywords: ["celeb", "funny"] },
  { id: 1, url: "img/meme-images/2.jpg", keywords: ["celeb", "funny"] },
  { id: 2, url: "img/meme-images/3.jpg", keywords: ["celeb", "funny"] },
  { id: 3, url: "img/meme-images/4.jpg", keywords: ["celeb", "funny"] },
  { id: 4, url: "img/meme-images/5.jpg", keywords: ["celeb", "funny"] },
  { id: 5, url: "img/meme-images/6.jpg", keywords: ["celeb", "funny"] },
  { id: 6, url: "img/meme-images/7.jpg", keywords: ["celeb", "funny"] },
  { id: 7, url: "img/meme-images/8.jpg", keywords: ["celeb", "funny"] },
  { id: 8, url: "img/meme-images/9.jpg", keywords: ["celeb", "funny"] },
  { id: 9, url: "img/meme-images/10.jpg", keywords: ["celeb", "funny"] },
  { id: 10, url: "img/meme-images/11.jpg", keywords: ["celeb", "funny"] },
  { id: 11, url: "img/meme-images/12.jpg", keywords: ["celeb", "funny"] },
  { id: 12, url: "img/meme-images/13.jpg", keywords: ["celeb", "funny"] },
  { id: 13, url: "img/meme-images/14.jpg", keywords: ["celeb", "funny"] },
  { id: 14, url: "img/meme-images/15.jpg", keywords: ["celeb", "funny"] },
  { id: 15, url: "img/meme-images/16.jpg", keywords: ["celeb", "funny"] },
  { id: 16, url: "img/meme-images/17.jpg", keywords: ["celeb", "funny"] },
  { id: 17, url: "img/meme-images/18.jpg", keywords: ["celeb", "funny"] },
];
var gMeme;

function getImages() {
  return gImgs;
}

function getMeme() {
  return gMeme;
}

function createMeme() {
  gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "Enter Text",
        size: 30,
        align: "center",
        color: "white",
        pos: { x: 0, y: 0 },
      },
    ],
  };
}

function isTextClicked(clickedPos, ctx) {
  var pos;
  let count = 0;
  let flag = false;
  gMeme.lines.forEach((line) => {
    var metrics = getTextWidth(ctx, line);
    var width = metrics.width;
    pos = line.pos;
    if (
      clickedPos.x <= pos.x + width / 2 &&
      clickedPos.x >= pos.x - width / 2 &&
      clickedPos.y <= pos.y &&
      clickedPos.y >= pos.y - line.size
    ) {
      gMeme.selectedLineIdx = count;
      var elLineText = document.getElementById("line-text");
      elLineText.value = line.txt;
      flag = true;
      return;
    }
    count++;
  });
  return flag;
}

function getTextWidth(ctx, line) {
  ctx.font = `normal ${line.size}px Impact`;
  const metrics = ctx.measureText(line.txt);
  return metrics;
}

function setImg(id) {
  gMeme.selectedImgId = id;
}

function setMemeColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setLineTxt(txt) {
  var idx = gMeme.selectedLineIdx;
  gMeme.lines[idx].txt = txt;
}

function setFontSize(val) {
  var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
  gMeme.lines[gMeme.selectedLineIdx].size = fontSize + val;
}

function addLineToMeme(elCanvas) {
  var lines = gMeme.lines;
  if (lines.length === 1) {
    lines.push({
      txt: "Enter Text",
      size: 30,
      align: "center",
      color: "white",
      pos: {
        x: elCanvas.width / 2,
        y: (elCanvas.height * 3) / 4,
      },
    });
  } else {
    lines.push({
      txt: "Enter Text",
      size: 30,
      align: "center",
      color: "white",
      pos: {
        x: elCanvas.width / 2,
        y: elCanvas.height / 2,
      },
    });
  }
  gMeme.selectedLineIdx = lines.length - 1;
}

function deleteLine() {
  if (gMeme.lines.length === 1) {
    gMeme.lines[gMeme.selectedLineIdx].txt = "";
    return;
  }
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx = 0;
}

function setSelectedLine(idx) {
  gMeme.selectedLineIdx = idx;
}

function setTextPos(idx, x, y) {
  gMeme.lines[idx].pos.x = x;
  gMeme.lines[idx].pos.y = y;
}

function moveText(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += dx;
  gMeme.lines[gMeme.selectedLineIdx].pos.y += dy;
}
