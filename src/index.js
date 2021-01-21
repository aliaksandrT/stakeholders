const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const connection = require('./config/db');
const sholdersRoutes = require('./sholders.routes');

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(sholdersRoutes(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});