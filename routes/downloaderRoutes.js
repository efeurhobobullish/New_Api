const express = require('express');
const router = express.Router();

const { tiktok } = require('../scrapers/downloader/tiktokScraper');
const { ytmp3, ytmp4 } = require('../scrapers/downloader/youtubeScraper');
const { facebook } = require('../scrapers/downloader/facebookScraper');
const { twitter } = require('../scrapers/downloader/twitterScraper');
const { instagram } = require('../scrapers/downloader/InstagramScraper');



router.get('/tiktok', async (req, res) => {
    const { url } = req.query;
    if (!url)
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "URL is required" } }
        });

    try {
        const result = await tiktok.download(url);
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
        res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "TikTok scraper failed" } }
        });
    }
});

router.get('/ytmp3', async (req, res) => {
    const { url } = req.query;
    if (!url)
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "URL is required" } }
        });

    try {
        const result = await ytmp3(url);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: {
                    type: "mp3",
                    dl_link: result.dl_link
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "YouTube MP3 scraper failed" } }
        });
    }
});

router.get('/ytmp4', async (req, res) => {
    const { url } = req.query;
    if (!url)
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "URL is required" } }
        });

    try {
        const result = await ytmp4(url);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: {
                    type: "mp4",
                    qualityLinks: {
                        "240p": result.dl,
                        "360p": result.dl1,
                        "480p": result.dl2,
                        "720p": result.dl3,
                        "1080p": result.dl4
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "YouTube MP4 scraper failed" } }
        });
    }
});


router.get('/facebook', async (req, res) => {
    const { url } = req.query;
    if (!url)
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "URL is required" } }
        });

    try {
        const result = await facebook(url);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: {
                    title: result.title,
                    description: result.desc,
                    thumbnail: result.thumb,
                    qualityLinks: {
                        sd: result.sd,
                        hd: result.hd || null
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "Facebook scraper failed" } }
        });
    }
});

router.get('/twitter', async (req, res) => {
    const { url } = req.query;
    if (!url)
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "URL is required" } }
        });

    try {
        const result = await twitter(url);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: {
                    description: result.desc,
                    thumbnail: result.thumb,
                    downloadLinks: {
                        video_hd: result.video_hd,
                        video_sd: result.video_sd,
                        audio: result.audio
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "Twitter scraper failed" } }
        });
    }
});

router.get('/instagram', async (req, res) => {
    const { url } = req.query;
    if (!url)
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "URL is required" } }
        });

    try {
        const result = await instagram(url);
        res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: result
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: { status: false, data: { title: "Instagram downloader failed" } }
        });
    }
});



module.exports = router;