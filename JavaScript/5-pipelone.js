'use strict';

const fs = require('node:fs');
const streams = require('node:stream/promises');
const zlib = require('node:zlib');

const main = async () => {
  const readable = fs.createReadStream('data.tmp');
  const writable = fs.createWriteStream('data.gz');
  const gzip = zlib.createGzip();
  const ac = new AbortController();
  const timeout = setTimeout(() => {
    ac.abort();
  }, 2000);
  const options = { signal: ac.signal };
  await streams.pipeline(readable, gzip, writable, options);
  clearTimeout(timeout);
  console.log('Done');
};

main();
