'use strict';

const fs = require('fs');

const RW = module.exports = {};

// make a function to hook up read to empty object
RW.read = function (filePath, callback) { //eslint-disable-line
  fs.readFile(filePath, (err, data) => {
    if (err) callback(err); 
    callback(null, data);
  }); 
};

// make a function to hook up write to empty object
RW.write = function (filePath, buffer, callback) { //eslint-disable-line
  fs.writeFile(filePath, buffer, (err) => {
    if (err) throw err;
    callback(null, buffer);
  });
};

// RW.read('../../assets/bitmap.bmp', (err, data) => {
//   if (err) throw err;
//   console.log('return from READ', data);
//   return data;
// });

// RW.write('../../assets/new.txt', 'hello', (err) => {
//   if (err) throw err;
//   console.log('return from WRITE');
// });
