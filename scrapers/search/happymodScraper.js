const axios = require('axios');
const cheerio = require('cheerio');

async function happymod(query) {
    return new Promise((resolve, reject) => {
        const baseUrl = 'https://www.happymod.com/';
        axios.get(baseUrl + 'search.html?q=' + query)
            .then(res => {
                const $ = cheerio.load(res.data);
                const hasil = [];
                $("div.pdt-app-box").each(function (c, d) {
                    const title = $(d).find("a").text().trim();
                    const icon = $(d).find("img.lazy").attr('data-original');
                    const rating = $(d).find("span").text();
                    const link = baseUrl + $(d).find("a").attr('href');
                    hasil.push({ title, icon, link, rating });
                });
                resolve(hasil);
            })
            .catch(reject);
    });
}

module.exports = { happymod };
