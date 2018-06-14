'use strict';

const os = require('os');

console.log(os.endianness());

const buf = Buffer.from('TestScript');

console.log(buf);

for (let i = 0; i < buf.length; i += 4) {
  buf[i] += 6;
}

console.log(buf);
console.log(buf.toString());

console.log(buf.readUInt8(0));

console.log(buf.readUInt16LE(5));
