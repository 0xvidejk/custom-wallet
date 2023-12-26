import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountTypes } from "types";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    createdTimestamp: 0,
    encryptedWalletData: "",
    passwordHash: "",
    profileName: "",
    balance: "",
    lastWalletIndex: 0,
    walletData: {
      address: "",
      privateKey: "",
    },
  } as AccountTypes.IAccountState,

  reducers: {
    setAccountLocalData: (
      state,
      action: PayloadAction<AccountTypes.IAccountLocalData>,
    ) => {
      Object.assign(state, action.payload);
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    setWallet: (
      state,
      action: PayloadAction<AccountTypes.IAccountState["walletData"]>,
    ) => {
      state.walletData.address = action.payload.address;
      state.walletData.privateKey = action.payload.privateKey;
    },
    setLastWalletIndex: (state, action: PayloadAction<number>) => {
      state.lastWalletIndex = action.payload;
    },
  },
});

export const {
  setBalance,
  setAccountLocalData,
  setWallet,
  setLastWalletIndex,
} = accountSlice.actions;

export default accountSlice.reducer;
