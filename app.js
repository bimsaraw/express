const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/exampleDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(routes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});