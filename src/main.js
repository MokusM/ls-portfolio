import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/portfolio";
import "./scripts/reviews";
import "./scripts/reviews-form";
import "./scripts/header";
import "./scripts/anchors";
import "./scripts/parallax";
import "./scripts/preloader";





/*mob nab button*/
let navBtn = document.querySelector('.button-nav');
navBtn.addEventListener('click', function (e) {
  this.classList.toggle('active');
  document.querySelector('.header__nav').classList.toggle('show-nav')
});


/*scroll to section*/
var hiddenElement = document.getElementById("about");
var scrollBtn = document.querySelector('.js-btn-scroll');
function handleButtonClick() {
  console.log('click');
  hiddenElement.scrollIntoView({block: "start", behavior: "smooth"});
}

scrollBtn.addEventListener('click', handleButtonClick);
