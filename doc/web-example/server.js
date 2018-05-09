const proxy = require('express-http-proxy');
const express = require('express')
const app = express()
const path = require('path');

// Serve demo index.html file
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Serve deepdetect.min.js library
app.use(express.static('dist'));

// Proxy /api alls to deepdetect server
app.use('/api', proxy('http://localhost:8580'));

// Serve http demo on port 3000
app.listen(3000, function () {
  console.log('Example app running: http://localhost:3000')
})

