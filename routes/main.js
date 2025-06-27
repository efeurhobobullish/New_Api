//_________________________Code Implanted By Maher Zubair_________________________//
const express = require('express')
const router = express.Router()
const axios = require('axios')
const os = require('os')
const { runtime } = require('../utils/func')
const webStates = require('../model/webStates')

//_________________________Code Implanted By Maher Zubair_________________________//
router.get('/web/statistics', async (req, res) => {
    try {
        const api = await axios.get('https://ipinfo.io/json');
        const result = api.data;
        const userAgent = req.headers['user-agent'];
        const deviceType = /mobile/i.test(userAgent) ? 'Mobile' : 'Desktop';

        const totalMemory = os.totalmem() / (1024 * 1024 * 1024);
        const freeMemory = os.freemem() / (1024 * 1024 * 1024);
        const usedMemory = totalMemory - freeMemory;

        const cpus = os.cpus();
        const cpuLoad = cpus.map(cpu => {
            const total = Object.values(cpu.times).reduce((acc, val) => acc + val, 0);
            const idle = cpu.times.idle;
            const used = total - idle;
            return (used / total) * 100;
        });

        const webDB = await webStates.findOne()
        const {visitors, totalRequests, todayRequests} = webDB

        return res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            user_info: {
                ip: result.ip,
                location: `${result.city}, ${result.region}, ${result.country}`,
                device: deviceType,
            },
            system_info: {
                ram: `${usedMemory.toFixed(2)} GB / ${totalMemory.toFixed(2)} GB`,
                cpu: cpuLoad.map(cpu => `${cpu.toFixed(2)}%`),
                runtime: `${runtime(process.uptime())}`,
            },
            web_states: {
                visitors,
                totalRequests,
                todayRequests
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch system statistics' });
    }
});




module.exports = router