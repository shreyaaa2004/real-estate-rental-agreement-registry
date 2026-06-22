# Decentralized Real Estate Rental Registry

A Stellar Level 2 DApp demonstrating advanced smart contract integration using Soroban. Built for property owners to list properties and tenants to create secure, immutable rental agreements on the Stellar Testnet.

## Overview
This application serves as a fully functional proof-of-concept for a Real Estate Rental Agreement Registry. It allows users to connect their Freighter wallet, list real estate properties, and simulate the request, signing, and tracking of rental agreements powered by a Soroban smart contract.

## Features
- **Wallet Integration**: Secure login and transaction signing using `StellarWalletsKit` (Freighter).
- **Smart Contracts**: Soroban Rust contract containing business logic for listing properties, signing agreements, and paying rent.
- **Frontend ↔ Contract Integration**: Read state directly from the ledger and submit transactions securely via your connected wallet.
- **Real-Time Dashboards**: View your connected address, Network information, and a simulated real-time event feed.
- **Modern UI**: Built with Next.js 15 App Router, Tailwind CSS, and shadcn/ui.

## Tech Stack
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS & shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Blockchain SDKs**: `@stellar/stellar-sdk`, `@creit.tech/stellar-wallets-kit`
- **Smart Contract**: Rust & Soroban SDK

## Setup Instructions

### Environment Variables
Currently, the contract and network configuration are hardcoded for ease of testing on the Testnet. However, if you'd like to extend this, you can set the following variables in a `.env.local` file:
```env
NEXT_PUBLIC_CONTRACT_ID=CBAEREW4UGQCNR6224JN7LCHVSTVXINS2URDQFDURKU6B4RW34JH3V4W
NEXT_PUBLIC_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
NEXT_PUBLIC_RPC_URL="https://soroban-testnet.stellar.org"
```

### Wallet Setup
1. Install the [Freighter Wallet](https://www.freighter.app/) extension in your browser.
2. Ensure you switch the network in Freighter to **Testnet**.
3. Fund your testnet account using the [Stellar Laboratory Faucet](https://laboratory.stellar.org/#account-creator?network=test).

### Contract Deployment
The contract (`lib.rs` and `Cargo.toml`) is located in the `contracts/rental_registry` directory.
1. Use an external IDE (like Stellar's web IDE or local toolchain) to build the contract.
2. Deploy the compiled `.wasm` file to the Stellar Testnet.
3. Update the `CONTRACT_ID` placeholder in `src/lib/config.ts` if you deploy your own instance.

Current Deployed Contract: `CONTRACT_ADDRESS_HERE` -> `CBAEREW4UGQCNR6224JN7LCHVSTVXINS2URDQFDURKU6B4RW34JH3V4W`

### Running Locally
To spin up the development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to interact with the application.

## Deployment
This Next.js 15 application is optimized for Vercel. 
1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Ensure the Framework Preset is set to `Next.js`.
4. Deploy!

---
*Example Transaction Hash:* `TRANSACTION_HASH_HERE`
