const express = require('express');
const router = express.Router();

// Import the islamai scraper
const { postData } = require('../scrapers/ai/aoyoAiScraper');



// Aoyo route
router.get('/aoyo', async (req, res) => {
    const query = req.query.q; // Get query parameter 'q'
    if (!query) {
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: "Query parameter 'q' is required",
            },
        });
    }

    try {
        const response = await postData(query); // Call the aoyo scraper
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                response,
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
