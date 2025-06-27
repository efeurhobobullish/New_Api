const express = require('express');

//import scrapers
const { styletext } = require('../scrapers/textpro/styleTextScraper');

const router = express.Router();

router.get('/styletext', async (req, res) => {
    const text = req.query.text;
    if (!text) {
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: "Query parameter 'text' is required",
            },
        });
    }

    try {
        const results = await styletext(text);
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
