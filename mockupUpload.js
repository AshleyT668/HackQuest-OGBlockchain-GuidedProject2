import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

// Path to your file
const filePath = path.resolve('./test.txt');

// Function to generate a root hash (SHA256)
function generateRootHash(fileBuffer) {
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    return '0x' + hash.digest('hex');
}

async function mockUpload() {
    try {
        // Read file
        const fileBuffer = fs.readFileSync(filePath);
        console.log(`File size: ${fileBuffer.length} bytes`);

        // Generate root hash
        const rootHash = generateRootHash(fileBuffer);
        console.log(`Mock upload successful!`);
        console.log(`File root hash: ${rootHash}`);

        // Simulate other metadata
        const fees = 0.000000596; // OG placeholder
        console.log(`Fees (simulated): ${fees} OG`);

    } catch (err) {
        console.error('Error during mock upload:', err.message);
    }
}

// Run the mock upload
mockUpload();
