'use strict';

const fs = require('node:fs');
const stream = require('node:stream');

const readable = fs.createReadStream('data.tmp');
const writable = new stream.Writable({
  write(chunk, encoding, next) {
    console.log({ size: chunk.length, encoding, next });
    //next(new Error('Error flushing data'));
    next();
  },
});

readable.pipe(writable);

readable.on('end', () => {
  console.log('Done');
});
