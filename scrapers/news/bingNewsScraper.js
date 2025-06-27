const axios = require('axios');
const cheerio = require('cheerio');

async function fetchNews() {
    const url = 'https://www.bing.com/news/search?q=Top+stories';
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                Connection: 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            },
            withCredentials: true,
        });

        const $ = cheerio.load(response.data);
        const newsCards = $('.news-card.news-headlines-card.news-headlines-card-normal');
        const news = [];

        newsCards.each((_, element) => {
            const title = $(element).attr('data-title')?.trim();
            const description = $(element).find('.news_snpt').text().trim();
            const url = $(element).attr('data-url')?.trim();

            if (title && description && url) {
                news.push({ title, description, url });
            }
        });

        return news;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

module.exports = fetchNews;
