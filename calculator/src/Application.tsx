import { JSX } from "react";

import { Entry } from "./Entry";
import { Color } from "./palettes/colours";
import { Survey } from "./Survey";
import { useSelector } from "./store/Provider";
import { Box, BoxDecoration } from "./ui/Box";

export function Application(): JSX.Element {
  const currentStep = useSelector((store) => store.currentStep);

  return (
    <Box width="fill" decorations={BoxDecoration().color(Color.blueDark)}>
      {currentStep ? <Survey /> : <Entry />}
    </Box>
  );
}
