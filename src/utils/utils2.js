import { HDNode } from '@ethersproject/hdnode';
import { ethers } from 'ethers';

const mnemonic = 'family ahead layer marble chat clever genre park corn anxiety debris stand'; 

// Create an HDNode from the mnemonic
const hdNode = HDNode.fromMnemonic(mnemonic);

// Get the first child account (m/44'/60'/0'/0/0) - standard derivation path for Ethereum
const account = hdNode.derivePath("m/44'/60'/0'/0/0"); 

// Get the private key 
const privateKey = account.privateKey;

// Create a wallet from the private key
const wallet = new ethers.Wallet(privateKey); 

// Get the public address
const address = wallet.address;

console.log("Address:", address); 