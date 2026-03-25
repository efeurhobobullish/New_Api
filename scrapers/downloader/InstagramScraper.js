const axios = require('axios');
const cheerio = require('cheerio');

async function igdl(link) {
    try {
        const form = new URLSearchParams({ url: link, submit: '' });
        const res = await axios.post('https://downloadgram.org/', form, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'content-type': 'application/x-www-form-urlencoded',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(res.data);
        const videoUrl = $('#downloadBox a').attr('href');

        if (!videoUrl) throw new Error('No video URL found, dumbass.');

        return { link: videoUrl, desc: $('title').text().trim() };
    } catch (err) {
        throw new Error(`Scraping failed: ${err.message}`);
    }
}

module.exports = { igdl };