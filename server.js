const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes

const API_KEY = "9f2837ad90df4c7e86239a326679558e";
const API_BASE_URL = "https://api.rawg.io/api";

app.get("/api/games", async (req, res) => {
  try {
    const params = { key: API_KEY };

    const allowedParams = ["page", "page_size", "genres", "platforms", "dates", "ordering", "search"];

    allowedParams.forEach((param) => {
      if (req.query[param]) {
        params[param] = req.query[param];
      }
    });

    const response = await fetch(`${API_BASE_URL}/games?${new URLSearchParams(params)}`);
    console.log(`${API_BASE_URL}/games?${new URLSearchParams(params)}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/categories", async (req, res) => {
  console.log(req, "hello");
  res.json("hello");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
