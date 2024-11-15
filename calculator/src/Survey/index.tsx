import { JSX, useEffect, useState } from "react";

import { Box } from "../ui/Box";
import { Summary } from "./Summary";
import { FinalWords } from "./FinalWords";
import { useSelector } from "../store/Provider";
import { Questionnaire } from "./Questionnaire";
import { useBreakpoints } from "../ui/Responsiveness";
// import { SendEmailForm } from "./SendEmailForm";
import { fillWebflowModalForm } from "./fillWebflowModalForm";

declare namespace globalThis {
  let onEstimateSent: VoidFunction | undefined;
}

export function Survey(): JSX.Element {
  const { lt } = useBreakpoints();
  const store = useSelector((store) => store);
  const [isDataSendFormVisible, setIsDataSendFormVisible] = useState(false);
  const [shouldFinalWordsFrameBeVisible, setShouldFinalWordsFrameBeVisible] =
    useState(false);

  useEffect(() => {
    if (isDataSendFormVisible) {
      const onEstimateSent = () => {
        setIsDataSendFormVisible(false);
        setShouldFinalWordsFrameBeVisible(true);
      };

      globalThis.onEstimateSent = onEstimateSent;

      fillWebflowModalForm(store);

      return () => {
        delete globalThis.onEstimateSent;
      };
    }
  }, [isDataSendFormVisible, store]);

  return (
    <>
      <Box width="fill" vertical={lt(1100)} spacing={lt(1100) ? 1 : 2}>
        {shouldFinalWordsFrameBeVisible ? (
          <FinalWords />
        ) : (
          <Questionnaire
            userReachedTheEnd={() => setIsDataSendFormVisible(true)}
          />
        )}
        <Summary shouldRestrictHeight={!shouldFinalWordsFrameBeVisible} />
      </Box>
      {/* isDataSendFormVisible && (
        <SendEmailForm
          closeForm={() => setIsDataSendFormVisible(false)}
          onEmailSent={() => {
            setIsDataSendFormVisible(false);
            setShouldFinalWordsFrameBeVisible(true);
          }}
        />
      ) */}
    </>
  );
}
