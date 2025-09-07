import { Indexer, ZgFile } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();
// Load env vars
const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const indexerUrl = process.env.INDEXER_URL;
// Initialize provider and signer
const provider = new ethers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);
// Initialize indexer
const indexer = new Indexer(indexerUrl);
// Local file path (make sure this file exists)
const filePath = "test.txt";
// Build file and Merkle tree
const zgFile = await ZgFile.fromFilePath(filePath);
const [tree, errTree] = await zgFile.merkleTree();
if (errTree)
    throw errTree;
// Upload the file
const [txHash, errUpload] = await indexer.upload(zgFile, rpcUrl, signer);
if (errUpload)
    throw errUpload;
const root = tree.rootHash();
console.log('✅ Upload complete');
console.log('   • Root Hash:', root);
console.log('   • Tx Hash:  ', txHash);
