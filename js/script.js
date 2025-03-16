import GameController from "./controller/gameController.js";
import GameModel from "./model/gamesModel.js";
import GameView from "./view/gameView.js";

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  const app = new GameController(
    new GameModel({
      platforms: 187,
      ordering: "-metacritic",
    }),
    new GameView("games-grid")
  );
  app.loadGames();
  const swiper = new Swiper(".featured-slider", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  // Custom pagination with game list
  const gameItems = document.querySelectorAll(".game-item");
  console.log(gameItems);
  // Set initial active state
  updateActiveGameItem(0);

  // Add click event to each game item
  gameItems.forEach((item) => {
    item.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide-index"));

      swiper.slideTo(slideIndex);
    });
  });

  // Update active game item when slide changes
  swiper.on("slideChange", function () {
    updateActiveGameItem(swiper.realIndex);
  });
  function updateActiveGameItem(index) {
    gameItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to the corresponding item
    const activeItem = document.querySelector(`.game-item[data-slide-index="${index}"]`);
    if (activeItem) {
      activeItem.classList.add("active");
    }
  }
});
