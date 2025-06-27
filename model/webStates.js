//_________________________Code Implanted By Maher Zubair_________________________//
const mongoose = require('mongoose');

//web server state schema
const webStateSchema = new mongoose.Schema({
    visitors: {
        type: Number,
        default: 0
    },
    totalRequests: {
        type: Number,
        default: 0
    },
    todayRequests: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('webState', webStateSchema);
