const axios = require("axios");

async function sswebSearch(url) {
  try {
    // Request the screenshot as a binary stream
    const response = await axios.get(
      `https://ssweb-79ar.onrender.com/ssweb?url=${encodeURIComponent(url)}`,
      { responseType: "arraybuffer" }
    );

    return response.data; // return buffer (image)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to screenshot");
  }
}

module.exports = { sswebSearch };
