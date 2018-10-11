'use strict';

const fs = require('fs');

const rs = fs.createReadStream('1-readable.js', 'utf8');
const ws = fs.createWriteStream('copy.js', 'utf8');

rs.on('data', buffer => {
  console.log(`Copy ${buffer.length} chars`);
  ws.write(buffer);
});

rs.on('end', () => {
  console.log('Done');
});
