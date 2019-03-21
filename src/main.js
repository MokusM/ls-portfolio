import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/header";
import "./scripts/parallax";




let navBtn = document.querySelector('.button-nav');

navBtn.addEventListener('click', function (e) {
  this.classList.toggle('active');
  document.querySelector('.header__nav').classList.toggle('show-nav')
})