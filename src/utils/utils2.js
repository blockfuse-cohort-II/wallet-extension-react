import { ethers, TransactionResponse } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";

export function savePassword(password) {
  if (!password) throw new Error("Password cannot be empty");
  localStorage.setItem("password", password);
}

export function validatePassword(password) {
  return localStorage.getItem("password") === password;
}

export function generateSeedPhrase() {
  const wallet = ethers.Wallet.createRandom();
  if (!wallet.mnemonic) throw new Error("Failed to generate mnemonic");
  return wallet.mnemonic.phrase;
}

export function getAddressFromSeedPhrase(seedPhrase) {
  const wallet = ethers.Wallet.fromPhrase(seedPhrase);
  return wallet.address;
}

export async function sendEther(
  senderPrivateKey,
  recipientAddress,
  amountInEther,
  networkChainId,
  providerUrl
) {
  const provider = new ethers.JsonRpcProvider(providerUrl, networkChainId);
  const wallet = new ethers.Wallet(senderPrivateKey, provider);
  const tx = {
    to: recipientAddress,
    value: ethers.parseEther(amountInEther),
  };
  return await wallet.sendTransaction(tx);
}

export async function getBalance(
  address,
  networkChainId,
  providerUrl
) {
  const provider = new ethers.JsonRpcProvider(providerUrl, networkChainId);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

export async function listAccounts(providerUrl) {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const res = await provider.listAccounts();
  console.log(res);
  return res;
}

export function persistSelectedNetwork(name) {
  localStorage.setItem("selectedNetwork", name);
}

export function getSelectedNetwork() {
  return localStorage.getItem("selectedNetwork") ?? "mainnet";
}

/*export interface NetworkConfig {
  name: string;
  rpcUrl: string;
  chainId: number;
  symbol?: string; // Ξ (Ethereum)
}*/

const alchemyNetworks = {
  mainnet: Network.ETH_MAINNET,
  polygon: Network.MATIC_MAINNET,
  bsc: Network.BNB_MAINNET,
  sepolia: Network.ETH_SEPOLIA,
};

const defaultNetworks = {
  mainnet: {
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/1cef973dff844ba09dea342050cd5967",
    chainId: 1,
    symbol: "\u039E",
  },
  polygon: {
    name: "Polygon Mainnet",
    rpcUrl: "https://polygon-rpc.com",
    chainId: 137,
    symbol: "\u039E",
  },
  bsc: {
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    symbol: "\u0024",
  },
  sepolia: {
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/1cef973dff844ba09dea342050cd5967",
    chainId: 11155111,
    symbol: "\u039E",
  },
};

export const networks = { ...defaultNetworks };

export function addCustomNetwork(
  name,
  rpcUrl,
  chainId
) {
  networks[name] = {
    name,
    rpcUrl,
    chainId,
    symbol: "\u039E",
  };
}

export function getNetwork(name) {
  return networks[name];
}

export const getDecryptedWalletAddress = () => {
  return '0x58bd94230B41353D73A899C061A80F3205de87f0';
};

export const persistEncryptedWalletAddress = (address) => {
  localStorage.setItem("encryptedWalletAddress", address);
};

export const clearEncryptedWallletAddress = () => {
  localStorage.clear();
};

export const getTokens = async (network_name) => {
  const config = {
    apiKey: "alcht_bOZV7tenTgYPT9vyuBsOdSiE0WsuiL",
    network: alchemyNetworks[network_name],
  };
  const alchemy = new Alchemy(config);

  // Wallet address -- replace with your desired address
  const address = getDecryptedWalletAddress();
  if (!address) {
    throw new Error("Wallet address not found");
  }

  // Get token balances with API endpoint
  const balances = await alchemy.core.getTokenBalances(address);
  
    // Remove tokens with zero balance
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });
  
    console.log(`Token balances of ${address} \n`);
  
    // Counter for SNo of final output
    let results = [];
  
    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) { 
      // Get balance of token
      let balance = Number(token.tokenBalance);
  
      // Get metadata of token with API endpoint
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
  
      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, Number(metadata.decimals));
      balance = Number(balance.toFixed(2));
  
      // Print name, balance, and symbol of token
      console.log("Name:", metadata.name);
      console.log("Balance", balance)
      console.log("Symbol:", metadata.symbol);
      console.log("----------------------------------");
    }
}

export const getNfts = async (network_name) => {
  const config = {
    apiKey: "alcht_bOZV7tenTgYPT9vyuBsOdSiE0WsuiL",
    network: alchemyNetworks[network_name],
  };
  const alchemy = new Alchemy(config);

  // Wallet address -- replace with your desired address
  let address = getDecryptedWalletAddress();
  if (!address) {
    throw new Error("Wallet address not found");
  }

  // Get all NFTs
  const nfts = await alchemy.nft.getNftsForOwner(address);

  // Parse output
  const numNfts = nfts["totalCount"];
  const nftList = nfts["ownedNfts"];

  console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);

  let i = 1;

  for (let nft of nftList) {
    console.log(`${i}. ${nft}`);
    i++;
  }
}

getTokens("mainnet");
getNfts("mainnet");