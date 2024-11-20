'use strict';

const createTransform = () =>
  new TransformStream({
    start() {
      // initialization
    },
    async transform(chunk, controller) {
      const data = await chunk;
      if (data === null) {
        controller.terminate();
      } else {
        controller.enqueue(data.length);
      }
    },
    flush() {
      // finalization
    },
  });

const createWritable = () => {
  const chunks = [];
  const writableStream = new WritableStream({
    write(chunk) {
      console.log(`Value: ${chunk}`);
      chunks.push(chunk);
    },
    close() {
      console.log('Stream closed');
    },
    abort(err) {
      console.log('Stream aborted');
      console.error(err);
    },
  });
  return { writableStream, chunks };
};

const main = async () => {
  const url = 'https://developer.mozilla.org/';
  const { body } = await fetch(url);

  const transformStream = createTransform();
  console.log({ transformStream });
  const { writableStream, chunks } = createWritable();

  await body.pipeThrough(transformStream).pipeTo(writableStream);

  const total = chunks.reduce((a, b) => a + b);
  console.log(`Bytes received: ${total}`);
};

main();
