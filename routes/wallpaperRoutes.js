const express = require('express');
const router = express.Router();
const unsplashScraper = require('../scrapers/wallpaper/unsplashScraper');
const konachanScraper = require('../scrapers/wallpaper/konachanScraper');

// GET Unsplash wallpapers by query
router.get('/unsplash/:query', async (req, res) => {
  try {
    const images = await unsplashScraper(req.params.query);
    res.status(200).json({ success: true, count: images.length, images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET Konachan wallpapers by character/tag
router.get('/konachan/:chara', async (req, res) => {
  try {
    const images = await konachanScraper(req.params.chara);
    if (images.length === 0) {
      return res.status(404).json({ success: false, message: 'No images found for this tag.' });
    }
    res.status(200).json({ success: true, count: images.length, images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;