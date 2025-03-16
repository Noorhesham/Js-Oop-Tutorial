export default class GameController {
  constructor(model, view, filter = true) {
    this.model = model;
    this.view = view;
    this.canFilter = filter;
    this.initEventListeners();
  }

  initEventListeners() {
    // Pagination
    document.getElementById("prevBtn").addEventListener("click", () => this.prevPage());
    document.getElementById("nextBtn").addEventListener("click", () => this.nextPage());

    // Filter controls
    if (!this.canFilter) return;
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
    const games = await this.model.updateFilters({ [filterType]: value });
    console.log(games);
    this.view.renderGames(games);
  }

  async loadGames() {
    const games = await this.model.fetchGames();
    this.view.renderGames(games);
  }

  async nextPage() {
    const games = await this.model.nextPage();
    this.view.renderGames(games);
  }

  async prevPage() {
    const games = await this.model.previousPage();
    this.view.renderGames(games);
  }
}
