const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/Rush_Development');

const db = mongoose.connection;

db.on('error' , console.error.bind(console , "Error connecting to MongoDB"));

db.once('open' , function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;