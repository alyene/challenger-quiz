const http = require('http');
const mysql = require('mysql');
const logger = require('morgan');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/dbconfig'); // Import DB Config

//Setting up Express
const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

//Create MySQL Pool
var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : config.host,
  user            : config.user,
  password        : config.password,
  database        : config.database
});


//Create Express Server
const port = 8000;
var server = app.listen(port, () => console.log('App listening on port ' + port));

//Required Exported Modules
require('./routes')(app, pool, server);
