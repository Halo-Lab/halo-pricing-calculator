import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Application } from "./src/Application";
import { StoreProvider } from "./src/store/Provider";
import { ResponsivenessProvider } from "./src/ui/Responsiveness";

const root = createRoot(document.querySelector("#calculator-root")!);

root.render(
  <StrictMode>
    <StoreProvider>
      <ResponsivenessProvider>
        <Application />
      </ResponsivenessProvider>
    </StoreProvider>
  </StrictMode>,
);
