'use strict';

const fs = require('node:fs');
const streams = require('node:stream/promises');
const zlib = require('node:zlib');

const main = async () => {
  const readable = fs.createReadStream('data.tmp');
  const writable = fs.createWriteStream('data.gz');
  const gzip = zlib.createGzip();
  const options = { signal: AbortSignal.timeout(20) };
  await streams.pipeline(readable, gzip, writable, options);
  console.log('Done');
};

main();
