'use strict';

const fs = require('fs');

const rs = fs.createReadStream('1-readable.js');

rs.on('readable', () => {
  const buffer = rs.read();
  if (buffer) {
    console.log(buffer);
    console.log(buffer.toString());
  }
});
