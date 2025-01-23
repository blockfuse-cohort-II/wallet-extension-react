import { ethers, TransactionResponse, Mnemonic } from "ethers";
import { HDNode } from "@ethersproject/hdnode";
import { Alchemy, Network } from "alchemy-sdk";
import { Assets } from "../interfaces/interfaces";

interface Contact {
  name: string;
  address: string;
}

export function savePassword(password: string): void {
  if (!password) throw new Error("Password cannot be empty");
  localStorage.setItem("password", password);
}

export function validatePassword(password: string): boolean {
  console.log("password-validate", password);
  return localStorage.getItem("password") === password;
}

export function getAddressFromSeedPhrase(seedPhrase: string): string {
  const wallet = ethers.Wallet.fromPhrase(seedPhrase);
  return wallet.address;
}

export async function sendEther(
  senderPrivateKey: string,
  recipientAddress: string,
  amountInEther: string,
  networkChainId: number,
  providerUrl: string
): Promise<TransactionResponse> {
  const provider = new ethers.JsonRpcProvider(providerUrl, networkChainId);
  const wallet = new ethers.Wallet(senderPrivateKey, provider);
  const tx = {
    to: recipientAddress,
    value: ethers.parseEther(amountInEther),
  };
  return await wallet.sendTransaction(tx);
}

export async function getBalance(
  address: string,
  networkChainId: number,
  providerUrl: string
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(providerUrl, networkChainId);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

export async function listAccounts(providerUrl: string) {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const res = await provider.listAccounts();
  console.log(res);
  return res;
}

export function persistSelectedNetwork(name: string) {
  localStorage.setItem("selectedNetwork", name);
}

export function getSelectedNetwork(): string | null {
  return localStorage.getItem("selectedNetwork") ?? "mainnet";
}

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
  chainId: number;
  symbol?: string; // Symbol for the network currency
  ticker?: string; // Ticker symbol
  explorer?: string; // Explorer URL for the network
}

const alchemyNetworks: Record<string, Network> = {
  mainnet: Network.ETH_MAINNET,
  polygon: Network.MATIC_MAINNET,
  bsc: Network.BNB_MAINNET,
  sepolia: Network.ETH_SEPOLIA,
};

const defaultNetworks: Record<string, NetworkConfig> = {
  mainnet: {
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/1cef973dff844ba09dea342050cd5967",
    chainId: 1,
    symbol: "Ξ",
    ticker: "ETH",
    explorer: "https://etherscan.io",
  },
  polygon: {
    name: "Polygon Mainnet",
    rpcUrl: "https://polygon-rpc.com",
    chainId: 137,
    symbol: "MATIC",
    ticker: "MATIC",
    explorer: "https://polygonscan.com",
  },
  bsc: {
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    symbol: "BNB",
    ticker: "BNB",
    explorer: "https://bscscan.com",
  },
  sepolia: {
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/1cef973dff844ba09dea342050cd5967",
    chainId: 11155111,
    symbol: "Ξ",
    ticker: "SepoliaETH",
    explorer: "https://sepolia.etherscan.io",
  },
};

export const networks = { ...defaultNetworks };

export function addCustomNetwork(
  name: string,
  rpcUrl: string,
  chainId: number,
  explorer?: string
) {
  networks[name] = {
    name,
    rpcUrl,
    chainId,
    symbol: "Ξ",
    ticker: "CustomETH",
    explorer,
  };
}

export function getNetwork(name: string): NetworkConfig | undefined {
  console.log("getNetwork", networks[name]);
  return networks[name];
}

export const retrieveData = (key: string) => {
  const data = JSON.parse(localStorage.getItem(`${key}`) ?? "");
  if (data) {
    return data;
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const persistData = (key: string, data: any) => {
  localStorage.setItem(`${key}`, JSON.stringify(data));
};

export const clearStore = () => {
  localStorage.clear();
};

export const getTokens = async () => {
  const network_name: string = localStorage.getItem("selectedNetwork") ?? "";
  const config = {
    apiKey: "alcht_bOZV7tenTgYPT9vyuBsOdSiE0WsuiL",
    network: alchemyNetworks[network_name],
  };
  const alchemy = new Alchemy(config);

  // Wallet address -- replace with your desired address
  const address = retrieveData("accounts");
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
  const results: Assets[] = [];

  // Loop through all tokens with non-zero balance
  for (const token of nonZeroBalances) {
    // Get balance of token
    let balance = Number(token.tokenBalance);

    // Get metadata of token with API endpoint
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, Number(metadata.decimals));
    balance = Number(balance.toFixed(2));

    results.push({
      name: metadata.name ?? "",
      quantity: balance,
      price: metadata.symbol ?? "",
      change: 0,
    });

    // Print name, balance, and symbol of token
    console.log("Name:", metadata.name);
    console.log("Balance", balance);
    console.log("Symbol:", metadata.symbol);
    console.log("----------------------------------");
  }
  return results;
};

export const getNfts = async (network_name: string) => {
  const config = {
    apiKey: "alcht_bOZV7tenTgYPT9vyuBsOdSiE0WsuiL",
    network: alchemyNetworks[network_name],
  };
  const alchemy = new Alchemy(config);

  // Wallet address -- replace with your desired address
  const address = retrieveData("accounts");
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

  for (const nft of nftList) {
    console.log(`${i}. ${nft}`);
    i++;
  }
};

export const getMnemonic = () => {
  const mnemonic = localStorage.getItem("mnemonic");
  if (mnemonic) {
    return mnemonic;
  }
  return "";
};

export const saveContact = (contact: Contact): void => {
  const contacts = getContacts();
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

export const getContacts = (): Contact[] => {
  const contacts = localStorage.getItem("contacts");
  return contacts ? JSON.parse(contacts) : [];
};

export const deleteContact = (address: string): void => {
  const contacts = getContacts().filter((c) => c.address !== address);
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

export function createHDWallet(
  seedPhrase: string,
  path: string = "m/44'/60'/0'/0/0"
): ethers.Wallet {
  const isValid = Mnemonic.isValidMnemonic(seedPhrase);
  if (!isValid) {
    throw Error("Not a valid seed phrase");
  }
  const hdNode = HDNode.fromMnemonic(seedPhrase, path);
  const derivedNode = hdNode.derivePath(path);
  return new ethers.Wallet(derivedNode.privateKey);
}
export function createAccountFromHDNode(
  seedPhrase: string,
  accountIndex: number
): ethers.Wallet {
  const path = `m/44'/60'/0'/0/${accountIndex}`;
  return createHDWallet(seedPhrase, path);
}
export function getWalletFromSeedPhrase(seedPhrase: string): {
  address: string;
  privateKey: string;
} {
  const wallet = ethers.Wallet.fromPhrase(seedPhrase);
  return wallet;
}
export function getAddressFromPrivateKey(privateKey: string): ethers.Wallet {
  const wallet = new ethers.Wallet(privateKey);
  return wallet;
}

export function generateSeedPhrase(): ethers.Mnemonic {
  const wallet = ethers.Wallet.createRandom();
  if (!wallet.mnemonic) throw new Error("Failed to generate mnemonic");
  return wallet.mnemonic;
}

export const saveMnemonic = async (mnemonic: string) => {
  localStorage.setItem("mnemonic", mnemonic);
};

export const getSelectedAccountPrivateKey = () => {
  const privateKey = retrieveData("accounts");
  console.log(privateKey, "privateKeyutils");
  const accountIndex = localStorage.getItem("selectedAccountIndex") ?? 0;

  if (privateKey) {
    return privateKey[accountIndex]?.privateKey;
  }
  return "";
};
