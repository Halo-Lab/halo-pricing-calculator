import { Action } from "./Provider";
import { Option } from "../entities/option";
import { Reference } from "../entities/entity";
import { RegularQuestion } from "../entities/question";
import { createQuestionsSequence, createStore, Store } from "./definition";

export class ResetStore extends Action {
  override reduce(store: Store): Partial<Store> {
    return createStore();
  }
}

export class AddAnswer extends Action {
  constructor(private option: Reference<Option>) {
    super();
  }

  override reduce(store: Store): Partial<Store> {
    const answers = new Set(store.answers);
    const option = store.options.get(this.option)!;
    const question = store.questions.get(option.question)!;

    if (question instanceof RegularQuestion && !question.multiple) {
      question.options.forEach((optionReference) => {
        answers.delete(optionReference);
      });
    }

    answers.add(this.option);

    return {
      answers,
      questionsSequence: createQuestionsSequence(store.questions, answers),
    };
  }
}

export class RemoveAnswer extends Action {
  constructor(private option: Reference<Option>) {
    super();
  }

  override reduce(store: Store): Partial<Store> | void {
    const answers = new Set(store.answers);
    const wasRemoved = answers.delete(this.option);

    if (wasRemoved) {
      return {
        answers,
        questionsSequence: createQuestionsSequence(store.questions, answers),
      };
    }
  }
}

export class MoveToNextStep extends Action {
  override reduce(store: Store): Partial<Store> {
    return { currentStep: store.currentStep + 1 };
  }
}

export class MoveToPreviousStep extends Action {
  override reduce(store: Store): Partial<Store> {
    const answers = new Set(store.answers);
    const currentQuestion = store.questionsSequence[store.currentStep];

    if (currentQuestion instanceof RegularQuestion) {
      currentQuestion.options.forEach((option) => answers.delete(option));
    }

    return {
      answers,
      currentStep: store.currentStep - 1,
    };
  }
}
