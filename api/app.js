const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

module.exports = app;