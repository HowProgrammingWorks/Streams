'use strict';

const fs = require('fs');

const rs = fs.createReadStream('1-readable.js');
const ws = fs.createWriteStream('copy.js');

rs.pipe(ws);

rs.on('end', () => {
  console.log('Done');
});
