const axios = require('axios');

async function ytmp3(query) {
    return new Promise(async (resolve, reject) => {
        try {
            async function scrapeData(q) {
                // Updated API endpoint
                const url = 'https://media.savetube.vip/api/random-cdn';
                
                try {
                    // First get CDN
                    const cdnResponse = await axios.get(url);
                    const cdn = cdnResponse.data.cdn;
                    
                    // Then get info from CDN
                    const infoUrl = `https://${cdn}/v2/info`;
                    const headers = {
                        'Content-Type': 'application/json',
                        'Origin': 'https://yt.savetube.me',
                        'Referer': 'https://yt.savetube.me/',
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                    };
                    
                    const data = { url: q };
                    const response = await axios.post(infoUrl, data, { headers });
                    const encryptedData = response.data?.data;
                    
                    if (!encryptedData) {
                        throw new Error('No data received');
                    }
                    
                    // Decrypt the data (the working code includes decryption)
                    const crypto = require('crypto');
                    const encrypted = Buffer.from(encryptedData, 'base64');
                    const decipher = crypto.createDecipheriv(
                        'aes-128-cbc', 
                        Buffer.from('C5D58EF67A7584E4A29F6C35BBC4EB12', 'hex'), 
                        encrypted.slice(0, 16)
                    );
                    const decrypted = JSON.parse(Buffer.concat([decipher.update(encrypted.slice(16)), decipher.final()]).toString());
                    
                    return {
                        key: decrypted.key,
                        cdn: cdn
                    };
                } catch (error) {
                    console.log('Error fetching data:', error.message);
                    return null;
                }
            }

            // Function to scrape the download link
            async function scrapeSite(q, type, quality) {
                const keyData = await scrapeData(q);
                if (!keyData) {
                    throw new Error('Unable to fetch key.');
                }
                
                const downloadUrl = `https://${keyData.cdn}/download`;
                const headers = {
                    'Content-Type': 'application/json',
                    'Origin': 'https://yt.savetube.me',
                    'Referer': 'https://yt.savetube.me/',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                };
                
                // Extract video ID from URL
                const videoId = extractVideoId(q);
                
                const data = {
                    id: videoId,
                    downloadType: type,
                    quality: quality,
                    key: keyData.key,
                };
                
                try {
                    const response = await axios.post(downloadUrl, data, { headers });
                    return response.data?.data?.downloadUrl;
                } catch (error) {
                    console.log('Error fetching download:', error.message);
                    throw error;
                }
            }
            
            // Helper function to extract video ID
            function extractVideoId(url) {
                const patterns = [
                    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
                    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
                    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
                    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
                    /youtu\.be\/([a-zA-Z0-9_-]{11})/
                ];
                for (const pattern of patterns) {
                    const match = url.match(pattern);
                    if (match) return match[1];
                }
                return null;
            }
            
            let dlink = await scrapeSite(query, "audio", "128");
            
            const result = {
                dl_link: dlink
            };
            
            resolve(result);
            
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}

async function ytmp4(query) {
    return new Promise(async (resolve, reject) => {
        try {
            async function scrapeData(q) {
                // Updated API endpoint
                const url = 'https://media.savetube.vip/api/random-cdn';
                
                try {
                    // First get CDN
                    const cdnResponse = await axios.get(url);
                    const cdn = cdnResponse.data.cdn;
                    
                    // Then get info from CDN
                    const infoUrl = `https://${cdn}/v2/info`;
                    const headers = {
                        'Content-Type': 'application/json',
                        'Origin': 'https://yt.savetube.me',
                        'Referer': 'https://yt.savetube.me/',
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                    };
                    
                    const data = { url: q };
                    const response = await axios.post(infoUrl, data, { headers });
                    const encryptedData = response.data?.data;
                    
                    if (!encryptedData) {
                        throw new Error('No data received');
                    }
                    
                    // Decrypt the data
                    const crypto = require('crypto');
                    const encrypted = Buffer.from(encryptedData, 'base64');
                    const decipher = crypto.createDecipheriv(
                        'aes-128-cbc', 
                        Buffer.from('C5D58EF67A7584E4A29F6C35BBC4EB12', 'hex'), 
                        encrypted.slice(0, 16)
                    );
                    const decrypted = JSON.parse(Buffer.concat([decipher.update(encrypted.slice(16)), decipher.final()]).toString());
                    
                    return {
                        key: decrypted.key,
                        cdn: cdn
                    };
                } catch (error) {
                    console.log('Error fetching data:', error.message);
                    return null;
                }
            }

            // Function to scrape the download link
            async function scrapeSite(q, type, quality) {
                const keyData = await scrapeData(q);
                if (!keyData) {
                    throw new Error('Unable to fetch key.');
                }
                
                const downloadUrl = `https://${keyData.cdn}/download`;
                const headers = {
                    'Content-Type': 'application/json',
                    'Origin': 'https://yt.savetube.me',
                    'Referer': 'https://yt.savetube.me/',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                };
                
                // Extract video ID from URL
                const videoId = extractVideoId(q);
                
                const data = {
                    id: videoId,
                    downloadType: type,
                    quality: quality,
                    key: keyData.key,
                };
                
                try {
                    const response = await axios.post(downloadUrl, data, { headers });
                    return response.data?.data?.downloadUrl;
                } catch (error) {
                    console.log('Error fetching download:', error.message);
                    throw error;
                }
            }
            
            // Helper function to extract video ID
            function extractVideoId(url) {
                const patterns = [
                    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
                    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
                    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
                    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
                    /youtu\.be\/([a-zA-Z0-9_-]{11})/
                ];
                for (const pattern of patterns) {
                    const match = url.match(pattern);
                    if (match) return match[1];
                }
                return null;
            }
            
            let dlink = await scrapeSite(query, "video", "240");
            let dlink1 = await scrapeSite(query, "video", "360");
            let dlink2 = await scrapeSite(query, "video", "480");
            let dlink3 = await scrapeSite(query, "video", "720");
            let dlink4 = await scrapeSite(query, "video", "1080");
            
            const result = {
                dl: dlink,
                dl1: dlink1,
                dl2: dlink2,
                dl3: dlink3,
                dl4: dlink4,
            };
            
            resolve(result);
            
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}

module.exports = { ytmp3, ytmp4 };