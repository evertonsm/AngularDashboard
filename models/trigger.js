const mongoose = require('mongoose');

var Trigger = mongoose.model('Trigger', {
    name: { type: String},
    station: {type: String},
    isActive: {type: Boolean}    
});

module.exports = {Trigger};