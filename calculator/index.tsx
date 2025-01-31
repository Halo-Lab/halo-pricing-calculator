import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Application } from "./src/Application";
import { StoreProvider } from "./src/store/Provider";
import { ResponsivenessProvider } from "./src/ui/Responsiveness";
import { ApplicationContainerRefProvider } from "./src/ApplicationContainerRefProvider";

const root = createRoot(document.querySelector("#calculator-root")!);

root.render(
  <StrictMode>
    <StoreProvider>
      <ResponsivenessProvider>
        <ApplicationContainerRefProvider>
          <Application />
        </ApplicationContainerRefProvider>
      </ResponsivenessProvider>
    </StoreProvider>
  </StrictMode>,
);
