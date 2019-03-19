export default (function changeHeader() {
	let header = document.querySelector(".header");

	if (window.scrollY > 180) {
		header.classList.add("header-fixed");
	} else {
		header.classList.remove("header-fixed");
	}

	window.addEventListener("wheel", e => {
		let offset = window.scrollY;

		if (offset > 180) {
			header.classList.add("header-fixed");
		} else {
			header.classList.remove("header-fixed");
		}
	});
})();