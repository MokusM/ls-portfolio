import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/portfolio";
import "./scripts/reviews";
import "./scripts/reviews-form";
import "./scripts/header";
import "./scripts/parallax";
import "./scripts/preloader";

let navBtn = document.querySelector('.button-nav');

navBtn.addEventListener('click', function (e) {
  this.classList.toggle('active');
  document.querySelector('.header__nav').classList.toggle('show-nav')
});

