import fs from 'fs';
import path from 'path';

export interface ImageDimensions {
  width: number;
  height: number;
}

export function getImageDimensions(filePath: string): ImageDimensions {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.png') {
    if (buffer.length < 24) throw new Error('Invalid PNG file');
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  } else if (ext === '.jpg' || ext === '.jpeg') {
    let offset = 2; // skip SOI marker (0xFFD8)
    while (offset < buffer.length) {
      if (offset + 1 >= buffer.length) break;
      const marker = buffer.readUInt16BE(offset);
      offset += 2;

      // SOF0 (0xFFC0) or SOF2 (0xFFC2) contain image dimensions
      if (marker === 0xFFC0 || marker === 0xFFC2) {
        if (offset + 7 > buffer.length) break;
        const height = buffer.readUInt16BE(offset + 3);
        const width = buffer.readUInt16BE(offset + 5);
        return { width, height };
      }

      if (offset + 2 > buffer.length) break;
      const length = buffer.readUInt16BE(offset);
      offset += length;
    }
  } else if (ext === '.webp') {
    if (buffer.length < 30) throw new Error('Invalid WEBP file');
    const riff = buffer.toString('ascii', 0, 4);
    const signature = buffer.toString('ascii', 8, 12);
    if (riff === 'RIFF' && signature === 'WEBP') {
      const type = buffer.toString('ascii', 12, 16);
      if (type === 'VP8 ') {
        const width = buffer.readUInt16LE(26) & 0x3FFF;
        const height = buffer.readUInt16LE(28) & 0x3FFF;
        return { width, height };
      } else if (type === 'VP8L') {
        const b1 = buffer[21];
        const b2 = buffer[22];
        const b3 = buffer[23];
        const b4 = buffer[24];
        const width = 1 + ((b1 | (b2 << 8)) & 0x3FFF);
        const height = 1 + (((b2 >> 6) | (b3 << 2) | (b4 << 10)) & 0x3FFF);
        return { width, height };
      } else if (type === 'VP8X') {
        const width = 1 + buffer.readUIntLE(24, 3);
        const height = 1 + buffer.readUIntLE(27, 3);
        return { width, height };
      }
    }
  }
  
  // Fallback default aspect ratio (16:9) if parse fails
  return { width: 1920, height: 1080 };
}
