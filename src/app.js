const express = require('express');

const { verify } = require('./routes');

const app = express();
app.use(express.json());

app.use(verify);

module.exports = app;
