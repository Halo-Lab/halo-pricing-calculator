import { JSX } from "react";

import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { Radio } from "../ui/Radio";
import { Option } from "../entities/option";
import { Checkbox } from "../ui/Checkbox";
import { Reference } from "../entities/entity";
import { useDispatch } from "../store/Provider";
import { useBreakpoints } from "../ui/Responsiveness";
import { RegularQuestion } from "../entities/question";
import { Icon, IconVariant } from "../components/icons";
import { Box, BoxDecoration } from "../ui/Box";
import { AddAnswer, RemoveAnswer } from "../store/actions";
import { spreadElementsAcrossColumns } from "./spreadElementsAcrossColumns";

interface RegularQuestionBlockProps {
  question: RegularQuestion;
  options: Array<Option>;
  selected: Set<Reference<Option>>;
}

export function RegularQuestionBlock({
  question,
  options,
  selected,
}: RegularQuestionBlockProps): JSX.Element {
  const dispatch = useDispatch();
  const { gte } = useBreakpoints();

  const optionElements = options.map((option) => {
    const isCurrentOptionChecked = selected.has(option.id);

    const optionContent = (
      <>
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
      </>
    );

    const optionDecoration = BoxDecoration()
      .borderWidth(0.125)
      .borderRadius(999)
      .borderColor(isCurrentOptionChecked ? Color.blue : Color.greyLight)
      .backgroundColor(
        isCurrentOptionChecked ? Color.homeBlue17 : Color.greyLight,
      );

    return question.multiple ? (
      <Checkbox
        key={option.id}
        checked={isCurrentOptionChecked}
        padding={
          option.icon ? [0.5, gte(525) ? 1.5 : 1, 0.5, 0.5] : [0.875, 1.5]
        }
        width="fill"
        spacing={0.75}
        onChange={() =>
          dispatch(
            isCurrentOptionChecked
              ? new RemoveAnswer(option.id)
              : new AddAnswer(option.id),
          )
        }
        decorations={optionDecoration}
      >
        {optionContent}
      </Checkbox>
    ) : (
      <Radio
        key={option.id}
        checked={isCurrentOptionChecked}
        groupId={question.id}
        padding={
          option.icon ? [0.5, gte(525) ? 1.5 : 1, 0.5, 0.5] : [0.875, 1.5]
        }
        width="fill"
        spacing={0.75}
        onChange={() => dispatch(new AddAnswer(option.id))}
        decorations={optionDecoration}
      >
        {optionContent}
      </Radio>
    );
  });

  return (
    <Box
      width="fill"
      spacing={gte(1050) ? 2 : 1.5}
      vertical
      padding={gte(1050) ? [4, 0, 0, 0] : undefined}
    >
      <Text
        width={gte(550) ? ".8fr" : undefined}
        size={gte(550) ? 2.125 : 1.5}
        weight={500}
        spacing={0.4}
        density={0.9973}
      >
        {question.text}
      </Text>

      {gte(680) ? (
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
  );
}
