import { formatEther } from "ethers";

export const getEthBalance = async (address, provider) => {
  const balance = await provider.getBalance(address, "latest");
  const balanceInEth = formatEther(balance);
  return balanceInEth;
};
