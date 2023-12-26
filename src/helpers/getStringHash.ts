import { id, keccak256 } from "ethers";

export const getStringHash = (str: string): string => {
  return keccak256(id(str));
};
