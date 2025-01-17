import { ethers, TransactionResponse } from "ethers";
import crypto from "crypto";

export function generateSeedPhrase(): string {
  const wallet = ethers.Wallet.createRandom();
  if (!wallet.mnemonic) throw new Error("Failed to generate mnemonic");
  return wallet.mnemonic.phrase;
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
  symbol?: string; // Ξ (Ethereum)
}

const defaultNetworks: Record<string, NetworkConfig & { symbol: string }> = {
  mainnet: {
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_ID}",
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
    rpcUrl: "https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_ID}",
    chainId: 11155111,
    symbol: "\u039E",
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
  };
}

export function getNetwork(name: string): NetworkConfig | undefined {
  return networks[name];
}

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY ?? "mySecretKey";
const ALGORITHM = "aes-256-gcm";

export const decryptValue = (encryptedValue: string): string => {
  const iv = Buffer.from(encryptedValue.slice(0, 32), "hex");
  const authTag = Buffer.from(encryptedValue.slice(32, 64), "hex");
  const encryptedText = encryptedValue.slice(64);
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export const getDecryptedWalletAddress = (): string | null => {
  const encryptedWalletAddress = localStorage.getItem("encryptedWalletAddress");
  if (encryptedWalletAddress) {
    return decryptValue(encryptedWalletAddress);
  }
  return null;
};

export const encryptValue = (value: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(value, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();
  return iv.toString("hex") + authTag.toString("hex") + encrypted;
};
