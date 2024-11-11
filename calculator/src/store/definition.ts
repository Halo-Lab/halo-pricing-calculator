import { Option } from "../entities/option";
import { Estimate } from "../entities/estimate";
import { Question } from "../entities/question";
import { Reference } from "../entities/entity";
import { Dictionary } from "../dictionary";
import { estimates, options, questions } from "../data";

export interface Store {
  options: Dictionary<Option>;
  questions: Dictionary<Question>;
  estimates: Dictionary<Estimate>;

  answers: Set<Reference<Option>>;
  projectFiles?: Array<File>;
  projectDescription?: string;
  currentStep: number;
  questionsSequence: Array<Question>;
}

export function createStore(): Store {
  const answers = new Set<Reference<Option>>();
  const questionsDictionary = Dictionary.from(questions);

  return {
    options: Dictionary.from(options),
    questions: questionsDictionary,
    estimates: Dictionary.from(estimates),

    answers,
    currentStep: 0,
    questionsSequence: createQuestionsSequence(questionsDictionary, answers),
  };
}

export function createQuestionsSequence(
  questions: Dictionary<Question>,
  answers: Set<Reference<Option>>,
): Question[] {
  const allQuestions = Array.from(questions);

  const firstQuestion = allQuestions.find(
    (question) => !question.previous.length,
  );

  if (firstQuestion) {
    const sequence: Question[] = [firstQuestion];

    fillQuestionsSequence(questions, answers, sequence, firstQuestion);

    return sequence;
  } else {
    return [];
  }
}

function fillQuestionsSequence(
  questions: Dictionary<Question>,
  answers: Set<Reference<Option>>,
  sequence: Array<Question>,
  currentQuestion: Question,
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
        sequence.push(nextQuestion!);

        fillQuestionsSequence(questions, answers, sequence, nextQuestion!);
      }
    }
  });
}
