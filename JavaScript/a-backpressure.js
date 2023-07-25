'use strict';

const fs = require('node:fs');

const readable = fs.createReadStream('./data.tmp', { highWaterMark: 12345 });
const writable = fs.createWriteStream('./copy.tmp', { highWaterMark: 54321 });

readable.on('data', (chunk) => {
  console.log(`Write: ${chunk.length} bytes`);
  const canWrite = writable.write(chunk);
  if (!canWrite) {
    console.log('Pause reabable due to backpressure');
    readable.pause();
  }
});

writable.on('drain', () => {
  console.log('Event drain: resume readable');
  readable.resume();
});

readable.on('end', () => {
  writable.end();
});

writable.on('finish', () => {
  console.log('Done');
});
