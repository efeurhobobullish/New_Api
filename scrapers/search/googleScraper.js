const axios = require('axios');
const cheerio = require('cheerio');

const scrapeGoogle = async (query, maxPages = 3) => {
    try {
        const results = [];
        const currentTime = new Date().toISOString();

        for (let i = 0; i < maxPages; i++) {
            const start = i * 10; // Start index for pagination
            const response = await axios.get(`https://www.google.com/search?q=${query}&start=${start}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                },
            });

            const $ = cheerio.load(response.data);

            $('.g').each((_, element) => {
                const title = $(element).find('h3').text().trim() || '';
                const link = $(element).find('a').attr('href') || '';
                const description = $(element).find('.VwiC3b').text().trim() || '';

                if (title && link) {
                    results.push({
                        title,
                        link,
                        description,
                        scrapedAt: currentTime,
                    });
                }
            });
        }

        return results;
    } catch (error) {
        throw new Error(`Error scraping Google: ${error.message}`);
    }
};

module.exports = { scrapeGoogle };
