const express = require('express');

//import scraper functions
const { scrapeGoogle } = require('../scrapers/search/googleScraper');
const { happymod } = require('../scrapers/search/happymodScraper');


//create a router
const router = express.Router();


//route search on google
router.get('/google', async (req, res) => {
    const query = req.query.q;
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
        const results = await scrapeGoogle(query);

        return res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: results,
            },
        });
    } catch (error) {
        return res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: error.message,
            },
        });
    }
});



// Route for Happymod search
router.get('/happymod', async (req, res) => {
    const query = req.query.q;
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
        const results = await happymod(query);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: results,
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
