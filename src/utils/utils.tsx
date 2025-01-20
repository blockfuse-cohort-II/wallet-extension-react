import { ethers, TransactionResponse ,Mnemonic} from "ethers";
import { HDNode } from "@ethersproject/hdnode";

export function savePassword(password: string): void {
  localStorage.setItem("password", password);
}

export function checkPassword(password: string): boolean {
  return localStorage.getItem("password") === password;
}

export function generateSeedPhrase(): ethers.Mnemonic {
  const wallet = ethers.Wallet.createRandom();
  if (!wallet.mnemonic) throw new Error("Failed to generate mnemonic");
  return wallet.mnemonic;
}

export function createHDWallet(
  seedPhrase: string,
  path: string = "m/44'/60'/0'/0/0"
): ethers.Wallet {
  const isValid = Mnemonic.isValidMnemonic(seedPhrase)

  if (!isValid){
    throw  Error('Not a valid seed phrase')
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
    value: ethers.formatEther(amountInEther),
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
  symbol?: string;
}

const defaultNetworks: Record<string, NetworkConfig & { symbol: string; ticker: string }> = {
  mainnet: {
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/1cef973dff844ba09dea342050cd5967",
    chainId: 1,
    symbol: "\u039E",
    ticker: "USD",
  },
  polygon: {
    name: "Polygon Mainnet",
    rpcUrl: "https://polygon-rpc.com",
    chainId: 137,
    symbol: "\u039E",
    ticker: "USD",

  },
  bsc: {
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    symbol: "\u0024",
    ticker: "ETH",
  },
  sepolia: {
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/1cef973dff844ba09dea342050cd5967",
    chainId: 11155111,
    symbol: "\u039E",
    ticker: "SepoliaETH",
  },
};

export const networks = { ...defaultNetworks };

export function addCustomNetwork(
  name: string,
  rpcUrl: string,
  chainId: number
) {
  networks[name] = {
    name,
    rpcUrl,
    chainId,
    symbol: "\u039E",
    ticker: "ETH",
  };
}

export function getNetwork(name: string): NetworkConfig | undefined {
  return networks[name];
}

export const getDecryptedWalletAddress = (): string | null => {
  const encryptedWalletAddress = localStorage.getItem("encryptedWalletAddress");
  if (encryptedWalletAddress) {
    return encryptedWalletAddress;
  }
  return null;
};

export const persistEncryptedWalletAddress = (address: string) => {
  localStorage.setItem("encryptedWalletAddress", address);
};

export const clearStore = () => {
  localStorage.clear();
};

export const savePrivateKey = async (privateKey: string) => {
  localStorage.setItem("privateKey", privateKey);
}

export const getPrivateKey = async () => {
  const privateKey = localStorage.getItem("privateKey");
  if (privateKey) {
    return privateKey;
  }
  return '';
}

export const saveMnemonic = async (mnemonic: string) => {
  localStorage.setItem("mnemonic", mnemonic);
}

export const getMnemonic = () => {
  const mnemonic = localStorage.getItem("mnemonic");
  if (mnemonic) {
    return mnemonic;
  }
  return '';
}