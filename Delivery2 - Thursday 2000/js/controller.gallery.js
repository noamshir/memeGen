"use strict";
function init() {
  renderGallery();
  var elEditor = document.querySelector(".section-editor");
  if (!elEditor.classList.contains("close")) toggleSections();
}

function initSavedMemes() {
  renderSavedMemes();
  var elEditor = document.querySelector(".section-editor");
  if (!elEditor.classList.contains("close")) toggleSections();
}

function renderSavedMemes() {
  var memes = getSavedMemes();
  let count = 0;
  document.querySelector(".section-gallery").innerHTML = "";
  if (memes) {
    const strHTMLs = memes.map((meme) => {
      count++;
      return `<div class="meme">
        <img
          class="img-meme"
          onclick="onSavedMemeClick(${count - 1})"
          src="${meme.canvas}"
          alt="meme img"
        />
      </div>`;
    });
    document.querySelector(".section-gallery").innerHTML = strHTMLs.join("");
  }
}

function renderGallery() {
  var images = getImages();
  const strHTMLs = images.map(
    (img) =>
      `<div class="meme meme${img.id}">
       <img
         class="img-meme"
         onclick="onMemeClick(${img.id})"
         src="${img.url}"
         alt="meme img"
       />
     </div>`
  );
  document.querySelector(".section-gallery").innerHTML = strHTMLs.join("");
}

function onMemeClick(id) {
  toggleSections();
  initMemes(id);
}

function onSavedMemeClick(id) {
  toggleSections();
  initMemes(id, true);
}

function toggleSections() {
  var elEditor = document.querySelector(".section-editor");
  elEditor.classList.toggle("close");
  var elGallery = document.querySelector(".section-gallery");
  elGallery.classList.toggle("close");
  var elButtomHeader = document.querySelector(".header-buttom");
  elButtomHeader.classList.toggle("close");
  var elLineText = document.getElementById("line-text");
  elLineText.value = "";
}
