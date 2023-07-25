'use strict';

const fs = require('node:fs');

// Contracts:
// - Readable
// - EventEmitter
// - AsyncIterator

const readable = fs.createReadStream('1-readable.js');

// Styles generating data:
// - fs.createReadStream or other API
// - readable.push()
// - Readable.from(async function *)
// - Readable.from(string or Buffer)

readable.on('error', (error) => {
  console.log({ error });
});

readable.on('end', () => {
  console.log({ event: 'end' });
});

readable.on('close', () => {
  console.log({ event: 'close' });
});

// Styles of reading data from streams:
// - on('data')
// - on('readable')
// - .pipe()
// - AsyncIterable

// Style: on('data')

readable.on('data', (chunk) => {
  console.log({ data: chunk });
});

// Style: on('readable')

readable.on('readable', () => {
  let data = readable.read();
  console.log({ event: 'readable' });
  while (data !== null) {
    console.log({ readable: data });
    data = readable.read();
  }
});
