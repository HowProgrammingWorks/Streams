'use strict';

const fs = require('node:fs');
const zlib = require('node:zlib');
const http = require('node:http');

const rs = fs.createReadStream('index.html');
const gs = zlib.createGzip();

const buffers = [];
let buffer = null;

gs.on('data', (buffer) => {
  buffers.push(buffer);
});

gs.on('end', () => {
  buffer = Buffer.concat(buffers);
});

rs.pipe(gs);

const server = http.createServer((request, response) => {
  console.log(request.url);
  response.writeHead(200, { 'Content-Encoding': 'gzip' });
  response.end(buffer);
});

server.listen(8000);
