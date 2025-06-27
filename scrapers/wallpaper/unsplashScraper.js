const axios = require('axios');
const cheerio = require('cheerio');

exports.unsplash = async (query) => {
  try {
    if (!query) {
      throw new Error("Please provide a search query.");
    }

    const { data: html } = await axios.get(`https://unsplash.com/s/photos/${query}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(html);
    const imagesData = [];

    $("img").each((i, image) => {
      let imgUrl = $(image).attr("src");
      if (imgUrl && imgUrl.startsWith("https://images.unsplash.com/") && !imgUrl.includes("profile")) {
        const sizeParams = "w=1920&h=1080&fit=crop";
        imgUrl = imgUrl.split('?')[0] + `?${sizeParams}&q=80&ixid=MnwzNjI1fDB8MHxwaG90by1mYW1pbHk&ixlib=rb-1.2.1`;
        imagesData.push(imgUrl);
      }
    });

    if (imagesData.length > 0) {
      return imagesData;
    } else {
      throw new Error("No images found for this query.");
    }
  } catch (error) {
    throw new Error(`Error fetching Unsplash data: ${error.message}`);
  }
};
