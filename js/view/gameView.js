export default class GameView {
  constructor(id) {
    this.gamesGrid = document.querySelector(`.${id}`);
    this.template = document.getElementById("gameCardTemplate");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    console.log(this.gamesGrid);
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
    console.log(clone);
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
}
