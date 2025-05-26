import { JSX, useMemo } from "react";

import { Svg } from "../ui/Svg";
import { Color } from "../palettes/colours";
import { useSelector } from "../store/Provider";
import { ProgressChip } from "./ProgressChip";
import { SectionsList } from "./SectionsList";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";
import { FilesQuestionBlock } from "./FilesQuestionBlock";
import { QuestionGroupLabel } from "./QuestionGroupLabel";
import { QuestionnaireActions } from "./QuestionnaireActions";
import { RegularQuestionBlock } from "./RegularQuestionBlock";
import { Text, TextDecoration } from "../ui/Text";
import { ProjectFileAcceptance } from "../store/definition";
import { DescriptionQuestionBlock } from "./DescriptionQuestionBlock";
import {
  FilesQuestion,
  RegularQuestion,
  DescriptionQuestion,
} from "../entities/question";

interface QuestionnaireProps {
  returnToEntry: VoidFunction;
  userReachedTheEnd(): void;
}

export function Questionnaire({
  returnToEntry,
  userReachedTheEnd,
}: QuestionnaireProps): JSX.Element {
  const { gte, range } = useBreakpoints();

  const question = useSelector(
    (store) => store.questionsSequence[store.currentStep],
  );
  const options = useSelector((store) => store.options);
  const selected = useSelector((store) => store.answers);
  const totalSteps = useSelector((store) => store.questionsSequence.length);
  const description = useSelector((store) => store.projectDescription);
  const projectFiles = useSelector((store) => store.projectFiles);
  const currentStep = useSelector((store) => store.currentStep + 1);

  const supportedProjectFiles = useMemo(() => {
    return projectFiles?.filter(
      (file) => file.acceptance !== ProjectFileAcceptance.NotSupportedExtension,
    );
  }, [projectFiles]);

  const biggerWhiteBoxAreaOffset = gte(1730)
    ? 3.5
    : range(1470, 1730)
      ? 3
      : range(550, 1100)
        ? 1.5
        : 2.3;

  return (
    <Box
      width={gte(1200) ? ".71fr" : range(1100, 1200) ? ".7fr" : "fill"}
      padding={
        gte(450)
          ? [
              gte(1600)
                ? 2.2
                : range(1400, 1600)
                  ? 2
                  : range(1300, 1400)
                    ? 1.75
                    : range(1100, 1300)
                      ? 1.5
                      : 3.5,
              2.5,
              2.5,
            ]
          : [1.875, 1, 1, 1]
      }
      spacing={gte(1100) ? 1.75 : range(640, 1100) ? 4 : 2.75}
      vertical
      behindContent={
        <Box
          width="fill"
          height="fill"
          inFront={
            <Box
              width="fill"
              height={`1fr - ${biggerWhiteBoxAreaOffset}`}
              moveDown={biggerWhiteBoxAreaOffset}
              decorations={BoxDecoration()
                .backgroundColor(Color.white)
                .borderRadius(1)}
            />
          }
        >
          <Svg
            viewBox={
              gte(1100)
                ? "0 0 928 79"
                : range(550, 1100)
                  ? "0 0 704 63"
                  : "0 0 288 63"
            }
            width="fill"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={
                gte(1100)
                  ? "M720.827 7.06597C725.331 2.54276 731.451 0 737.834 0H904C917.255 0 928 10.7452 928 24V32V55C928 68.2548 917.255 79 904 79H23.5C10.5213 79 0 68.4787 0 55.5V55.5C0 42.5213 10.5213 32 23.5 32H686.029C692.412 32 698.532 29.4572 703.036 24.934L720.827 7.06597Z"
                  : range(550, 1100)
                    ? "M559.314 4.68629C562.314 1.68571 566.384 0 570.627 0H688C696.837 0 704 7.16344 704 16V16V47C704 55.8366 696.837 63 688 63H16C7.16343 63 0 55.8366 0 47V32C0 23.1634 7.16344 16 16 16H541.373C545.616 16 549.686 14.3143 552.686 11.3137L559.314 4.68629Z"
                    : "M193.422 4.65051C196.419 1.67183 200.474 0 204.699 0H272C280.837 0 288 7.16344 288 16V16V47C288 55.8366 280.837 63 272 63H16C7.16345 63 0 55.8366 0 47V32C0 23.1634 7.16344 16 16 16H175.402C179.628 16 183.682 14.3282 186.68 11.3495L193.422 4.65051Z"
              }
              fill="white"
            />
          </Svg>
        </Box>
      }
    >
      <Box width="fill" spacing={0.5}>
        {gte(1100) ? null : (
          <QuestionGroupLabel alignY="center" step="current">
            {question.title}
          </QuestionGroupLabel>
        )}
        {range(525, 1100) ? (
          <Text
            alignX="end"
            alignY="center"
            size={0.75}
            weight={500}
            density={1.035}
            decorations={TextDecoration().textTransform("uppercase")}
          >
            step
          </Text>
        ) : null}
        <ProgressChip alignX="end" current={currentStep} total={totalSteps} />
      </Box>

      <Box width="fill" spacing={gte(1100) ? 1.25 : undefined}>
        {gte(1100) ? (
          <>
            <SectionsList width={gte(1290) ? ".22fr" : ".25fr"} />
            <Box
              height="fill"
              width={0.0625}
              decorations={BoxDecoration().backgroundColor(Color.blueDark15)}
            />
          </>
        ) : null}
        <Box
          vertical
          padding={
            gte(1100) ? [0, 0, 0, range(1100, 1125) ? 0.75 : 1.25] : undefined
          }
          spacing={gte(1100) ? 2 : range(640, 1100) ? 4 : 2.75}
          width={gte(1290) ? ".78fr" : range(1100, 1290) ? ".75fr" : "fill"}
        >
          {question instanceof RegularQuestion ? (
            <RegularQuestionBlock
              options={options}
              question={question}
              selected={selected}
            />
          ) : question instanceof DescriptionQuestion ? (
            <DescriptionQuestionBlock
              question={question}
              description={description ?? ""}
            />
          ) : question instanceof FilesQuestion ? (
            <FilesQuestionBlock
              question={question}
              files={supportedProjectFiles ?? []}
            />
          ) : null}

          <QuestionnaireActions
            returnToEntry={returnToEntry}
            userReachedTheEnd={userReachedTheEnd}
            supportedProjectFiles={supportedProjectFiles}
          />
        </Box>
      </Box>
    </Box>
  );
}
