import { JSX } from "react";

import { Box } from "../ui/Box";
import { LeftCard } from "./LeftCard";
import { RightCard } from "./RightCard";
import { useSelector } from "../store/Provider";
import { useBreakpoints } from "../ui/Responsiveness";
import { RegularQuestion } from "../entities/question";

interface EntryProperties {}

export function Entry({}: EntryProperties): JSX.Element {
  const { lt } = useBreakpoints();
  const firstQuestion = useSelector((store) => store.questionsSequence[0]);

  const isUpToSmallTablet = lt(680);

  return (
    <Box spacing={lt(725) ? 1 : 2} width="fill" vertical={isUpToSmallTablet}>
      <LeftCard />
      <RightCard question={firstQuestion as RegularQuestion} />
    </Box>
  );
}
