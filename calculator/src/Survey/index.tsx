import { JSX, useState } from "react";

import { Box } from "../ui/Box";
import { Summary } from "./Summary";
import { FinalWords } from "./FinalWords";
import { Questionnaire } from "./Questionnaire";
import { SendEmailForm } from "./SendEmailForm";
import { useBreakpoints } from "../ui/Responsiveness";

export function Survey(): JSX.Element {
  const { lt } = useBreakpoints();
  const [isDataSendFormVisible, setIsDataSendFormVisible] = useState(false);
  const [shouldFinalWordsFrameBeVisible, setShouldFinalWordsFrameBeVisible] =
    useState(false);

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
      {isDataSendFormVisible && (
        <SendEmailForm
          closeForm={() => setIsDataSendFormVisible(false)}
          onEmailSent={() => {
            setIsDataSendFormVisible(false);
            setShouldFinalWordsFrameBeVisible(true);
          }}
        />
      )}
    </>
  );
}
