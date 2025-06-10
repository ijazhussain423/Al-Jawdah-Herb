
// menu functionality
const openMenu = document.getElementById("open-menu");
const navBox = document.getElementById("nav-Box");

openMenu.addEventListener("click", () => {
  navBox.classList.toggle("menu-hidden");
});
