//Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express();

// mongodb connection
mongoose.connect("mongodb://localhost:27017/property");
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

app.use(session({
  secret: 'property',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db    
  })
}));

// API Routes
const api = require('./server/routes/api');


// Parsers for data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Point static path to dist 
app.use(express.static(path.join(__dirname, 'dist')));

//Set api routes
app.use('/api', api);

// Catch all other routes and return the index file 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist'));
});

// Get port from env 
const port = process.env.PORT || '3000';
app.set('port', port);

// HTTP Server
const server = http.createServer(app);

// List on port
server.listen(port, () => console.log(`API running on localhost:${port}`));

