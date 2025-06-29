const axios = require('axios');
const cheerio = require('cheerio');

async function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get(`http://qaz.wtf/u/convert.cgi?text=${teks}`)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                let hasil = [];
                $('table > tbody > tr').each(function (a, b) {
                    hasil.push({ 
                        name: $(b).find('td:nth-child(1) > span').text(), 
                        result: $(b).find('td:nth-child(2)').text().trim() 
                    });
                });
                resolve(hasil);
            })
            .catch(reject);
    });
}

module.exports = { styletext };
