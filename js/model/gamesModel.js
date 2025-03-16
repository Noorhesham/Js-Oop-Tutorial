const BACKENDAPI = `http://localhost:3000`;
export default class GameModel {
  constructor(filters = {}, page_size) {
    this.games = [];
    this.currentPage = 1;
    this.page_size = page_size || 12;
    this.filters = {
      genres: "",
      platforms: "",
      dates: "",
      ordering: "-rating",
      search: "",
      ...filters,
    };
  }

  async fetchGames() {
    try {
      //
      const queryParams = new URLSearchParams({
        page: this.currentPage,
        page_size: this.page_size || 12,
        ...this.filters,
      });

      const response = await fetch(`${BACKENDAPI}/api/games?${queryParams}`);
      const data = await response.json();
      console.log(data);
      this.games = data.results.map((game) => ({
        id: game.id,
        title: game.name,
        image: game.background_image,
        rating: game.rating,
        released: game.released,
        genres: game.genres.map((g) => g.name),
        platforms: game.platforms.map((p) => p.platform.name),
        price: this.generatePrice(game.id),
        status: this.getGameStatus(game.id),
      }));
      return this.games;
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  }
  updateFilters(newFilters) {
    this.filters = { ...this.filters, ...newFilters };
    this.currentPage = 1; // Reset to first page when filters change
    return this.fetchGames();
  }
  generatePrice(gameId) {
    // This is just for demo purposes
    const prices = ["$14.99", "$11.59", "Free", "$3.99", "$44.99", "$59.99"];
    return prices[gameId % prices.length];
  }

  getGameStatus(gameId) {
    // This is just for demo purposes
    const statuses = ["Now On Epic", "", "Free", "", ""];
    return statuses[gameId % statuses.length];
  }

  nextPage() {
    this.currentPage++;
    return this.fetchGames(); //THIS.GAMES
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      return this.fetchGames();
    }

    return Promise.resolve(this.games);
  }
}
