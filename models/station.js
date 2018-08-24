const mongoose = require('mongoose');

var Station = mongoose.model('Station', {
    name: { type: String},
    aDate: {type: Date},
    humidity: { type: Array}

});

module.exports = {Station};