
export default (function anchor() {
  const links = document.getElementsByClassName("main-nav-list__link");
  const V = 1; // scrolling speed
  

  for (const iter of links) {
    iter.addEventListener("click", e => {
      e.preventDefault();

      const anchor = document.querySelector(iter.getAttribute("href"));
      const coordAnchor = anchor.getBoundingClientRect().top;
      const windowY = window.pageYOffset;

      let start = null;

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) start = time;
        let progress = time - start;

        let coordY =
          coordAnchor < 0
            ? Math.max(windowY - progress / V, windowY + coordAnchor)
            : Math.min(windowY + progress / V, windowY + coordAnchor);

        window.scrollTo(0, coordY);
        if (coordY != windowY + coordAnchor) {
          requestAnimationFrame(step);
        }
      }
    });
  }

})();