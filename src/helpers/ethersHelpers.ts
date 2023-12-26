import { EthersError } from "ethers";
import { HDNodeWallet, Wallet } from "ethers";
import { IWallet } from "types/account";
import { ETHERS_ERROR_MESSAGES } from "utils/constants";

interface IEncryptWalletData {
  (wallet: HDNodeWallet, passwordHash: string): Promise<string>;
}

export interface IWalletData {
  walletData: IWallet;
  signer: HDNodeWallet | Wallet;
}

export const decryptWalletData = async (
  encryptedWalletData: string,
  password: string,
): Promise<IWalletData> => {
  const encryptedWallet = await Wallet.fromEncryptedJson(
    encryptedWalletData,
    password,
  );

  return {
    walletData: {
      address: encryptedWallet.address,
      privateKey: encryptedWallet.privateKey,
    },
    signer: encryptedWallet,
  };
};

export const getErrorMessage = (error: EthersError): string => {
  if (Object.prototype.hasOwnProperty.call(error, "shortMessage"))
    return ETHERS_ERROR_MESSAGES[error.shortMessage];
  return (
    ETHERS_ERROR_MESSAGES[error.message] ||
    ETHERS_ERROR_MESSAGES.UNEXPECTED_ERROR + error.message
  );
};

export const encryptWalletData: IEncryptWalletData = async (
  wallet,
  passwordHash,
) => {
  const encryptedWalletData = await wallet.encrypt(passwordHash);
  return encryptedWalletData;
};
