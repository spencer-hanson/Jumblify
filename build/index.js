"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const fs = require("fs");
// Create a new express application instance
const app = express();
let client_id = 'bc7420c5b36b4dbb9a94517195857c9f';
let client_secret = fs.readFileSync('.secret', 'utf8').trim();
let redirect_uri = 'http://localhost:8888';
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(8888, function () {
    console.log('Example app listening on port 8888!');
});
