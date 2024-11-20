'use strict';

const fs = require('node:fs');
const stream = require('node:stream');

async function* dup(char, size) {
  let counter = 0;
  while (counter++ < size) {
    // throw new Error('Error generating data');
    yield char;
  }
}

const readable = stream.Readable.from(dup('A', 1_000_000));
const writable = fs.createWriteStream('data.tmp');

readable.on('data', (data) => {
  writable.write(data);
});

readable.on('error', (error) => {
  console.log({ readable: error });
});

writable.on('error', (error) => {
  console.log({ writable: error });
});
