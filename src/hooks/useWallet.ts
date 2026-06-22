"use client";

import { create } from 'zustand';
import { StellarWalletsKit, initKit } from '@/lib/wallet';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const useWallet = create<WalletState>((set) => ({
  address: null,
  isConnected: false,

  connect: async () => {
    initKit();
    try {
      const result = await StellarWalletsKit.authModal();
      if (result && result.address) {
        set({ address: result.address, isConnected: true });
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  },

  disconnect: async () => {
    initKit();
    try {
      await StellarWalletsKit.disconnect();
      set({ address: null, isConnected: false });
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  },
}));
