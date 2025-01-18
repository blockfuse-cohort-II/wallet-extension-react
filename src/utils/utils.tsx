import { ethers, TransactionResponse } from "ethers";

export function generateSeedPhrase(): string {
  const wallet = ethers.Wallet.createRandom();
  if (!wallet.mnemonic) throw new Error("Failed to generate mnemonic");
  return wallet.mnemonic.phrase;
}

export function getAddressFromSeedPhrase(seedPhrase: string): { address: string; privateKey: string } {
  const wallet = ethers.Wallet.fromPhrase(seedPhrase);
  return { address: wallet.address, privateKey: wallet.privateKey };
}

export async function sendEther(
  senderPrivateKey: string,
  recipientAddress: string,
  amountInEther: string,
  networkChainId: number,
  providerUrl: string
): Promise<TransactionResponse> {
  console.log(senderPrivateKey, recipientAddress, amountInEther, networkChainId, providerUrl)
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
  symbol?: string; // Ξ (Ethereum)
}

const defaultNetworks: Record<string, NetworkConfig & { symbol: string }> = {
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

export const clearEncryptedWallletAddress = () => {
  localStorage.clear();
};


// export async function savePrivateKey(privateKey: string, passphrase: string): Promise<void> {
//   try {
//     // Encrypt the private key using the custom encryptPrivateKey function
//     const encryptedPrivateKey = await encryptPrivateKey(privateKey, passphrase);
//     console.log(encryptedPrivateKey, "encryptedPrivateKey")

//     // Store the encrypted private key in chrome.storage.local
//     chrome.storage.local.set({ encryptedPrivateKey }, () => {
//       console.log("Private key securely stored.");
//     });
//   } catch (error) {
//     console.error("Failed to encrypt or store the private key:", error);
//     throw new Error("Encryption or storage failed.");
//   }
// }

export function savePrivateKey(privateKey: string): void {
  chrome.storage.local.set({ privateKey }, () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to store the private key:", chrome.runtime.lastError.message);
      throw new Error("Storage failed.");
    }
    console.log("Private key stored successfully.");
  });
}


/**
 * Encrypts a private key using a passphrase.
 * @param privateKey The private key to encrypt.
 * @param passphrase The passphrase to use for encryption.
 * @returns The encrypted private key as a string.
 */
export async function encryptPrivateKey(privateKey: string, passphrase: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(privateKey);
  const passwordKey = await deriveKey(passphrase);

  const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random initialization vector
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    passwordKey,
    data
  );

  return `${Buffer.from(iv).toString("hex")}:${Buffer.from(encryptedData).toString("hex")}`;
}

/**
 * Decrypts a private key using a passphrase.
 * @param encrypted The encrypted private key.
 * @param passphrase The passphrase to decrypt the key.
 * @returns The decrypted private key.
 */
export async function decryptPrivateKey(encrypted: string, passphrase: string): Promise<string> {
  const [ivHex, encryptedDataHex] = encrypted.split(":");
  const iv = new Uint8Array(Buffer.from(ivHex, "hex"));
  const encryptedData = Buffer.from(encryptedDataHex, "hex");

  const passwordKey = await deriveKey(passphrase);

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    passwordKey,
    encryptedData
  );

  return new TextDecoder().decode(decryptedData);
}

/**
 * Derives a cryptographic key from a passphrase.
 * @param passphrase The passphrase to derive the key.
 * @returns A cryptographic key.
 */
async function deriveKey(passphrase: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new Uint8Array(16), // A fixed salt can be replaced with a dynamic one for more security
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
// export function getPrivateKey(passphrase: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     chrome.storage.local.get(["encryptedPrivateKey"], (result) => {
//       if (chrome.runtime.lastError) {
//         reject(chrome.runtime.lastError.message);
//         return;
//       }

//       const encryptedPrivateKey = result.encryptedPrivateKey;
//       if (!encryptedPrivateKey) {
//         reject("No private key found.");
//         return;
//       }

//       try {
//         const privateKey = decryptPrivateKey(encryptedPrivateKey, passphrase); // Use the decryption function
//         resolve(privateKey);
//       } catch (error) {
//         console.error("Failed to decrypt the private key:", error);
//         reject("Decryption failed.");
//       }
//     });
//   });
// }

export function getPrivateKey(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["privateKey"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
        return;
      }

      const privateKey = result.privateKey;
      if (!privateKey) {
        reject("No private key found.");
        return;
      }

      resolve(privateKey);
    });
  });
}


/**
 * Clears the stored private key from chrome.storage.local.
 */
export function clearPrivateKey(): void {
  chrome.storage.local.remove("encryptedPrivateKey", () => {
    console.log("Private key removed from storage.");
  });
}