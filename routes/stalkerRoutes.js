const express = require('express');

//import scrapers
const { githubStalk } = require('../scrapers/stalker/githubStalker');
const { npmStalk } = require('../scrapers/stalker/npmStalker');

//create router
const router = express.Router();


//github stalk route
router.get('/githubstalk', async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: "Query parameter 'username' is required",
            },
        });
    }

    try {
        const result = await githubStalk(username);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: result,
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


//npm stalk route
router.get('/npmstalk', async (req, res) => {
    const packageName = req.query.packageName;
    if (!packageName) {
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: "Query parameter 'packageName' is required",
            },
        });
    }

    try {
        const result = await npmStalk(packageName);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: result,
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






