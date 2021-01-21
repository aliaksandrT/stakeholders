const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const connection = require('./config/db');
const shareholdersRoutes = require('./shareholders.routes');

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(shareholdersRoutes(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});