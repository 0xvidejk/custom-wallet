import { createBrowserRouter } from "react-router-dom";
import CreateWalletPage from "pages/CreateWalletPage";
import WelcomePage from "pages/WelcomePage";

import Layout from "components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/create-wallet",
        element: <CreateWalletPage />,
      },
    ],
  },
]);

export default router;
