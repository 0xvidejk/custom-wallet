import { toast } from "react-toastify";
import { formatEther } from "ethers";

export const getEthBalance = async (address, provider) => {
  try {
    const balance = await provider.getBalance(address, "latest");
    const balanceInEth = formatEther(balance);
    return balanceInEth;
  } catch (e) {
    toast.error(
      "Failed to get ETH balance due to network unavailability. Error:",
      e.message,
    );
  }
};
