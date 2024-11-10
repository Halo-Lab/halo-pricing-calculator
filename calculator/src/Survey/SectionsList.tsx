import { JSX } from "react";

import { useSelector } from "../store/Provider";
import { Box, BoxProps } from "../ui/Box";
import { QuestionGroupLabel } from "./QuestionGroupLabel";

interface SectionsList {
  list: Set<string>;
  currentQuestionIndex: number;
}

export interface SectionsListProps
  extends Omit<BoxProps, "vertical" | "spacing"> {}

export function SectionsList(props: SectionsListProps): JSX.Element {
  const { list, currentQuestionIndex } = useSelector((store) => {
    return store.questionsSequence.reduce<SectionsList>(
      (accumulator, question, index) => {
        accumulator.list.add(question.title);

        if (store.currentStep === index) {
          accumulator.currentQuestionIndex = accumulator.list.size - 1;
        }

        return accumulator;
      },
      { list: new Set(), currentQuestionIndex: 0 },
    );
  });

  return (
    <Box vertical spacing={1} {...props}>
      {Array.from(list).map((title, index) => (
        <QuestionGroupLabel
          step={
            index < currentQuestionIndex
              ? "past"
              : index === currentQuestionIndex
                ? "current"
                : "future"
          }
          key={title}
        >
          {title}
        </QuestionGroupLabel>
      ))}
    </Box>
  );
}
