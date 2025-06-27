const express = require('express');
const router = express.Router();

// Import required scraper functions
const { getAnimeVideoStatus1, getAnimeVideoStatus2 } = require('../scrapers/anime/anime-status.js');



// Anime Status 1 Route
router.get('/anime-status1', async (req, res) => {
    try {
        const response = await getAnimeVideoStatus1();
        res.json({
            founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            status: true,
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            status: false,
            message: 'Failed to fetch anime status 1',
            error: error.message,
        });
    }
});

// Anime Status 2 Route
router.get('/anime-status2', async (req, res) => {
    try {
        const response = await getAnimeVideoStatus2();
        res.json({
            founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            status: true,
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            status: false,
            message: 'Failed to fetch anime status 2',
            error: error.message,
        });
    }
});


module.exports = router;
