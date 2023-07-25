'use strict';

const fs = require('node:fs');
const stream  = require('node:stream');
const timers = require('node:timers/promises');

const createSlowStream = (delay) => {
  const options = {
    async transform(chunk, encoding, next) {
      for (const char of chunk.toString()) {
        this.push(char);
        await timers.setTimeout(delay);
      }
      next();
    }
  };
  return new stream.Transform(options);
};

const options = { encoding: 'utf8' };
const readable = fs.createReadStream('./9-slow.js', options);
const slow = createSlowStream(30);
readable.pipe(slow).pipe(process.stdout);
