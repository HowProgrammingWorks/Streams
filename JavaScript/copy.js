'use strict';

const fs = require('fs');

const rs = fs.createReadStream('1-readable.js', 'utf8');

rs.on('readable', () => {
  console.log('readable');
  const buffer = rs.read();
  if (buffer) {
    console.dir({ buffer });
  }
});

rs.on('data', chunk => {
  console.log('data');
  console.log({ chunk });
});
