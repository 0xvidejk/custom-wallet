import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    mnemonic:
      "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12",
    password: "",
    passwordHash: "",
    encryptedWalletData: "",
    balance: 0,
    walletData: {
      address: "0x0000",
      mnemonic:
        "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12",
    },
  },
  reducers: {
    setMnemonic: (state, action) => {
      state.mnemonic = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordHash: (state, action) => {
      state.passwordHash = action.payload;
    },
    setEncryptedWalletData: (state, action) => {
      state.encryptedWalletData = action.payload;
    },
    setWalletData: (state, action) => {
      state.walletData = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const {
  setMnemonic,
  setPassword,
  setPasswordHash,
  setEncryptedWalletData,
  setWalletData,
  setBalance,
} = accountSlice.actions;

export default accountSlice.reducer;
