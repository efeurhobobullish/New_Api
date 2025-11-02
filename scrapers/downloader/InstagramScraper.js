const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");

async function instagram(url) {
  return new Promise(async (resolve, reject) => {
    try {
      // Step 1: Get token
      const { data } = await axios.get(
        "https://www.instagramsave.com/download-instagram-videos.php",
        {
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "cookie":
              "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680;",
          },
        }
      );

      const $ = cheerio.load(data);
      const token = $("#token").attr("value");

      // Step 2: Post to get download links
      const response = await axios.post(
        "https://www.instagramsave.com/system/action.php",
        qs.stringify({
          url: url,
          action: "post",
          token: token,
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "referer": "https://www.instagramsave.com/download-instagram-videos.php",
          },
        }
      );

      resolve(response.data.medias);
    } catch (err) {
      reject(err.message || err);
    }
  });
}

module.exports = { instagram };