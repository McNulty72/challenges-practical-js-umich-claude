const cards = document.querySelectorAll(".card");
let currentFavorite = null;

function onClick(eve) {
  const clicked = eve.target.closest(".card");
  const displayFavorite = document.querySelector(".display p");
  displayFavorite.textContent = "";
  displayFavorite.classList.remove("favorite");
  // Checks whether clicked has favorite class
  if (clicked.classList.contains("favorite")) {
    clicked.classList.remove("favorite");
    currentFavorite = null;
  } else {
    if (currentFavorite) {
      currentFavorite.classList.remove("favorite");
    }
    clicked.classList.add("favorite");
    currentFavorite = clicked;
    const displayText = clicked.querySelector("h2").textContent;
    displayFavorite.textContent = `Your favorite: ${displayText}`;
    displayFavorite.classList.add("favorite");
  }
}

cards.forEach((ele) => ele.addEventListener("click", onClick));
