import { JSX, useCallback, useState } from "react";

import { Entry } from "./Entry";
import { Color } from "./palettes/colours";
import { Survey } from "./Survey";
import { Viewport } from "./ui/Viewport";
import { Box, BoxDecoration } from "./ui/Box";
import { useApplicationContainer } from "./ApplicationContainerRefProvider";
import { platformModifiers, usePlatform } from "./hooks/usePlatform";

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
  const platform = usePlatform();
  const container = useApplicationContainer();
  const [shouldStartSurvey, setShouldStartSurvey] = useState(false);

  const startSurvey = useCallback(() => {
    setShouldStartSurvey(true);
  }, []);

  const returnToEntry = useCallback(() => {
    setShouldStartSurvey(false);
  }, []);

  return (
    <Viewport styles={globalStyles}>
      <Box
        ref={container.ref}
        width="fill"
        decorations={BoxDecoration().color(Color.blueDark)}
        _extend={{
          className: platformModifiers[platform],
        }}
      >
        {shouldStartSurvey ? (
          <Survey returnToEntry={returnToEntry}/>
        ) : (
          <Entry startSurvey={startSurvey}  />
        )}
      </Box>
    </Viewport>
  );
}
