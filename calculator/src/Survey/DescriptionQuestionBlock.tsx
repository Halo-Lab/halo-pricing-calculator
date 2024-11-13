import { JSX } from "react";

import { Box } from "../ui/Box";
import { Svg } from "../ui/Svg";
import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { useDispatch } from "../store/Provider";
import { FloatingInput } from "../components/FloatingInput";
import { useBreakpoints } from "../ui/Responsiveness";
import { DescriptionQuestion } from "../entities/question";
import { AddProjectDescription } from "../store/actions";

interface DescriptionQuestionBlockProps {
  question: DescriptionQuestion;
  description: string;
}

export function DescriptionQuestionBlock({
  question,
  description,
}: DescriptionQuestionBlockProps): JSX.Element {
  const { gte, range } = useBreakpoints();
  const dispatch = useDispatch();

  return (
    <Box vertical spacing={2} width="fill">
      <Box
        vertical
        spacing={1.5}
        maxWidth={
          gte(1825)
            ? ".64fr"
            : range(1650, 1750)
              ? ".65fr"
              : range(1470, 1650)
                ? ".73fr"
                : range(1300, 1350)
                  ? ".85fr"
                  : range(950, 1050)
                    ? ".55fr"
                    : range(750, 950)
                      ? ".7fr"
                      : range(525, 750) || range(1350, 1470)
                        ? ".8fr"
                        : "fill"
        }
      >
        <Text size={1.5} spacing={0.4} weight={500}>
          {question.text}
        </Text>
        <Text spacing={0.6} color={Color.blueDark70}>
          {question.helpMessage}
        </Text>
        <Box width="fill" spacing={0.75} vertical>
          {question.helpPoints.map((helpPoint, index) => {
            return (
              <Box key={index} spacing={0.875}>
                <Svg
                  width={0.75}
                  height={0.75}
                  alignY="center"
                  viewBox="0 0 12 12"
                  color={Color.blueDark70}
                >
                  <path
                    opacity="0.7"
                    d="M5.7608 0.14975C5.8505 -0.0499168 6.1495 -0.0499168 6.2392 0.14975C7.33555 2.66556 9.33887 4.66223 11.8505 5.7604C12.0498 5.85025 12.0498 6.14975 11.8505 6.2396C9.33887 7.32779 7.33555 9.33444 6.2392 11.8503C6.1495 12.0499 5.8505 12.0499 5.7608 11.8503C4.66445 9.33444 2.66113 7.33777 0.149502 6.2396C-0.0498339 6.14975 -0.0498339 5.85025 0.149502 5.7604C2.66113 4.67221 4.66445 2.66556 5.7608 0.14975Z"
                    fill="#02021E"
                  />
                </Svg>
                <Text width="fill" spacing={0.6} color={Color.blueDark70}>
                  {helpPoint}
                </Text>
              </Box>
            );
          })}
        </Box>
      </Box>

      <FloatingInput
        type="text"
        value={description}
        label="About the project"
        required={!question.optional}
        multiline
        onChange={(event) =>
          dispatch(new AddProjectDescription(event.currentTarget.value))
        }
      />
    </Box>
  );
}
