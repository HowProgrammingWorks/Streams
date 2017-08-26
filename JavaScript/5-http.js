'use strict';

const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

const rs = fs.createReadStream('1-readable.js');
const gs = zlib.createGzip();

var buffers = [];
let buffer;

gs.on('data', function(buffer) {
  buffers.push(buffer);
});

gs.on('end', function() {
  buffer = Buffer.concat(buffers);
});

rs.pipe(gs);

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Encoding': 'gzip' });
  response.end(buffer);
});

server.listen(8080);
