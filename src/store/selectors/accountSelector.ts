import { RootState } from "store";

// Gets the encrypted account wallet data
export const getEncryptedWalletData = (state: RootState) =>
  state.account.encryptedWalletData;

// Gets hash of password of the current account
export const getPasswordHash = (state: RootState) => state.account.passwordHash;

// Gets current walletData
export const getWallet = (state: RootState) => state.account.walletData;

export const getLastWalletIndex = (state: RootState) =>
  state.account.lastWalletIndex;

export const getBalance = (state: RootState) => state.account.balance;
