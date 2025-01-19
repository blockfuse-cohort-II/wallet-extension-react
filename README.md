# Katera Wallet

## Overview
Katera Wallet is a browser extension for managing cryptocurrency wallets. It allows users to create or recover wallets, view balances, and interact with multiple blockchain networks. Built with React, TypeScript, and ethers.js, this project leverages modern web technologies for a seamless user experience.

---

## Features

### Wallet Management
- **Create Wallet**:
  - Generate a 12-word seed phrase and derive a wallet address.
  - Securely save the wallet address for future access.
- **Recover Wallet**:
  - Input an existing seed phrase to restore a wallet.

### Network Management
- **Predefined Networks**:
  - Includes Ethereum Mainnet, Polygon Mainnet, Binance Smart Chain (BSC), and Sepolia Testnet.
- **Custom Networks**:
  - Add and configure custom blockchain networks.
- **Select Network**:
  - Search and choose from available networks, with persistence in local storage.

### Blockchain Interactions
- **View Balance**:
  - Fetch and display wallet balances from the selected network.
- **Send Transactions**:
  - Transfer Ether to another address by specifying private key, recipient, and amount.

### User Interface
- Intuitive and modular design using **React** components.
- Dynamic feedback for network calls and loading states.
- Responsive layout styled with **Tailwind CSS**.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v18 or later)
- npm 

### Clone the Repository
```bash
git clone https://github.com/your-repository/wallet-extension-react.git
cd wallet-extension-react
```

### Install Dependencies
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production
```bash
npm run build
```
The production build will be available in the `dist` directory.

---

## Key Technologies
-Frontend: React, Typescript, TailwindCss.
-Api Layer: ether.js.
-Vite: Fast development server and build tool.
-Extension: CRXjs

---

## How to Use

### Creating a Wallet
1. Navigate to the `Create Wallet` page.
2. Click `Generate Seed Phrase` to create a new wallet.
3. Save the seed phrase securely and proceed to view your wallet address.

### Recovering a Wallet
1. Navigate to the `Recover Wallet` option.
2. Input your 12-word seed phrase to restore the wallet.

### Selecting a Network
1. Click the network dropdown in the header.
2. Choose a predefined network or add a custom network.

### Viewing Balance
1. Ensure your wallet is connected to a network.
2. Navigate to the `View Balance` page to fetch and display your wallet balance.

### Sending Ether
1. Enter recipient details and amount on the transaction page.
2. Confirm and send the transaction via the blockchain.

---

## Environment Variables
Create a `.env` file in the project root with the following variables:
```env
# Ethereum Provider (Infura API Key)
INFURA_PROJECT_ID=your_infura_project_id
ETHEREUM_NETWORK=mainnet
```

---

## Future Enhancements
- **Token Support**: Display balances for multiple tokens.
- **Password**: Password Protection for the Katera Application.
- **Multiple Account Management**: Handle Multiple Account Management
- **Extension Packaging**: Finalize compatibility for Chrome/Firefox deployment.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributors
Built with ❤️ by the **Blockfuse Web3 Cohort 2**.
- 
