'use strict';

const fs = require('fs');
const zlib = require('zlib');

const rs = fs.createReadStream('1-readable.js');
const ws = fs.createWriteStream('1-readable.js.gz');
const gs = zlib.createGzip();

rs.pipe(gs).pipe(ws);

rs.on('end', () => {
  console.log('Done');
});
