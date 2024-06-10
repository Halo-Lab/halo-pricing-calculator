import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Application } from "./src/Application";
import { StoreProvider } from "./src/Store";

import "./index.css";

const root = createRoot(document.querySelector("#calculator-root")!);

root.render(
  <StrictMode>
    <StoreProvider>
      <Application />
    </StoreProvider>
  </StrictMode>,
);
