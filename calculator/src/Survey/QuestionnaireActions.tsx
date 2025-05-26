import { JSX, useRef, useMemo, useState, useEffect } from "react";

import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { ProjectFile } from "../store/definition";
import { useBreakpoints } from "../ui/Responsiveness";
import { AnimatedButton } from "../components/AnimatedButton";
import { Box, BoxDecoration } from "../ui/Box";
import { useSelector, useDispatch } from "../store/Provider";
import { useApplicationContainer } from "../ApplicationContainerRefProvider";
import {
  MoveToNextStep,
  MoveToPreviousStep,
  RemoveAnswers,
} from "../store/actions";
import {
  FilesQuestion,
  RegularQuestion,
  DescriptionQuestion,
} from "../entities/question";

interface QuestionnaireActionsProps {
  returnToEntry: VoidFunction;
  userReachedTheEnd(): void;
  supportedProjectFiles?: Array<ProjectFile>;
}

export function QuestionnaireActions({
  returnToEntry,
  userReachedTheEnd,
  supportedProjectFiles,
}: QuestionnaireActionsProps): JSX.Element {
  const actionsContainerRef = useRef<HTMLElement>(null);
  const [areActionsSticky, setAreActionsSticky] = useState(false);

  const dispatch = useDispatch();
  const container = useApplicationContainer();
  const { lt, gte, range } = useBreakpoints();

  const question = useSelector(
    (store) => store.questionsSequence[store.currentStep],
  );
  const selected = useSelector((store) => store.answers);
  const totalSteps = useSelector((store) => store.questionsSequence.length);
  const description = useSelector((store) => store.projectDescription);
  const currentStep = useSelector((store) => store.currentStep + 1);
  const projectFiles = useSelector((store) => store.projectFiles);

  const isUserAbleToMoveFurther = useMemo(() => {
    return (
      question.optional ||
      (question instanceof RegularQuestion
        ? question.options.some((reference) => selected.has(reference))
        : question instanceof DescriptionQuestion
          ? description
          : true)
    );
  }, [question, selected, description]);

  const isUserAtTheEndOfQuestionsSequence =
    isUserAbleToMoveFurther && currentStep === totalSteps;

  const intersectionObserver = useMemo(() => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setAreActionsSticky(entry.intersectionRatio < 1);
        });
      },
      { threshold: 1 },
    );
  }, []);

  useEffect(() => {
    if (actionsContainerRef.current) {
      intersectionObserver.observe(actionsContainerRef.current);

      return () => {
        intersectionObserver.disconnect();
      };
    }
  }, [intersectionObserver]);

  return (
    <Box
      ref={actionsContainerRef}
      width="fill"
      vertical={lt(540)}
      reverse={lt(540)}
      spacing={gte(1250) ? 1.5 : range(1100, 1250) ? 1 : 0.75}
      padding={[areActionsSticky ? 1 : 0, 0]}
      decorations={BoxDecoration().transitionDuration("0s")}
      _extend={{
        style: {
          position: "sticky",
          bottom: "-1px",
          backgroundColor: Color.white,
        },
      }}
    >
      <AnimatedButton
        width={gte(540) ? undefined : "fill"}
        variant="secondary-light"
        onPress={() => {
          if (currentStep === 1) {
            dispatch(new RemoveAnswers());
            returnToEntry();
          } else {
            dispatch(new MoveToPreviousStep());
          }
        }}
      >
        back
      </AnimatedButton>

      <Box
        alignX="end"
        spacing={gte(540) ? 1.5 : 0.35}
        width={gte(540) ? undefined : "fill"}
        vertical={lt(540)}
        reverse={gte(540)}
      >
        <AnimatedButton
          width="fill"
          variant="primary"
          disabled={!isUserAbleToMoveFurther}
          onPress={() => {
            if (isUserAtTheEndOfQuestionsSequence) {
              userReachedTheEnd();
            } else if (isUserAbleToMoveFurther) {
              dispatch(new MoveToNextStep());
            } else if (import.meta.env.DEV) {
              // TODO: show a tooltip that user has to select something
              console.warn(
                "You really need to implement a hint for the user that he/she needs to select at least one option.",
              );
            }

            container.alignUIForMaximumComfortableVisibility();
          }}
          _extend={{
            // Attach this attribute at the end so Webflow can react on it.
            // @ts-expect-error data attributes are added to the extend interface
            "data-remodal-target": isUserAtTheEndOfQuestionsSequence
              ? "calculator"
              : undefined,
          }}
        >
          {isUserAtTheEndOfQuestionsSequence ? "get an estimate" : "next"}
        </AnimatedButton>

        {question instanceof FilesQuestion &&
        projectFiles?.length !== supportedProjectFiles?.length ? (
          <Text
            size={0.875}
            alignY="center"
            alignX={lt(540) ? "center" : undefined}
            color={Color.red}
            breaking="forbid"
          >
            Please upload a *.png *.jpeg *.pdf files
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}
