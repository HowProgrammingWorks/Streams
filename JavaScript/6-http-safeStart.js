'use strict';

const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

let buffer;

function prepareCash() {
  const rs = fs.createReadStream('index.html');
  const gs = zlib.createGzip();

  const buffers = [];

  gs.on('data', (buffer) => {
    buffers.push(buffer);
  });

  gs.on('end', () => {
    buffer = Buffer.concat(buffers);
    startServer();
  });

  rs.pipe(gs);
}

function startServer() {
  const server = http.createServer((request, response) => {
    console.log(request.url);
    response.writeHead(200, { 'Content-Encoding': 'gzip' });
    response.end(buffer);
  });

  server.listen(8080);
}

prepareCash();
