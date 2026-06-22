"use client";

import { StellarWalletsKit, Networks } from "@creit.tech/stellar-wallets-kit";
import { FreighterModule } from "@creit.tech/stellar-wallets-kit/modules/freighter";

let isInitialized = false;

export function initKit() {
  if (typeof window !== "undefined" && !isInitialized) {
    StellarWalletsKit.init({
      modules: [new FreighterModule()],
      network: Networks.TESTNET,
    });
    isInitialized = true;
  }
}

export { StellarWalletsKit, Networks };
