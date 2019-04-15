export default (function preloaderRemove() {
  let preloader = document.getElementById('body');
  document.addEventListener("DOMContentLoaded", function (e) {
    setTimeout(function () {       
      console.log(preloader.classList.length);
      if(preloader.classList.contains('loaded')){
        preloader.classList.remove('loaded')
      }           
    }, 2000)
  })
})();