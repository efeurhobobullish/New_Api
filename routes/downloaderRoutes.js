const express = require('express');
const router = express.Router();


//import scrappers
const { ttsave } = require('../scrapers/downloader/tiktokScraper');


// TikTok scraper route
router.get('/tiktok', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ Founder: "AHMMI-KUN", company: "Xlicon Botz Inc", data: { status: false, data: { title: "URL is required" } } });

    try {
        const result = await ttsave.download(url);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: {
                    title: result.username,
                    uniqueId: result.uniqueId,
                    userHandle: result.userHandle,
                    userProfileImage: result.userProfileImage,
                    description: result.description,
                    views: result.views,
                    downloadLinks: {
                        noWatermark: result.downloadLinks.noWatermark,
                        withWatermark: result.downloadLinks.withWatermark,
                        audio: result.downloadLinks.audio,
                        profileImage: result.downloadLinks.profileImage,
                        coverImage: result.downloadLinks.coverImage
                    }
                }
            }
        });
    } catch (error) {
        res.status(500).json({ Founder: "AHMMI-KUN", company: "Xlicon Botz Inc", data: { status: false, data: { title: "TikTok scraper failed" } } });
    }
});





module.exports = router;


