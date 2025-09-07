import fs from 'fs';
import crypto from 'crypto';

const filePath = "C:\\Users\\USER\\0g-storage-ts-starter-kit\\test.txt";
const fileBuffer = fs.readFileSync(filePath);
const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

console.log("File root hash:", hash);
