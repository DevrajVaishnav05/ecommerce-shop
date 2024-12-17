const mongoose = require('mongoose');
// const dbgr = require('dbgr');
     .then(function(){
        console.log("Connected to MongoDB");
    })
    .catch(function(err){
        console.log("MongoDB connection error:", err);
    });

module.exports = mongoose.connection;
