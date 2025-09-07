// uploadFile.js
import fs from 'fs';
import crypto from 'crypto';
import { ethers } from 'ethers';

// -------- CONFIG -------- //
const filePath = "C:\\Users\\USER\\0g-storage-ts-starter-kit\\test.txt";
const privateKey = "07433f05615ecdb18fbb5130991871fc966f23c7630b83393ff73b2f490aa6d8";
const rpcUrl = "https://evmrpc-testnet.0g.ai"; // 0G testnet RPC
const contractAddress = "0x3A0d1d67497Ad770d6f72e7f4B8F0BAbaa2A649C"; // 0G Storage Mine contract
const tags = "0x"; // optional
// ------------------------ //

// Read file and generate root hash
const fileBuffer = fs.readFileSync(filePath);
const rootHash = "0x" + crypto.createHash('sha256').update(fileBuffer).digest('hex');
console.log("File root hash:", rootHash);

// Read ABI from JSON file
const abi = JSON.parse(fs.readFileSync('D:\\0g-compute-ts-starter-kit\\storageABI.json', 'utf8'));


// Connect to provider and wallet
const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Connect to contract
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Upload root to blockchain
async function uploadFile() {
    try {
        const tx = await contract.uploadFile(rootHash, tags);
        console.log("Transaction sent! Hash:", tx.hash);
        console.log("Waiting for confirmation...");
        const receipt = await tx.wait();
        console.log("Transaction confirmed! Block number:", receipt.blockNumber);
    } catch (err) {
        console.error("Error uploading file:", err);
    }
}

uploadFile();
