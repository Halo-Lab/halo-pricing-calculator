import { JSX } from "react";

import { Box } from "./ui/Box";
import { Entry } from "./Entry";
import { Survey } from "./Survey";
import { useSelector } from "./store/Provider";

export function Application(): JSX.Element {
  const currentStep = useSelector((store) => store.currentStep);

  return <Box width="fill">{currentStep ? <Survey /> : <Entry />}</Box>;
}
