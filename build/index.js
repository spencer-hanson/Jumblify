"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
// Create a new express application instance
const app = express();
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    // res.send('Hello!');
});
app.listen(8888, function () {
    console.log('Example app listening on port 8888!');
});
