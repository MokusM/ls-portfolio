export default (e => {
  const parallax = document.querySelectorAll(".parallax__layer");
  function moveItemDependendOnScroll(wScroll) {
    Array.from(parallax).forEach(parallax => {
        const divider = parallax.dataset.speed;
        const strafe  = wScroll * divider / 10;
        parallax.style.transform = `translateY(${-strafe}%)`;
    })
  }
  window.addEventListener("scroll", e => {
    const wScroll = window.pageYOffset;
    moveItemDependendOnScroll(wScroll);
  });
})();
