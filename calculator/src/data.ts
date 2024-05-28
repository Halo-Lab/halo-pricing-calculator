import { Option } from "./entities/option.js";
import { createId } from "./id.js";
import { Reference } from "./entities/entity.js";
import {
  Question,
  QuestionData,
  ConditionalPreviousQuestion,
} from "./entities/question.js";
import {
  Estimate,
  EstimateAssessment,
  EstimateRangeAssessment,
  EstimateExactAssessment,
} from "./entities/estimate.js";

export const options: Option[] = [];
export const questions: Question[] = [];
export const estimates: Estimate[] = [];

createQuestion({
  text: "What type of platforms do you need?",
  title: "Choose platform",
  options: [
    {
      text: "Website",
      estimates: [{ text: "", assessment: new EstimateExactAssessment(0) }],
    },
    {
      text: "Web application",
      estimates: [{ text: "", assessment: new EstimateExactAssessment(0) }],
    },
    {
      text: "Branding",
      estimates: [{ text: "", assessment: new EstimateExactAssessment(0) }],
    },
  ],
  multiple: true,
  previous: [],
});
createQuestion({
  text: "Which administration features do you need?",
  title: "Choose service",
  options: [
    {
      text: "Web design",
      estimates: [
        { text: "Research", assessment: new EstimateRangeAssessment(8, 16) },
        {
          text: "Design",
          assessment: new EstimateRangeAssessment(64, 80),
        },
      ],
    },
    {
      text: "Web development",
      estimates: [
        {
          text: "Research and project set-up",
          assessment: new EstimateRangeAssessment(8, 16),
        },
        {
          text: "Design",
          assessment: new EstimateRangeAssessment(64, 80),
        },
      ],
    },
    {
      text: "Digital marketing",
      estimates: [
        { text: "Research", assessment: new EstimateRangeAssessment(8, 16) },
        {
          text: "Design",
          assessment: new EstimateRangeAssessment(64, 80),
        },
      ],
    },
  ],
  previous: [
    new ConditionalPreviousQuestion({
      step: 1,
      previous: questions[0].id,
    }),
  ],
  multiple: true,
});

interface MinimalEstimate {
  text: string;
  assessment: EstimateAssessment;
}

interface MinimalOptionWithEstimates {
  text: string;
  estimates: MinimalEstimate[];
}

interface MinimalQuestionData
  extends Omit<QuestionData, "id" | "next" | "options"> {
  options: MinimalOptionWithEstimates[];
}

function createQuestion({
  options: minimalOptionsData,
  ...minimalData
}: MinimalQuestionData): void {
  const questionData: QuestionData = Object.assign(
    { id: createId<Reference<Question>>(), next: [], options: [] },
    minimalData,
  );

  const question = new Question(questionData);

  question.previous.forEach((condition) => {
    questions
      .find((question) => question.id === condition.previous)
      ?.next.push(question.id);
  });

  questions.push(question);

  minimalOptionsData.forEach(({ text, estimates: minimalEstimates }) => {
    const option = new Option({
      id: createId(),
      text,
      question: question.id,
      estimates: [],
    });

    question.options.push(option.id);

    options.push(option);

    minimalEstimates.forEach((minimalEstimate) => {
      const estimate = new Estimate({
        id: createId(),
        text: minimalEstimate.text,
        option: option.id,
        assessment: minimalEstimate.assessment,
      });

      option.estimates.push(estimate.id);

      estimates.push(estimate);
    });
  });
}
