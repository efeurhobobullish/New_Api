// file: scrapers/search/sswebVidScraper.js
const axios = require("axios");

async function sswebVid(url) {
  if (!url) throw new Error("Missing URL!");

  try {
    const response = await axios.get(
      `https://ssweb-79ar.onrender.com/sswebvid?url=${encodeURIComponent(url)}`,
      { responseType: "arraybuffer" }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to record video");
  }
}

module.exports = { sswebVid };
