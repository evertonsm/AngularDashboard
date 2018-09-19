const mongoose = require('mongoose');

var Station = mongoose.model('Station', {
    name: { type: String},
    aDate: {type: Date},
    irrigation :{type: Boolean},
    humidity: {type: Array}

});

module.exports = {Station};