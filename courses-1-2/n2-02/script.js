const bodyEle = document.querySelector("body");
const toggleDarkmodeBtn = document.querySelector(".toggle-btn");
const increaseFontSize = document.querySelector(".increase-btn");
const decreaseFontSize = document.querySelector(".decrease-btn");
const maxFontSize = 28;
const minFontSize = 16;
const fontSizeChange = 4;

function toggleDarkmode(event) {
  let currentText = event.target.textContent.trim();
  currentText === "Activate dark mode"
    ? (currentText = "Activate light mode")
    : (currentText = "Activate dark mode");
  bodyEle.classList.toggle("dark-mode");
  event.target.textContent = currentText;
  let currentAttrValue = event.target.getAttribute("aria-pressed");
  currentAttrValue === "false"
    ? (currentAttrValue = "true")
    : (currentAttrValue = "false");
  event.target.setAttribute("aria-pressed", currentAttrValue);
}

function changeFontSize(event) {
  let currentFontSize = window
    .getComputedStyle(bodyEle)
    .getPropertyValue("font-size");
  let newFontsize;
  if (event.target === increaseFontSize) {
    newFontsize =
      Number(currentFontSize.slice(0, currentFontSize.lastIndexOf("px"))) +
      fontSizeChange;
    bodyEle.style.fontSize = newFontsize + "px";
  } else {
    newFontsize =
      Number(currentFontSize.slice(0, currentFontSize.lastIndexOf("px"))) -
      fontSizeChange;
    bodyEle.style.fontSize = newFontsize + "px";
  }
  increaseFontSize.disabled = newFontsize === maxFontSize;
  decreaseFontSize.disabled = newFontsize === minFontSize;
}

toggleDarkmodeBtn.addEventListener("click", toggleDarkmode);
increaseFontSize.addEventListener("click", changeFontSize);
decreaseFontSize.addEventListener("click", changeFontSize);
