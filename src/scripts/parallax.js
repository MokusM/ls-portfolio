export default (e => {
  let items = Array.prototype.slice.call(
    document.querySelectorAll(".js-parallax-item")
  );

  window.addEventListener("wheel", e => {
    items.forEach((item, i) => {
      if (true) {
        let
          speed = item.dataset.speed,
          scrollTop = window.scrollY,
          currentPosY = window.getComputedStyle(item).top,
          deffAccel = .33,
          delta = scrollTop * speed * deffAccel,
          trs = `translate-y(${-delta}px)`;

        item.style.transform = `translate(0, ${-delta}px)`
      }
    });
  });
})();