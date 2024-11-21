'use strict';

const main = async () => {
  const url = 'https://developer.mozilla.org/';
  const response = await fetch(url);
  const { headers, body } = response;
  const reader = body.getReader();
  console.log(response.constructor.name); // Responce
  console.log(headers.constructor.name); // Headers
  console.log(body.constructor.name); // ReadableStream
  console.log(reader.constructor.name); // ReadableStreamDefaultReader

  const chunks = [];
  let done = false;
  let chunk = null;
  do {
    const record = await reader.read();
    done = record.done;
    chunk = record.value;
    const name = chunk ? chunk.constructor.name : typeof chunk;
    const length = chunk ? chunk.length : 0;
    console.log(`Chunk: ${name}, Done: ${done}, Length: ${length}`);
    if (chunk) chunks.push(chunk);
  } while (!done);

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
