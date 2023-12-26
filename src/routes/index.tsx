import { createBrowserRouter } from "react-router-dom";
import CongratsPage from "pages/CongratsPage/index";
import CreateWalletPage from "pages/CreateWalletPage";
import DashboardPage from "pages/DashboardPage/index";
import WelcomeBackPage from "pages/WelcomeBackPage";
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
      {
        path: "/create-wallet",
        element: <CreateWalletPage />,
      },
      {
        path: "/congratulations",
        element: <CongratsPage />,
      },
      {
        path: "/welcome-back",
        element: <WelcomeBackPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
