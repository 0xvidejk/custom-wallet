export const getMnemonic = (state) => state.account.mnemonic;
export const getPassword = (state) => state.account.password;
export const getPasswordHash = (state) => state.account.passwordHash;
export const getEncryptedWalletData = (state) =>
  state.account.encryptedWalletData;
export const getWalletData = (state) => state.account.walletData;
export const getBalance = (state) => state.account.balance;
