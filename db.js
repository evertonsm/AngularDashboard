const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dashboard',useNewUrlParser:true,(err) => {

    if(!err)
        console.log('MongoDB connection succeeded...');

    else   
    console.log('Error in Db connection:' + JSON.stringify(err, undefined,2));

});

module.exports = mongoose;