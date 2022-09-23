'use strict';

const fs = require('node:fs');

const rs = fs.createReadStream('1-readable.js', 'utf8');
const ws = fs.createWriteStream('copy.js', 'utf8');

rs.pipe(ws);

rs.on('end', () => {
  console.log('Done');
});
