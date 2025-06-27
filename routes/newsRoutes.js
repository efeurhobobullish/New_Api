const express = require('express');
const router = express.Router();

// Import the bingNews scraper
const fetchNews = require('../scrapers/news/bingNewsScraper');

router.get('/bingnews', async (req, res) => {
    try {
        const news = await fetchNews(); // Call the bingNews scraper
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                news,
            },
        });
    } catch (error) {
        res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: error.message,
            },
        });
    }
});

module.exports = router;
