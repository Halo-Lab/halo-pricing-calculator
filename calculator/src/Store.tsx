import {
  JSX,
  Reducer,
  Dispatch,
  useContext,
  useReducer,
  createContext,
  PropsWithChildren,
} from "react";

import { Option } from "./entities/option";
import { Estimate } from "./entities/estimate";
import { Reference } from "./entities/entity";
import { Dictionary } from "./dictionary";
import { Question, QuestionStep } from "./entities/question";
import { options, questions, estimates } from "./data";

const StoreContext = createContext<[Store, Dispatch<Action>]>(null!);

export function StoreProvider({ children }: PropsWithChildren): JSX.Element {
  const [store, dispatch] = useReducer<Reducer<Store, Action>, null>(
    (prevState, action) => {
      const nextState = action.reduce(prevState);

      return nextState
        ? {
            ...prevState,
            ...nextState,
          }
        : prevState;
    },
    null,
    createStore,
  );

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

export function useSelector<R>(selector: (store: Store) => R): R {
  const [store] = useContext(StoreContext);

  return selector(store);
}

export function useDispatch(): Dispatch<Action> {
  return useContext(StoreContext)[1];
}

export interface Comment {
  step: number;
  text: string;
}

export interface Store {
  options: Dictionary<Option>;
  questions: Dictionary<Question>;
  estimates: Dictionary<Estimate>;

  answers: Set<Reference<Option>>;
  comments: Comment[];
  currentStep: number;
  questionsByStep: Question[][];
}

function createStore(): Store {
  const answers = new Set<Reference<Option>>();
  const questionsDictionary = Dictionary.from(questions);

  return {
    options: Dictionary.from(options),
    questions: questionsDictionary,
    estimates: Dictionary.from(estimates),

    answers,
    comments: [],
    currentStep: 0,
    questionsByStep: createQuestionsSequence(questionsDictionary, answers),
  };
}

export abstract class Action {
  abstract reduce(store: Store): Partial<Store> | void | undefined | null;
}

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
    const questionReference = store.options.get(this.option)!.question;

    const question = store.questions.get(questionReference)!;

    if (!question.multiple) {
      question.options.forEach((optionReference) => {
        store.answers.delete(optionReference);
      });
    }

    const answers = new Set(store.answers.add(this.option));

    return {
      answers,
      questionsByStep: createQuestionsSequence(store.questions, answers),
    };
  }
}

export class RemoveAnswer extends Action {
  constructor(private option: Reference<Option>) {
    super();
  }

  override reduce(store: Store): Partial<Store> | void {
    const wasRemoved = store.answers.delete(this.option);

    if (wasRemoved) {
      const answers = new Set(store.answers);

      return {
        answers,
        questionsByStep: createQuestionsSequence(store.questions, answers),
      };
    }
  }
}

export class AddComment extends Action {
  constructor(private text: string) {
    super();
  }

  override reduce(store: Store): Partial<Store> {
    return {
      comments: store.comments.concat({
        step: store.currentStep,
        text: this.text,
      }),
    };
  }
}

export class RemoveComment extends Action {
  override reduce(store: Store): Partial<Store> {
    return {
      comments: store.comments.filter(
        (comment) => comment.step !== store.currentStep,
      ),
    };
  }
}

export class MoveToNextStep extends Action {
  override reduce(store: Store): Partial<Store> {
    return { currentStep: store.currentStep + 1 };
  }
}

export class MoveToPreviousStep extends Action {
  override reduce(store: Store): Partial<Store> {
    store.questionsByStep[store.currentStep]?.forEach((question) =>
      question.options.forEach((option) => store.answers.delete(option)),
    );

    return {
      answers: new Set(store.answers),
      currentStep: store.currentStep - 1,
    };
  }
}

function createQuestionsSequence(
  questions: Dictionary<Question>,
  answers: Set<Reference<Option>>,
): Question[][] {
  const allQuestions = Array.from<Question>(questions);

  const firstQuestion = allQuestions.find(
    (question) => !question.previous.length,
  );

  if (firstQuestion) {
    const questionsByStep: (Question[] | undefined)[] = [[firstQuestion]];

    groupQuestionsByStep(questions, answers, questionsByStep, firstQuestion, 0);

    return questionsByStep.filter((questions): questions is Question[] =>
      Boolean(questions?.length),
    );
  } else {
    return [];
  }
}

function groupQuestionsByStep(
  questions: Dictionary<Question>,
  answers: Set<Reference<Option>>,
  questionsByStep: (Question[] | undefined)[],
  currentQuestion: Question,
  currentQuestionPosition: number,
): void {
  currentQuestion.next.forEach((nextQuestionReference) => {
    const nextQuestion = questions.get(nextQuestionReference);

    const previousQuestionConditionalLink = nextQuestion?.previous.find(
      (rule) => rule.question === currentQuestion.id,
    );

    if (previousQuestionConditionalLink) {
      const shouldNextQuestionBeIncluded =
        previousQuestionConditionalLink.matches(answers);

      if (shouldNextQuestionBeIncluded) {
        let nextQuestionPosition = currentQuestionPosition;

        switch (previousQuestionConditionalLink.step) {
          case QuestionStep.New: {
            nextQuestionPosition += 1;
            (questionsByStep[nextQuestionPosition] ??= []).push(nextQuestion!);
            break;
          }
          case QuestionStep.Same: {
            questionsByStep[nextQuestionPosition]!.push(nextQuestion!);
            break;
          }
        }

        groupQuestionsByStep(
          questions,
          answers,
          questionsByStep,
          nextQuestion!,
          nextQuestionPosition,
        );
      }
    }
  });
}
