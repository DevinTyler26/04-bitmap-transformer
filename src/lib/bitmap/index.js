'use strict';

const readWrite = require('../read-write'); //eslint-disable-line
const fs = require('fs'); //eslint-disable-line

const Bitmap = module.exports = class { //eslint-disable-line
  constructor(buffer) {
    const SIZE = 2;
    const RESERVED_1 = 6;
    const RESERVED_2 = 8; 
    const PX_START = 10; 
    const HEADER_SIZE = 14;
    const WIDTH = 18;
    const HEIGHT = 22;
    const BITS_PER_PX = 28;
    const COMPRESSION = 30;
    const IMG_SIZE = 34;
    const HOR_RES = 38;
    const VER_RES = 42;
    const PAL_SIZE = 46;
    const PALETTE_OFFS = 54;

    this.buffer = buffer;
    this.header = {};
    this.header.type = buffer.toString('utf-8', 0, 2);
    if (this.header.type !== 'BM') {
      throw new Error('This is not a Bitmap file!');
    }
    this.header.size = buffer.readUInt16LE(SIZE);
    this.header.startOfPix = buffer.readUInt16LE(PX_START);
    this.header.reserved1 = buffer.readUInt16LE(RESERVED_1);
    this.header.reserved2 = buffer.readUInt16LE(RESERVED_2);
    this.header.sizeOfHeader = buffer.readUInt16LE(HEADER_SIZE);
    this.header.width = buffer.readUInt16LE(WIDTH);
    this.header.height = buffer.readUInt16LE(HEIGHT);
    this.header.bitsPerPx = buffer.readUInt16LE(BITS_PER_PX);
    this.header.compression = buffer.readUInt16LE(COMPRESSION);
    this.header.imgSize = buffer.readUInt16LE(IMG_SIZE);
    this.header.horRes = buffer.readUInt16LE(HOR_RES);
    this.header.verRes = buffer.readUInt16LE(VER_RES);
    this.header.paletteSize = buffer.readUInt16LE(PAL_SIZE);
    this.header.paletteOffset = PALETTE_OFFS;
    this.header.paletteLength = (this.header.startOfPix - this.header.paletteOffset) / 4;
    this.header.pixelDataRowSize = (this.header.bitsPerPx / 8) * this.header.width;
    this.header.pixelArraySize = this.header.pixelDataRowSize * this.header.height;
    this.palette = [];
    this.pixelData = [];
    this.pixelGrid = [];
    this.loadPixelData();
    this.loadPixelGrid();
  }

  loadPixelData() {
    let offset = this.header.startOfPix;

    for (let i = 0; i < this.header.pixelArraySize / 4; i++) {
      const b = this.buffer.readUInt8(offset);
      const g = this.buffer.readUInt8(offset + 1);
      const r = this.buffer.readUInt8(offset + 2);
      const a = this.buffer.readUInt8(offset + 3);
      this.pixelData.push(b);
      this.pixelData.push(g);
      this.pixelData.push(r);
      this.pixelData.push(a);
      offset += 4;
    }
  }

  loadPixelGrid() {
    const offset = this.header.startOfPix; //eslint-disable-line
    let x = 0;
    const y = 0;

    for (let i = 0; i < this.header.pixelArraySize; i += 4) {
      if (this.pixelGrid[y] === undefined) this.pixelGrid[y] = [];

      const b = this.pixelData[i];
      const g = this.pixelData[i + 1];
      const r = this.pixelData[i + 2];
      this.pixelGrid[y].push([b, g, r, 0]);
      x + 1; //eslint-disable-line

      if (x % (this.header.pixelDataRowSize / 4) === 0) {
        x = 0;
        y + 1; //eslint-disable-line
      }
    }
  }

  // copy() {
  //   const newColorTable = this.;

  //   const newBuffer = Buffer.fill([
  //     this.
  //   ])
  // }
};
