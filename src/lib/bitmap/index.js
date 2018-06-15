'use strict';

const readWrite = require('../read-write');

class Bitmap {
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
    this.header.size = buffer.readUnit16LE(SIZE);
    this.header.startOfPix = buffer.readUnit16LE(PX_START);
    this.header.reserved1 = buffer.readUnit16LE(RESERVED_1);
    this.header.reserved2 = buffer.readUnit16LE(RESERVED_2);
    this.header.sizeOfHeader = buffer.readUnit16LE(HEADER_SIZE);
    this.header.width = buffer.readUnit16LE(WIDTH);
    this.header.height = buffer.readUnit16LE(HEIGHT);
    this.header.bitsPerPx = buffer.readUnit16LE(BITS_PER_PX);
    this.header.compression = buffer.readUnit16LE(COMPRESSION);
    this.header.imgSize = buffer.readUnit16LE(IMG_SIZE);
    this.header.horRes = buffer.readUnit16LE(HOR_RES);
    this.header.verRes = buffer.readUnit16LE(VER_RES);
    this.header.paletteSize = buffer.readUnit16LE(PAL_SIZE);
    this.header.paletteOffset = PALETTE_OFFS;
    this.header.paletteLength = (this.header.startOfPix - this.header.paletteOffset) / 4;
    this.header.pixelDataRowSize = (this.header.bitsPerPx / 8) * this.header.width;
    this.header.pixelArraySize = this.header.pixelDataRowSize * this.header.height;
    this.palette = [];
    this.pixelData = [];
    this.pixelGrid = [];
  }
}
module.exports = Bitmap();
