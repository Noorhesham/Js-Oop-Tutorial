import { GameController } from "./controller/gameController.js";
import { GameModel } from "./model/gamesModel.js";
import GameView from "./view/gameView.js";

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  const app = new GameController(
    new GameModel({
      platforms: 187,
      ordering: "-metacritic",
    }),
    new GameView()
  );
  app.loadGames();
  const swiper = new Swiper(".featured-slider", {
    // Optional parameters
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
    // No default pagination since we're using custom
  });

  // Custom pagination with game list
  const gameItems = document.querySelectorAll(".game-item");

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
    // Remove active class from all items
    gameItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to the corresponding item
    const activeItem = document.querySelector(`.game-item[data-slide-index="${index}"]`);
    if (activeItem) {
      activeItem.classList.add("active");

      // Scroll the item into view on mobile
      if (window.innerWidth <= 768) {
        activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  // Handle window resize for responsive adjustments
  window.addEventListener("resize", function () {
    swiper.update();
  });
});
