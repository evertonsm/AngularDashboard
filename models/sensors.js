const mongoose = require('mongoose');

var Sensors = mongoose.model('Sensors', {
    name: { type: String},
    station: {type: String},
    aDate: {type: Date},
    temperature: { type: Number},
    humidity: { type: Number}

});

module.exports = {Sensors};