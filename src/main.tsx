import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/router";
import { SDKProvider } from "@telegram-apps/sdk-react";
import "./mockEnv.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SDKProvider>
    <RouterProvider router={router} />
  </SDKProvider>
);
