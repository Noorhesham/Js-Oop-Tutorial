export default class GameView {
  constructor() {
    this.gamesGrid = document.getElementById("gamesGrid");
    this.template = document.getElementById("gameCardTemplate");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
  }

  renderGames(games) {
    this.gamesGrid.innerHTML = "";
    games.forEach((game) => {
      const gameCard = this.createGameCard(game);
      this.gamesGrid.appendChild(gameCard);
    });
  }

  createGameCard(game) {
    const clone = this.template.content.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = game.image;
    img.alt = game.title;

    clone.querySelector(".game-title").textContent = game.title;

    const priceElement = clone.querySelector(".game-price");
    if (game.status) {
      priceElement.textContent = game.status;
    } else {
      priceElement.textContent = game.price;
    }

    return clone;
  }

  bindPrevButton(handler) {
    this.prevBtn.addEventListener("click", handler);
  }

  bindNextButton(handler) {
    this.nextBtn.addEventListener("click", handler);
  }

  updateNavigationButtons(currentPage) {
    this.prevBtn.disabled = currentPage === 1;
  }
}
