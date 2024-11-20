'use strict';

const stream = require('node:stream');

const ENTER = 13;

const createBufferedStream = () => {
  const buffers = [];
  const writable = new stream.Writable({
    write(chunk, encoding, next) {
      buffers.push(chunk);
      next();
    },
    final(done) {
      const result = Buffer.concat(buffers);
      this.emit('result', result);
      done();
    },
  });
  return writable;
};

const lines = createBufferedStream();

lines.on('result', (result) => {
  console.log({ result });
});

process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
  const key = data[0];
  if (key === ENTER) {
    lines.write(data);
    if (lines.writableCorked === 1) lines.uncork();
    lines.end();
    process.exit(0);
  } else {
    if (lines.writableCorked === 0) lines.cork();
    lines.write(data);
  }
  process.stdout.write(data);
});
