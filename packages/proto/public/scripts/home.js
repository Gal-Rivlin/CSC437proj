const savedTheme = sessionStorage.getItem("theme");
document.body.classList.toggle("dark-mode", savedTheme === "dark");

window.addEventListener("darkmode:toggle", (event) => {
  const checked = event.detail?.checked;
  document.body.classList.toggle("dark-mode", !!checked);
  sessionStorage.setItem("theme", checked ? "dark" : "light");
});
