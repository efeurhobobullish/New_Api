const fs = require('fs'),
   FormData = require('form-data'),
   axios = require('axios'),
   cheerio = require('cheerio')

async function getAnimeVideoStatus1() {
  const url = "https://shortstatusvideos.com/anime-video-status-download/";
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const videos = [];

  $("a.mks_button.mks_button_small.squared").each((index, element) => {
    const link = $(element).attr("href");
    const title = $(element).closest("p").prevAll("p").find("strong").text();
    videos.push({ title, link });
  });

  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}
async function getAnimeVideoStatus2() {
  const url = "https://mobstatus.com/anime-whatsapp-status-video/";
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const videos = [];
  const title = $("strong").first().text();

  $("a.mb-button.mb-style-glass.mb-size-tiny.mb-corners-pill.mb-text-style-heavy").each((index, element) => {
    const link = $(element).attr("href");
    videos.push({ title, link });
  });

  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}

module.exports = { getAnimeVideoStatus1, getAnimeVideoStatus2 }
