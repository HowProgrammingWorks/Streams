'use strict';

const main = async () => {
  const url = 'https://developer.mozilla.org/';
  const response = await fetch(url);
  const { body } = response;

  const chunks = [];
  for await (const chunk of body) {
    const name = chunk.constructor.name;
    const { length } = chunk;
    console.log(`Chunk: ${name}, Length: ${length}`);
    chunks.push(chunk);
  }

  const concatChunks = (chunks) => {
    const totalLength = chunks.reduce((s, chunk) => s + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result;
  };

  const data = concatChunks(chunks);
  console.log(`Total length: ${data.length} bytes`);
};

main();
