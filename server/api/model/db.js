const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/userdb';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', (e) => {
    console.log('DB connected');
})

mongoose.connection.on('error', (err) => {
    console.log('Error occurred!', err);
});

require('./dbSchema');