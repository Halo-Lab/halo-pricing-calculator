import { Store } from "../store/definition";

export function fillWebflowModalForm(store: Store): void {
  const form = getForm();

  if (form) {
  }
}

function getForm(): HTMLFormElement | null | undefined {
  return document
    .querySelector('[data-remodal-id="calculator"]')
    ?.querySelector("form");
}
