'use strict';

const fs = require('fs');

const rs = fs.createReadStream('1-readable.js');
const ws = fs.createWriteStream('copy.js');

rs.on('readable', () => {
  const buffer = rs.read();
  if (buffer) {
    console.log('Copy ' + buffer.length + ' bytes');
    ws.write(buffer);
  }
});

rs.on('end', () => {
  console.log('Done');
});
