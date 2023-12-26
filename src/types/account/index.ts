export interface IAccountLocalData {
  createdTimestamp: number;
  encryptedWalletData: string;
  passwordHash: string;
  profileName: string;
  lastWalletIndex: number;
}

export interface IAccountState extends IAccountLocalData {
  balance: string;
  walletData: IWallet;
}

export interface IWallet {
  address: string;
  privateKey: string;
}
