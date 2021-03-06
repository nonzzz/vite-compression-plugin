import { createReadStream, createWriteStream } from 'fs'
import type { Compress } from './interface'

export const transfer = (entry: string, to: string, compress: Compress): Promise<number> => {
  const len = []
  return new Promise((resolve, reject) => {
    createReadStream(entry)
      .pipe(compress)
      .on('data', (chunk) => len.push(chunk))
      .pipe(createWriteStream(to))
      .on('close', () => resolve(Buffer.concat(len).byteLength))
      .on('error', reject)
  })
}
