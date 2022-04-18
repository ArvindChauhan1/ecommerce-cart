const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

const product = require('./routes/Router')

app.use("/api/v1", product)

module.exports = app;