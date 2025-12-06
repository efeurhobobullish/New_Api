const express = require('express');
const { scrapeGoogle } = require('../scrapers/search/googleScraper');
const { happymod } = require('../scrapers/search/happymodScraper');
const { sswebSearch } = require('../scrapers/search/sswebScraper');
const { sswebVid } = require('../scrapers/search/sswebVidScraper');



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

// Route for SSWEB Screenshot
router.get('/ssweb', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: "Query parameter 'url' is required",
            },
        });
    }

    try {
        const imgBuffer = await sswebSearch(targetUrl);

        // Set headers for image output
        res.setHeader("Content-Type", "image/png");
        res.send(imgBuffer);

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

router.get('/sswebvid', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({
            status: false,
            message: "Query parameter 'url' is required"
        });
    }

    try {
        const videoBuffer = await sswebVid(targetUrl);
        res.setHeader("Content-Type", "video/mp4");
        res.send(videoBuffer);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});


module.exports = router;

