import { createContext } from "react";
import { AbstractProvider } from "ethers";

export const ProviderContext = createContext({} as AbstractProvider);
