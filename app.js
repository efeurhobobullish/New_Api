const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require("cors");
const webStates = require('./model/webStates');
const app = express();
const cron = require('node-cron')
const PORT = process.env.PORT || 8081;

//_________________________Code Implanted By Maher Zubair_________________________//
// Connect MongoDB
mongoose.set("strictQuery", false);
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://salman:ahmad@cluster0.gjslz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.error('Failed to Connect to MongoDB:', e);
    });

// Count Visitors
app.use((req, res, next) => {

    const pagesToCount = ['/', '/downloader'];

    const urlPath = req.url;

    if (pagesToCount.includes(urlPath)) {
        webStates.findOneAndUpdate(
            {},
            { $inc: { visitors: 1 } },
            { upsert: true, new: true },
            (err, doc) => {
                if (err) {
                    console.error('Error updating visitor count:', err);
                }
            }
        );
    }

    next();
});

// Requests Count
async function requestsCount() {
    try {
        await webStates.updateOne({}, { $inc: { todayRequests: 1, totalRequests: 1 } });
    } catch (error) {
        console.error('Failed to update request counts:', error);
    }
}
const countMiddleware = async (req, res, next) => {
    if (req.path.startsWith('/api')) {
        await requestsCount();
    }
    next();
};

// Reset Today Requests
async function ResetRequestToday() {
    await webStates.updateOne({}, { todayRequests: 0 });
    console.log("REQUESTS TODAY RESET SUCCESSFULLY");
}
cron.schedule(
    "0 0 * * *",
    () => {
        ResetRequestToday();
    },
    {
        scheduled: true,
        timezone: "Asia/Karachi",
    }
);

//________________________________END___________________________

// App Configuration  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/site', express.static('static'));
app.use(cors());
app.set('json spaces', 2);
app.use(countMiddleware);

//======================== APIs Routes ============================
const scraperRoutes = require('./routes/downloaderRoutes');
const searchRoutes = require('./routes/searchRoutes');
const wallpaperRoutes = require('./routes/wallpaperRoutes');
const textProRoutes = require('./routes/textProRoutes');
const stalkerRoutes = require('./routes/stalkerRoutes');
const aiRoutes = require('./routes/aiRoutes');
const newsRoutes = require('./routes/newsRoutes');
const animeRoutes = require('./routes/animeRoutes');
const detailRoutes = require('./routes/detailRoutes');
const statistics = require('./routes/main')


//======================== API Routes ============================
app.use('/api/details', detailRoutes);
app.use('/api/downloader', scraperRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/wallpaper', wallpaperRoutes);
app.use('/api/textpro', textProRoutes);
app.use('/api/stalker', stalkerRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/anime', animeRoutes);
app.use('/', statistics)

//======================== Api Files ============================
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "./site/index.html"));
});
app.get("/ai", (req, res) => res.sendFile(path.join(__dirname, "./site/ai.html")));
app.get("/anime", (req, res) => res.sendFile(path.join(__dirname, "./site/anime.html")));
app.get("/changelog", (req, res) => res.sendFile(path.join(__dirname, "./site/changelog.html")));
app.get("/details", (req, res) => res.sendFile(path.join(__dirname, "./site/details.html")));
app.get("/downloader", (req, res) => res.sendFile(path.join(__dirname, "./site/downloader.html")));
app.get("/islamic", (req, res) => res.sendFile(path.join(__dirname, "./site/islamic.html")));
app.get("/misc", (req, res) => res.sendFile(path.join(__dirname, "./site/misc.html")));
app.get("/news", (req, res) => res.sendFile(path.join(__dirname, "./site/news.html")));
app.get("/search", (req, res) => res.sendFile(path.join(__dirname, "./site/search.html")));
app.get("/stalker", (req, res) => res.sendFile(path.join(__dirname, "./site/stalker.html")));
app.get("/converter", (req, res) => res.sendFile(path.join(__dirname, "./site/converter.html")));
app.get("/wallpaper", (req, res) => res.sendFile(path.join(__dirname, "./site/wallpaper.html")));

//======================== Miscellaneous ===========================
/*
const allowedOrigins = [
    'https://salman-ahmad-api.vercel.app',
    'https://api.ahmmikun.live'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by Cors!'));
        }
    },
};

app.use(cors(corsOptions));

*/

//======================== Error Handler ============================

app.use((err, req, res, next) => {
    res.status(500).json({
        Founder: "AHMMI-KUN",
        company: "Xlicon Botz Inc",
        data: {
            status: false,
            message: err.message || 'Internal Server Error',
        },
    });
});

//======================== Start Server ============================
app.listen(PORT, () => {
    console.log(`API running on: http://localhost:${PORT}`);
});
