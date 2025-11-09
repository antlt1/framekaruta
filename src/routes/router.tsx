import { createBrowserRouter } from "react-router-dom";
import RootLayout from "~/layout/RootLayout";
import Home from "~/pages/Home";
import About from "~/pages/About";
import NotFound from "~/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // = path: ""
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
