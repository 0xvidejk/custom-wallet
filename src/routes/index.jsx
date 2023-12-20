import { createBrowserRouter } from "react-router-dom";
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
    ],
  },
]);

export default router;
