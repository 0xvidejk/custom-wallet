import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getDefaultProvider } from "ethers";
import router from "routes";
import { store } from "store";
import { ProviderContext } from "store/contexts";

import "styles/index.css";

const provider = getDefaultProvider("sepolia");

ReactDOM.createRoot(document.getElementById("app")!).render(
  <ProviderContext.Provider value={provider}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ProviderContext.Provider>,
);
