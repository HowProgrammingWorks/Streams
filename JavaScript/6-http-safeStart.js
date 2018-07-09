'use strict';

const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

function prepareCache(callback) {
  let buffer = null;

  const rs = fs.createReadStream('index.html');
  const gs = zlib.createGzip();

  const buffers = [];

  gs.on('data', (buffer) => {
    buffers.push(buffer);
  });

  gs.once('end', () => {
    buffer = Buffer.concat(buffers);
    callback(null, buffer);
  });

  rs.on('error', (error) => {
    callback(error);
  });

  gs.on('error', (error) => {
    callback(error);
  });

  rs.pipe(gs);
}

function startServer(err, buffer) {
  if (err) {
    throw err;
  }

  const server = http.createServer((request, response) => {
    console.log(request.url);
    response.writeHead(200, { 'Content-Encoding': 'gzip' });
    response.end(buffer);
  });

  server.listen(8000);
}

prepareCache(startServer);
