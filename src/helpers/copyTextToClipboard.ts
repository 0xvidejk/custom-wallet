import { toast } from "react-toastify";
import { writeText } from "@tauri-apps/api/clipboard";

export const copyTextToClipboard = async (text: string) => {
  try {
    await writeText(text);
    toast.success("Mnemonic copied to clipboard");
  } catch (error) {
    toast.error("Failed to copy mnemonic to clipboard");
  }
};
