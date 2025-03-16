import GameController from "./js/controller/gameController.js";
import GameModel from "./js/model/gamesModel.js";
import GameView from "./js/view/gameView.js";

document.addEventListener("DOMContentLoaded", function () {
  const categories = [
    { id: "trending-games", title: "Trending Games", filters: {} },
    { id: "ps5-games", title: "PS5 Games", filters: { platforms: 187, ordering: "-metacritic" } },
    { id: "xbox-games", title: "Xbox Games", filters: { platforms: 1, ordering: "-rating" } },
    { id: "pc-games", title: "PC Games", filters: { platforms: 4, ordering: "-released" } },
    { id: "free-games", title: "Free Games", filters: { ordering: "-added", price: "free" } },
  ];

  categories.forEach(({ id, title, filters }) => {
    const div = document.createElement("div");
    div.innerHTML = `<h2>${title}</h2><div class="grid4 ${id}"></div>`;
    const container = document.querySelector(".container");
    container.appendChild(div);

    const app = new GameController(new GameModel({ ...filters }, 4), new GameView(`${id}`), false);
    app.loadGames();
  });
});
