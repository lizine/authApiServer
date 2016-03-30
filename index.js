const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
// App setup
app.use(morgan('combined')); //middleware, morgan is a logging framework
app.use(bodyParser.json({type: '*/*'})); //mw for parsing json
router(app);
//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on', port);
