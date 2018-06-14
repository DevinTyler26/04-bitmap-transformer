'use strict';

const Bitmap = module.exports = class {
    constructor(buffer){
        const fileSizeOffset = 2;
        const bitmapWidth = 18;
        const bitmapHeight = 20;
        const colorTableLength = 1078;
        const colorTableOffset;

        this.fileSize = buffer.readUint16LE(fileSizeOffset);
        this.height = buffer.readUint16LE(bitmapHeight);
        this.width = buffer.readUint16LE(bitmapWidth);
    }

    //possible methods
    //greyscale
    //invert colors
    //flip image
    //rotate image
};