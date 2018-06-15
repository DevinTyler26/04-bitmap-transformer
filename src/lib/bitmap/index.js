'use strict';

const readWrite = require('../read-write');
const headerInfo = require('../header');

class Bitmap {
  constructor(buffer) {
    this.buffer = buffer;
    this.header = {};
    this.header.type = buffer.toString('utf-8', 0, 2);
    if (this.header.type !== 'BM') {
      throw new Error('This is not a Bitmap file!');
    }
    this.header.size = buffer.readUnit16LE(headerInfo.SIZE);
    this.header.startOfPix = buffer.readUnit16LE(headerInfo.PX_Start);
    this.header.reserved1 = buffer.readUnit16LE(headerInfo.RESERVED_1);
    this.header.reserved2 = buffer.readUnit16LE(headerInfo.RESERVED_2);
    this.header.sizeOfHeader = buffer.readUnit16LE(headerInfo.HEADER_SIZE);
    this.header.width = buffer.readUnit16LE(headerInfo.WIDTH);
    this.header.height = buffer.readUnit16LE(headerInfo.HEIGHT);
    this.header.bitsPerPx = buffer.readUnit16LE(headerInfo.BITS_PER_PX);
    this.header.compression = buffer.readUnit16LE(headerInfo.COMPRESSION);
    this.header.imgSize = buffer.readUnit16LE(headerInfo.IMG_SIZE);
    this.header.horRes = buffer.readUnit16LE(headerInfo.HOR_RES);
    this.header.verRes = buffer.readUnit16LE(headerInfo.VER_RES);
    this.header.paletteSize = buffer.readUnit16LE(headerInfo.PAL_SIZE);
    this.header.paletteOffset = headerInfo.PALETTE_OFFS;
    this.header.paletteLength = (this.header.startOfPix - this.header.paletteOffset) / 4;
    this.header.pixelDataRowSize = (this.header.bitsPerPx / 8) * this.header.width;
    this.header.pixelArraySize = this.header.pixelDataRowSize * this.header.height;
    this.palette = [];
    this.pixelData = [];
    this.pixelGrid = [];
  }
}

