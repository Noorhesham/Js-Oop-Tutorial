export class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initEventListeners();
  }

  initEventListeners() {
    // Pagination
    document.getElementById("prevBtn").addEventListener("click", () => this.prevPage());
    document.getElementById("nextBtn").addEventListener("click", () => this.nextPage());

    // Filter controls
    document
      .getElementById("genreFilter")
      .addEventListener("change", (e) => this.handleFilterChange("genres", e.target.value));
    document
      .getElementById("platformFilter")
      .addEventListener("change", (e) => this.handleFilterChange("platforms", e.target.value));
    document
      .getElementById("dateFilter")
      .addEventListener("change", (e) => this.handleFilterChange("dates", e.target.value));
    document
      .getElementById("sortFilter")
      .addEventListener("change", (e) => this.handleFilterChange("ordering", e.target.value));
    document
      .getElementById("searchInput")
      .addEventListener("input", (e) => this.handleFilterChange("search", e.target.value));
  }

  async handleFilterChange(filterType, value) {
    this.model.updateFilters({ [filterType]: value });
    await this.loadGames();
  }

  async loadGames() {
    const games = await this.model.fetchGames();
    this.view.renderGames(games);
  }

  async nextPage() {
    await this.model.nextPage();
    await this.loadGames();
  }

  async prevPage() {
    await this.model.previousPage();
    await this.loadGames();
  }
}
