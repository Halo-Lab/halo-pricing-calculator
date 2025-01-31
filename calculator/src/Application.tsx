import { JSX } from "react";

import { Entry } from "./Entry";
import { Color } from "./palettes/colours";
import { Survey } from "./Survey";
import { Viewport } from "./ui/Viewport";
import { useSelector } from "./store/Provider";
import { Box, BoxDecoration } from "./ui/Box";
import { useApplicationContainer } from "./ApplicationContainerRefProvider";

const globalStyles = `
@keyframes spinning-loader {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
  }
}
`;

export function Application(): JSX.Element {
  const container = useApplicationContainer();
  const currentStep = useSelector((store) => store.currentStep);

  return (
    <Viewport styles={globalStyles}>
      <Box
        ref={container.ref}
        width="fill"
        decorations={BoxDecoration().color(Color.blueDark)}
      >
        {currentStep ? <Survey /> : <Entry />}
      </Box>
    </Viewport>
  );
}
