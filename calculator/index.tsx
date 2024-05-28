import { mount } from "@moru/web/client";
import { context } from "moru";

import { Calculator } from "./src/Calculator.js";
import { StoreProvider } from "./src/store.js";

import "./index.css";

const calculatorRootNode = document.querySelector("#calculator-root")!;
const calculatorContext = context();

const unmount = mount(
  calculatorContext,
  <StoreProvider>
    <Calculator />
  </StoreProvider>,
  calculatorRootNode,
);

/**
 * Removes currently mounted calculator DOM nodes
 * and disposes the associative context.
 */
function disposeApplication(): void {
  unmount();
  calculatorContext.dispose();
}
