import { ImageSource } from '@rbrown/imaging';
import { BinaryWriter } from '@rbrown/io';

import { zlibFromArray } from '../zlib/index.js';
import { crc } from './crc-32.js';

const FILE_HEADER = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

const FILE_HEADER_SIZE = 8;
const LENGTH_SIZE = 4;
const TYPE_SIZE = 4;
const CRC32_SIZE = 4;

const CONTROL_STRUCTURE_SIZE = LENGTH_SIZE + TYPE_SIZE + CRC32_SIZE;

const IHDR_LENGTH = 13;
const IEND_LENGTH = 0;
const PHYS_LENGTH = 9;

const BIT_DEPTH_8 = 8;
const COLOUR_TYPE_RGBA = 6;
const COMPRESSION_METHOD_0 = 0;
const FILTER_METHOD_0 = 0;
const FILTER_TYPE_0 = 0;
const INTERLACE_TYPE_NULL = 0;
const PHYS_UNIT_UNKNOWN = 0;

function pngFilterImage(image: ImageSource): Uint8Array {
  const { pixelWidth: width, pixelHeight: height } = image;

  const filteredSize = height * (1 + 4 * width);

  // The rgba are written out in big endian order
  const view = new BinaryWriter(filteredSize, false);

  for (let y = 0; y < height; y += 1) {
    view.u8(FILTER_TYPE_0);
    for (let x = 0; x < width; x += 1) {
      view.u32(image.getPixel(x, y));
    }
  }

  return view.written();
}

export function pngCreateImage(image: ImageSource) {
  const filteredImage = pngFilterImage(image);
  const imageData = zlibFromArray(filteredImage);

  const idatLength = imageData.length;
  const size =
    FILE_HEADER_SIZE +
    (CONTROL_STRUCTURE_SIZE + IHDR_LENGTH) +
    (CONTROL_STRUCTURE_SIZE + idatLength) +
    (CONTROL_STRUCTURE_SIZE + PHYS_LENGTH) +
    (CONTROL_STRUCTURE_SIZE + IEND_LENGTH);

  const writer = new BinaryWriter(size, false); // big endian

  writer.u8a(FILE_HEADER);

  writer.u32(IHDR_LENGTH);
  const ihdrStart = writer.tell();
  writer.string('IHDR');
  writer.u32(image.pixelWidth);
  writer.u32(image.pixelHeight);
  writer.u8(BIT_DEPTH_8);
  writer.u8(COLOUR_TYPE_RGBA);
  writer.u8(COMPRESSION_METHOD_0);
  writer.u8(FILTER_METHOD_0);
  writer.u8(INTERLACE_TYPE_NULL);
  const ihdrEnd = writer.tell();
  writer.u32(crc(writer.raw().subarray(ihdrStart, ihdrEnd)));

  writer.u32(PHYS_LENGTH);
  const physStart = writer.tell();
  writer.string('pHYs');
  writer.u32(image.xDpi);
  writer.u32(image.yDpi);
  writer.u8(PHYS_UNIT_UNKNOWN);
  const physEnd = writer.tell();
  writer.u32(crc(writer.raw().subarray(physStart, physEnd)));

  writer.u32(idatLength);
  const idatStart = writer.tell();
  writer.string('IDAT');
  writer.u8a(imageData);
  const idatEnd = writer.tell();
  writer.u32(crc(writer.raw().subarray(idatStart, idatEnd)));

  writer.u32(IEND_LENGTH);
  const iendStart = writer.tell();
  writer.string('IEND');
  const iendEnd = writer.tell();
  writer.u32(crc(writer.raw().subarray(iendStart, iendEnd)));

  return writer.written();
}
