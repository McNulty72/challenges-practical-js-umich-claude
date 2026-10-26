const htmlEle = document.querySelector("html");
const bodyEle = document.querySelector("body");
const toggleDarkmodeBtn = document.querySelector(".toggle-btn");
const increaseFontSize = document.querySelector(".increase-btn");
const decreaseFontSize = document.querySelector(".decrease-btn");
const fontSizes = ["small", "medium", "large"];

function classAddRemove(classToAdd, classToRemove, element) {
  element.classList.remove(classToRemove);
  element.classList.add(classToAdd);
}

function switchDisabled(currentClass) {
  decreaseFontSize.disabled = currentClass === fontSizes[0];
  increaseFontSize.disabled = currentClass === fontSizes[fontSizes.length - 1];
}

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

let currentFontSize = htmlEle.classList.item(0);
function changeFontSize(event) {
  let newFontsize;
  if (event.target === increaseFontSize) {
    newFontsize = fontSizes[fontSizes.indexOf(currentFontSize) + 1];
    classAddRemove(newFontsize, currentFontSize, htmlEle);
  } else {
    newFontsize = fontSizes[fontSizes.indexOf(currentFontSize) - 1];
    classAddRemove(newFontsize, currentFontSize, htmlEle);
  }
  currentFontSize = newFontsize;
  switchDisabled(currentFontSize);
}

toggleDarkmodeBtn.addEventListener("click", toggleDarkmode);
increaseFontSize.addEventListener("click", changeFontSize);
decreaseFontSize.addEventListener("click", changeFontSize);
switchDisabled(currentFontSize);
