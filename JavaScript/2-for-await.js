'use strict';

const stream  = require('node:stream');

const readable = new stream.Readable();

// Write style: readable.push(data)
// Read style: AsyncIterable

readable.push('Hello ');
readable.push('World!');
readable.push(null);
//readable.emit('error', new Error('Cant generate data'));

const main = async () => {
  for await (const chunk of readable) {
    console.log({ chunk });
  }
};

main();
