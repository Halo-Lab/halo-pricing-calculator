import { Component, Show, memo, effect } from "moru";

import { Entry } from "./components/Entry/index.js";
import { Survey } from "./components/Survey/index.js";
import { Question } from "./entities/question.js";
import { useStore, ResetEvent } from "./store.js";
import { Switch, Case, Default } from "./components/Switch.js";

import "./Calculator.css";

export const Calculator: Component<{}> = () => {
  const [select, dispatch] = useStore();

  const questionsByStepAreCreated = select(
    (store) => store.questionsByStep.length,
  );

  effect(() => {
    return () => dispatch(new ResetEvent());
  });

  return (
    <Show when={questionsByStepAreCreated} fallback={"Loading..."}>
      <CalculatorBody />
    </Show>
  );
};

const CalculatorBody: Component<{}> = () => {
  const [select] = useStore();

  const currentStep = select((store) => store.currentStep);
  const questionsByStep = select((store) => store.questionsByStep);

  const firstQuestion = memo(() => questionsByStep()[0][0], [questionsByStep]);
  const currentQuestions = memo<Question[] | undefined>(
    () => questionsByStep()[currentStep()],
    [currentStep],
  );

  return (
    <main data-step={currentStep}>
      <Switch value={currentStep}>
        <Case when={0}>
          <Entry question={firstQuestion} />
        </Case>
        <Default>
          <Survey questions={currentQuestions} />
        </Default>
      </Switch>
    </main>
  );
};
