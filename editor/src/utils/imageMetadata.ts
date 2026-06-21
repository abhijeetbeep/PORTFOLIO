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
  }
  
  // Fallback default aspect ratio (16:9) if parse fails
  return { width: 1920, height: 1080 };
}
