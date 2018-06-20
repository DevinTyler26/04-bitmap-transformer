'use strict';

const fs = require('fs');

const Bitmap = require('../bitmap');

const RW = module.exports = {};

// make a function to hook up read to empty object
RW.read = function (filePath, callback) { //eslint-disable-line
  fs.readFile(filePath, (err, data) => {
    if (err) callback(err); 
    const bmpData = new Bitmap(data);
    callback(null, bmpData);
    // console.log(bmpData);
  }); 
};

// make a function to hook up write to empty object
RW.write = function (filePath, buffer, callback) { //eslint-disable-line
  fs.writeFile(filePath, buffer, (err) => {
    if (err) throw err;
    callback(null, buffer);
  });
};

RW.read('../../assets/bitmap.bmp', (err, data) => {
  if (err) throw err;
  console.log('return from READ', data);
  const color = data.buffer.slice(data.header.paletteOffset);
  color.fill(255);
  RW.write('../../assets/colorWhite.bmp', data.buffer, (err2) => {
    if (err2) throw err2;
    console.log('return from WRITE');
  });
  return data;
});
