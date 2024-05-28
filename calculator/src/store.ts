import { store, Dispatch } from "@moru/store";

import { Option } from "./entities/option.js";
import { Estimate } from "./entities/estimate.js";
import { Reference } from "./entities/entity.js";
import { Dictionary } from "./dictionary.js";
import { options, questions, estimates } from "./data.js";
import {
  Question,
  QuestionVisibilityCondition,
  QuestionVisibilityDependencyState,
  QuestionVisibilityConditionsMatchRule,
} from "./entities/question.js";

export interface Comment {
  step: number;
  text: string;
}

export class Store {
  options: Dictionary<Option> = Dictionary.from(options);
  questions: Dictionary<Question> = Dictionary.from(questions);
  estimates: Dictionary<Estimate> = Dictionary.from(estimates);

  answers: Set<Reference<Option>> = new Set();
  comments: Comment[] = [];
  currentStep: number = 0;
  questionsByStep: Question[][] = createQuestionsSequence(this);
}

export abstract class Event {
  abstract reduce(
    store: Store,
    dispatch: Dispatch<Event>,
  ): null | void | undefined | Partial<Store>;
}

export class ResetEvent extends Event {
  override reduce(
    store: Store,
    dispatch: Dispatch<Event>,
  ): void | Partial<Store> | undefined | null {
    return new Store();
  }
}

export class AddAnswerEvent extends Event {
  constructor(private option: Reference<Option>) {
    super();
  }

  override reduce(
    store: Store,
    dispatch: Dispatch<Event>,
  ): void | Partial<Store> | undefined | null {
    store.answers.add(this.option);
    store.questionsByStep = createQuestionsSequence(store);
  }
}

export class RemoveAnswerEvent extends Event {
  constructor(private option: Reference<Option>) {
    super();
  }

  override reduce(
    store: Store,
    dispatch: Dispatch<Event>,
  ): void | Partial<Store> | undefined | null {
    const wasRemoved = store.answers.delete(this.option);

    if (wasRemoved) {
      store.questionsByStep = createQuestionsSequence(store);
    }
  }
}

export class AddCommentEvent extends Event {
  constructor(private text: string) {
    super();
  }

  override reduce(
    store: Store,
    dispatch: Dispatch<Event>,
  ): void | Partial<Store> | undefined | null {
    store.comments.push({
      step: store.currentStep,
      text: this.text,
    });
  }
}

export class MoveToNextStepEvent extends Event {
  override reduce(
    store: Store,
    dispatch: Dispatch<Event>,
  ): void | Partial<Store> | undefined | null {
    store.currentStep++;
  }
}

export class MoveToPreviousStepEvent extends Event {
  override reduce(
    store: Store,
    dispatch: Dispatch<Event>,
  ): void | Partial<Store> | undefined | null {
    store.questionsByStep[store.currentStep]?.forEach((question) =>
      question.options.forEach((option) => store.answers.delete(option)),
    );
    store.currentStep--;
  }
}

export const [StoreProvider, useStore] = store<Store, Event>(
  new Store(),
  (store, event, dispatch) => event.reduce(store, dispatch),
);

function createQuestionsSequence(store: Store): Question[][] {
  const allQuestions = Array.from<Question>(store.questions);

  const firstQuestion = allQuestions.find(
    (question) => !question.previous.length,
  );

  if (firstQuestion) {
    const questionsByStep: (Question[] | undefined)[] = [[firstQuestion]];

    groupQuestionsByStep(store, questionsByStep, firstQuestion);

    return questionsByStep.filter((questions): questions is Question[] =>
      Boolean(questions?.length),
    );
  } else {
    return [];
  }
}

function groupQuestionsByStep(
  store: Store,
  questionsByStep: (Question[] | undefined)[],
  currentQuestion: Question,
): void {
  currentQuestion.next.forEach((nextQuestionReference) => {
    const nextQuestion = store.questions.get(nextQuestionReference);

    const conditionalPreviousQuestion = nextQuestion?.previous.find(
      (rule) => rule.previous === currentQuestion.id,
    );

    if (conditionalPreviousQuestion) {
      const isPreviousQuestionAnswered = currentQuestion.options.some(
        (optionReference) => store.answers.has(optionReference),
      );
      let shouldNextQuestionBeIncluded = false;

      switch (conditionalPreviousQuestion.matchRule) {
        case QuestionVisibilityConditionsMatchRule.Or: {
          shouldNextQuestionBeIncluded =
            conditionalPreviousQuestion.conditions.some((condition) =>
              isConditionSatisfied(
                store,
                condition,
                isPreviousQuestionAnswered,
              ),
            );
          break;
        }
        case QuestionVisibilityConditionsMatchRule.And: {
          shouldNextQuestionBeIncluded =
            conditionalPreviousQuestion.conditions.every((condition) =>
              isConditionSatisfied(
                store,
                condition,
                isPreviousQuestionAnswered,
              ),
            );
          break;
        }
      }

      if (shouldNextQuestionBeIncluded) {
        questionsByStep[conditionalPreviousQuestion.step] ??= [];
        questionsByStep[conditionalPreviousQuestion.step]!.push(nextQuestion!);

        groupQuestionsByStep(store, questionsByStep, nextQuestion!);
      }
    }
  });
}

function isConditionSatisfied(
  store: Store,
  condition: QuestionVisibilityCondition,
  isPreviousQuestionAnswered: boolean,
): boolean {
  if (isPreviousQuestionAnswered) {
    const isIncludedDependentOptionSelected = store.answers.has(
      condition.option,
    );

    switch (condition.state) {
      case QuestionVisibilityDependencyState.Selected:
        return isIncludedDependentOptionSelected;
      case QuestionVisibilityDependencyState.NotSelected:
        return !isIncludedDependentOptionSelected;
    }
  } else {
    return true;
  }
}
