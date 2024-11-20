'use strict';

const createWritable = () => {
  const chunks = [];
  const writableStream = new WritableStream({
    write(chunk) {
      console.log(`Chunk length: ${chunk.length}`);
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

  const { writableStream, chunks } = createWritable();
  await body.pipeTo(writableStream);
  console.log(`Chunks received: ${chunks.length}`);
};

main();
