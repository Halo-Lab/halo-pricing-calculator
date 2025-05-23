import { JSX, useEffect, useState } from "react";

import { Box } from "../ui/Box";
import { Summary } from "./Summary";
import { FinalWords } from "./FinalWords";
import { useStore } from "../store/Provider";
import { Questionnaire } from "./Questionnaire";
import { useBreakpoints } from "../ui/Responsiveness";
import { sendProjectEstimatesAndAccompanyingData } from "./sendProjectEstimatesAndAccompanyingData";

declare namespace globalThis {
  interface OnEstimateSent {
    (name: string, email: string): Promise<void>;
    (
      name: string,
      email: string,
      phone: string,
      countryCode: string,
    ): Promise<void>;
  }

  let onEstimateSent: OnEstimateSent | undefined;
}

interface SurveyProps {
  returnToEntry: VoidFunction;
}

export function Survey({ returnToEntry }: SurveyProps): JSX.Element {
  const [isDataSendFormVisible, setIsDataSendFormVisible] = useState(false);
  const [dataForFinalWordsFrame, setDataForFinalWordsFrame] =
    useState<string>();

  const store = useStore();
  const { lt } = useBreakpoints();

  useEffect(() => {
    if (isDataSendFormVisible) {
      const onEstimateSent = async (
        name: string,
        email: string,
        phone?: string,
        countryCode?: string,
      ): Promise<void> => {
        await sendProjectEstimatesAndAccompanyingData(
          store,
          name,
          email,
          phone,
          countryCode,
        );

        setIsDataSendFormVisible(false);
        setDataForFinalWordsFrame(email);
      };

      globalThis.onEstimateSent = onEstimateSent;

      return () => {
        delete globalThis.onEstimateSent;
      };
    }
  }, [isDataSendFormVisible, store]);

  return (
    <Box width="fill" vertical={lt(1100)} spacing={lt(1100) ? 1 : 2}>
      {dataForFinalWordsFrame ? (
        <FinalWords email={dataForFinalWordsFrame} />
      ) : (
        <Questionnaire
          returnToEntry={returnToEntry}
          userReachedTheEnd={() => setIsDataSendFormVisible(true)}
        />
      )}
      <Summary />
    </Box>
  );
}
