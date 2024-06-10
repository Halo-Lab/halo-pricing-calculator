import { JSX } from "react";

import { Entry } from "./Entry";
import { Survey } from "./Survey";
import { useSelector } from "./Store";

import "./Application.css";

export function Application(): JSX.Element {
  const currentStep = useSelector((store) => store.currentStep);

  return (
    <main data-step={currentStep}>
      {currentStep === 0 ? <Entry /> : <Survey />}
    </main>
  );
}
