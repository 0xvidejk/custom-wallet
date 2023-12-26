import { toast } from "react-toastify";
import { invoke } from "@tauri-apps/api";
import { AccountTypes } from "types";
import { NOTIFICATION_MESSAGES } from "utils/constants";
import { TAURI_FUNCTIONS } from "utils/constants";
import { v4 as uuidV4 } from "uuid";

export const getUserLocalProfile =
  async (): Promise<null | AccountTypes.IAccountLocalData> => {
    const toastId = toast.loading("Loading local profile...", {
      autoClose: false,
    });

    try {
      const userLocalData: AccountTypes.IAccountLocalData = await invoke(
        TAURI_FUNCTIONS.get_local_profile,
      );

      toast.update(toastId, {
        render: NOTIFICATION_MESSAGES.LOAD_PROFILE.SUCCESS,
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });

      return userLocalData;
    } catch (error) {
      toast.update(toastId, {
        render: NOTIFICATION_MESSAGES.LOAD_PROFILE.WARN,
        type: "warning",
        autoClose: 3000,
        isLoading: false,
      });

      return null;
    }
  };

export const createLocalProfile = async (
  password: string,
  encryptedWalletData: string,
): Promise<AccountTypes.IAccountLocalData> => {
  const userName = await invoke(TAURI_FUNCTIONS.create_user_profile, {
    userName: uuidV4(),
    passwordHash: password,
    encryptedWalletData,
  });
  const localAccountData: AccountTypes.IAccountLocalData = await invoke(
    TAURI_FUNCTIONS.get_user_profile,
  );
  if (localAccountData.profileName !== userName)
    throw new Error("Failed to create user profile");
  toast.success("User profile created successfully");
  return localAccountData;
};

export const updateLastWalletIndex = async (
  lastWalletIndex: number,
): Promise<void> => {
  await invoke(TAURI_FUNCTIONS.update_last_wallet_index, {
    lastWalletIndex,
  });
};
