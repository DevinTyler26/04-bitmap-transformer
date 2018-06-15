'use strict';

const fs = require('fs');
const bitmap = require('./bitmap');
const bitmapTransformer = require('bmp-transform');

const bitmap = module.exports = {}

function (image, transform) {
  const headers = getHeader(image);

  if (headers.type !== 'BM' && headers.type !== 'BA') {
    return console.log('Note a BM or BA type BMP');
  }

  const newImage = new Buffer(image);
}











// fs.readFile('bitmap.bmp', (err, data) => {
//   if (err) return console.log(err);
//   const transformed = colorChanger(data);

//   fs.writeFile('newBitmap.bmp', err, transformed => {
//   return console.log(err);
// });
