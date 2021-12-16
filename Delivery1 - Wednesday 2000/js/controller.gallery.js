"use strict";
function init() {
  renderGallery();
}

function renderGallery() {
  var str = "";
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
