import { JSX } from "react";

import { Box } from "../ui/Box";
import { Color } from "../palettes/colours";
import { Option } from "../entities/option";
import { Reference } from "../entities/entity";
import { Dictionary } from "../dictionary";
import { useDispatch } from "../store/Provider";
import { useBreakpoints } from "../ui/Responsiveness";
import { RegularQuestion } from "../entities/question";
import { Icon, IconVariant } from "../components/icons";
import { Text, TextDecoration } from "../ui/Text";
import { AddAnswer, RemoveAnswer } from "../store/actions";
import { Button, ButtonDecoration } from "../ui/Button";
import { spreadElementsAcrossColumns } from "./spreadElementsAcrossColumns";

interface RegularQuestionBlockProps {
  question: RegularQuestion;
  options: Dictionary<Option>;
  selected: Set<Reference<Option>>;
}

export function RegularQuestionBlock({
  question,
  options,
  selected,
}: RegularQuestionBlockProps): JSX.Element {
  const dispatch = useDispatch();
  const { gte, range } = useBreakpoints();

  const optionElements = question.options.map((reference) => {
    const option = options.get(reference)!;
    const isCurrentOptionChecked = selected.has(option.id);

    const buttonDecoration = ButtonDecoration()
      .borderWidth(0.125)
      .borderRadius(999)
      .borderColor(isCurrentOptionChecked ? Color.blue : Color.greyLight)
      .backgroundColor(
        isCurrentOptionChecked ? Color.homeBlue17 : Color.greyLight,
      );

    return (
      <Button
        key={option.id}
        padding={
          option.icon ? [0.5, gte(525) ? 1.5 : 1, 0.5, 0.5] : [0.875, 1.5]
        }
        width="fill"
        spacing={0.75}
        onPress={() => {
          dispatch(
            isCurrentOptionChecked
              ? new RemoveAnswer(option.id)
              : new AddAnswer(option.id),
          );
        }}
        decorations={buttonDecoration}
      >
        {option.icon && (
          <Icon
            width={2.5}
            height={2.5}
            variant={option.icon as IconVariant}
            color={isCurrentOptionChecked ? Color.blue : Color.white}
            invertColor={isCurrentOptionChecked ? Color.white : Color.blue}
          />
        )}
        <Text
          alignY="center"
          size={gte(550) ? 1 : 0.75}
          weight={500}
          spacing={0.6}
          color={isCurrentOptionChecked ? Color.homeBlue : undefined}
          decorations={TextDecoration().flex(1)}
        >
          {option.text}
        </Text>
        <Icon
          alignY="center"
          alignX="end"
          width={1.25}
          height={1.25}
          variant="check"
          color={isCurrentOptionChecked ? Color.homeBlue : Color.transparent}
        />
      </Button>
    );
  });

  return (
    <Box
      width="fill"
      minHeight={
        gte(1600)
          ? 21.3
          : range(1400, 1600)
            ? 21.5
            : range(1300, 1400)
              ? 21.75
              : range(1100, 1300)
                ? 22
                : undefined
      }
    >
      <Box vertical spacing={gte(1100) ? 2 : 1.5} alignY="center" width="fill">
        <Text
          width={gte(550) ? ".8fr" : undefined}
          size={gte(550) ? 2.125 : 1.5}
          weight={500}
          spacing={0.4}
          density={0.9973}
        >
          {question.text}
        </Text>

        {gte(680) && question.options.length > 3 ? (
          (() => {
            const [firstColumn, secondColumn] =
              spreadElementsAcrossColumns(optionElements);

            return (
              <Box width="fill" spacing={1}>
                <Box width=".5fr" spacing={1} vertical>
                  {firstColumn}
                </Box>
                <Box width=".5fr" spacing={1} vertical>
                  {secondColumn}
                </Box>
              </Box>
            );
          })()
        ) : (
          <Box vertical width="fill" spacing={0.5}>
            {optionElements}
          </Box>
        )}
      </Box>
    </Box>
  );
}
