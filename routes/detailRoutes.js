const express = require('express');
const router = express.Router();

// Importing the scraper Routes
const { quotes } = require('../scrapers/details/quotesScraper');

// Route for fetching a random quote
router.get('/random-quote', async (req, res) => {
    try {
        const result = await quotes();
        if (result) {
            res.json({
                founder: "AHMMI-KUN",
                company: "Xlicon Botz Inc",
                status: true,
                data: result,
            });
        } else {
            res.status(500).json({
                founder: "AHMMI-KUN",
                company: "Xlicon Botz Inc",
                status: false,
                message: 'Failed to fetch quote',
            });
        }
    } catch (error) {
        res.status(500).json({
            founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            status: false,
            message: 'An error occurred while processing the request.',
            error: error.message,
        });
    }
});

module.exports = router;
