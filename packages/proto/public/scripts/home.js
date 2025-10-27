const dmLabel = document.querySelector(".dark-mode-toggle");
const checkbox = dmLabel?.querySelector('input[type="checkbox"]');

const savedTheme = sessionStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  if (checkbox) checkbox.checked = true;
} else if (savedTheme === "light") {
  document.body.classList.remove("dark-mode");
  if (checkbox) checkbox.checked = false;
}

dmLabel.onchange = (event) => {
  event.stopPropagation();

  const target = event.target;
  if (!target || target.type !== "checkbox") return;

  dmLabel.dispatchEvent(
    new CustomEvent("darkmode:toggle", {
      bubbles: true,
      detail: { checked: target.checked },
    })
  );
};

document.body.addEventListener("darkmode:toggle", (event) => {
  const checked = event.detail?.checked;
  if (checked) {
    document.body.classList.add("dark-mode");
    sessionStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    sessionStorage.setItem("theme", "light");
  }
});
