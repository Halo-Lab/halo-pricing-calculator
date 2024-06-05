import { Option } from "./entities/option.js";
import { createId } from "./id.js";
import { Reference } from "./entities/entity.js";
import { Or, And, Not, Selected } from "./entities/condition.js";
import {
  Question,
  QuestionData,
  QuestionStep,
  PreviousQuestionConditionalLink,
} from "./entities/question.js";
import {
  Estimate,
  EstimateAssessment,
  EstimateRangeAssessment,
  EstimateExactAssessment,
  EstimationOperationKind,
  EstimateUnknownAssessment,
} from "./entities/estimate.js";

export const options: Option[] = [];
export const questions: Question[] = [];
export const estimates: Estimate[] = [];

/* 0 */ createQuestion({
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
/* 1 */ createQuestion({
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
      text: "Branding and marketing",
      estimates: [
        {
          text: "Branding",
          assessment: new EstimateUnknownAssessment(),
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
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[0].id,
      condition: new Selected(questions[0].options[0]),
    }),
  ],
  multiple: true,
});
// Web design
/* 2 */ createQuestion({
  text: "What type of website do you need?",
  title: "Type",
  options: [
    {
      text: "Landing page",
      estimates: [
        {
          text: "Landing page",
          assessment: new EstimateRangeAssessment(80, 100),
        },
      ],
    },
    {
      text: "Corporate website",
      estimates: [
        {
          text: "Corporate website",
          assessment: new EstimateRangeAssessment(160, 200),
        },
      ],
    },
    {
      text: "E-commerce",
      estimates: [
        {
          text: "E-commerce",
          assessment: new EstimateRangeAssessment(180, 240),
        },
      ],
    },
    {
      text: "I don't know",
      estimates: [
        {
          text: "I don't know",
          assessment: new EstimateRangeAssessment(80, 100),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[1].id,
      condition: new Selected(questions[1].options[0]),
    }),
  ],
});
/* 3 */ createQuestion({
  text: "Approximately how many pages will your website have?",
  title: "Web Design",
  options: [
    {
      text: "<5 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "6-10 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(16, 52),
        },
      ],
    },
    {
      text: "11-20 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(52, 100),
        },
      ],
    },
    {
      text: ">20 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(120, 200),
        },
      ],
    },
    {
      text: "I don't know",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[2].id,
      condition: new Or(
        new Selected(questions[2].options[1]),
        new Selected(questions[2].options[2]),
      ),
    }),
  ],
});
/* 4 */ createQuestion({
  text: "What level of customisation would you like?",
  options: [
    {
      text: "Templates with custom hero sections",
      estimates: [
        {
          text: "Customization",
          assessment: new EstimateExactAssessment(0, {
            condition: new Or(
              questions[3].options
                .slice(0, -1)
                .map((option) => new Selected(option)),
            ),
          }),
        },
        {
          text: "Customization",
          assessment: new EstimateUnknownAssessment({
            condition: new Selected(questions[3].options.at(-1)!),
          }),
        },
      ],
    },
    {
      text: "Homepage, basic inner pages",
      estimates: [
        {
          text: "Customization",
          assessment: new EstimateExactAssessment(24, {
            condition: new Or(
              questions[3].options
                .slice(0, -1)
                .map((option) => new Selected(option)),
            ),
          }),
        },
        {
          text: "Customization",
          assessment: new EstimateUnknownAssessment({
            condition: new Selected(questions[3].options.at(-1)!),
          }),
        },
      ],
    },
    {
      text: "All pages should be custom",
      estimates: [
        {
          text: "Customization",
          assessment: new EstimateExactAssessment(40, {
            condition: new Selected(questions[3].options[0]),
          }),
        },
        {
          text: "Customization",
          assessment: new EstimateExactAssessment(1.25, {
            condition: new Or(
              questions[3].options
                .slice(1, -1)
                .map((option) => new Selected(option)),
            ),
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
        {
          text: "Customization",
          assessment: new EstimateUnknownAssessment({
            condition: new Selected(questions[3].options.at(-1)!),
          }),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[3].id,
    }),
  ],
});
/* 5 */ createQuestion({
  text: "Is it a new site or a redesign?",
  options: [
    {
      text: "Redesign of a current one",
      estimates: [
        {
          text: "Re-/Design",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "New website",
      estimates: [
        {
          text: "Re-/Design",
          assessment: new EstimateRangeAssessment(16, 24),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[4].id,
      condition: new Or(
        new Selected(questions[2].options[0]),
        new Selected(questions[2].options[3]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[2].id,
      condition: new Not(
        new Or(
          new Selected(questions[2].options[0]),
          new Selected(questions[2].options[3]),
        ),
      ),
    }),
  ],
});
/* 6 */ createQuestion({
  text: "Do you have a content?",
  options: [
    {
      text: "Yes",
      estimates: [
        { text: "Content", assessment: new EstimateExactAssessment(0) },
      ],
    },
    {
      text: "Not sure, but I will prepare it",
      estimates: [
        { text: "Content", assessment: new EstimateExactAssessment(0) },
      ],
    },
    {
      text: "No, I need content writing",
      estimates: [
        { text: "Content", assessment: new EstimateRangeAssessment(24, 32) },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[5].id,
    }),
  ],
});
/* 7 */ createQuestion({
  text: "Do you have wireframes?",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Wireframes",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "Wireframes",
          assessment: new EstimateExactAssessment(16),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[6].id,
    }),
  ],
});
/* 8 */ createQuestion({
  text: "Do you need custom illustrations?",
  options: [
    {
      text: "No, we can use stock photo",
      estimates: [
        {
          text: "Illustrations",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "I would like to have some icons",
      estimates: [
        {
          text: "Illustrations",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
    {
      text: "Custom illustrations and icons",
      estimates: [
        {
          text: "Illustrations",
          assessment: new EstimateRangeAssessment(20, 40),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[7].id,
    }),
  ],
});
/* 9 */ createQuestion({
  text: "Do you need custom 3D Graphics?",
  options: [
    {
      text: "No, we can use stock objects",
      estimates: [
        {
          text: "3D Graphics",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "I want custom 3D elements",
      estimates: [
        {
          text: "3D Graphics",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
    {
      text: "I want complex 3D objects",
      estimates: [
        {
          text: "3D Graphics",
          assessment: new EstimateRangeAssessment(20, 40),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[8].id,
    }),
  ],
});
// Web development
/* 10 */ createQuestion({
  text: "What type of website do you need?",
  title: "Type",
  options: [
    {
      text: "Landing page",
      estimates: [
        {
          text: "Landing page",
          assessment: new EstimateExactAssessment(80),
        },
      ],
    },
    {
      text: "Corporate website",
      estimates: [
        {
          text: "Corporate website",
          assessment: new EstimateRangeAssessment(80, 180),
        },
      ],
    },
    {
      text: "E-commerce",
      estimates: [
        {
          text: "E-commerce",
          assessment: new EstimateRangeAssessment(160, 220),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[1].id,
      condition: new And(
        new Selected(questions[1].options[1]),
        new Not(new Selected(questions[1].options[0])),
      ),
    }),
  ],
});
/* 11 */ createQuestion({
  text: "Approximately how many pages will your website have?",
  options: [
    {
      text: "<5 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "6-10 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(40, 100),
        },
      ],
    },
    {
      text: "11-20 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(72, 220),
        },
      ],
    },
    {
      text: ">20 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(200, 300),
        },
      ],
    },
    {
      text: "I don't know",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[10].id,
    }),
  ],
});
/* 12 */ createQuestion({
  text: "What level of interactivity and motion would you like to have?",
  title: "Development",
  options: [
    {
      text: "Standard",
      estimates: [
        {
          text: "Interactive elements",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Advanced",
      estimates: [
        {
          text: "Interactive elements",
          assessment: new EstimateExactAssessment(0.2, {
            operationKind: EstimationOperationKind.Multiplication,
            minimalDelta: 20,
          }),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[11].id,
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[9].id,
    }),
  ],
});
/* 13 */ createQuestion({
  text: "What technical stack do you prefer for website development?",
  options: [
    {
      text: "No-code (Webflow)",
      estimates: [
        {
          text: "Technical stack",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "Custom development, without CMS",
      estimates: [
        {
          text: "Technical stack",
          assessment: new EstimateExactAssessment(24, {
            condition: new Or(
              new Selected(questions[2].options[0]),
              new Selected(questions[10].options[0]),
            ),
          }),
        },
      ],
    },
    {
      text: "Custom JS/React development with CMS",
      estimates: [
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(24, 48, {
            condition: new Or(
              new Selected(questions[2].options[0]),
              new Selected(questions[10].options[0]),
            ),
          }),
        },
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(40, 64, {
            condition: new And(
              new Or(
                new Selected(questions[2].options[2]),
                new Selected(questions[10].options[2]),
              ),
              new Or(
                new Selected(questions[3].options[0]),
                new Selected(questions[11].options[0]),
              ),
            ),
          }),
        },
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(80, 120, {
            condition: new And(
              new Or(
                new Selected(questions[2].options[2]),
                new Selected(questions[10].options[2]),
              ),
              new Or(
                new Selected(questions[3].options[1]),
                new Selected(questions[11].options[1]),
              ),
            ),
          }),
        },
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(80, 160, {
            condition: new And(
              new Or(
                new Selected(questions[2].options[2]),
                new Selected(questions[10].options[2]),
              ),
              new Or(
                new Selected(questions[3].options[2]),
                new Selected(questions[11].options[2]),
              ),
            ),
          }),
        },
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(160, 240, {
            condition: new And(
              new Or(
                new Selected(questions[2].options[2]),
                new Selected(questions[10].options[2]),
              ),
              new Or(
                new Selected(questions[3].options[3]),
                new Selected(questions[11].options[3]),
              ),
            ),
          }),
        },
      ],
    },
    {
      text: "I don't know",
      estimates: [
        {
          text: "Technical stack",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[12].id,
    }),
  ],
});
/* 14 */ createQuestion({
  text: "What devices should be supported? (Default: desktop & mobile)",
  options: [
    {
      text: "No mobile view or other sizes",
      estimates: [
        {
          text: "Supported devices",
          assessment: new EstimateExactAssessment(-0.1, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "Big Screens (1920px, 2k, 4k)",
      estimates: [
        {
          text: "Supported devices",
          assessment: new EstimateExactAssessment(0.05, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "Tablet landscape",
      estimates: [
        {
          text: "Supported devices",
          assessment: new EstimateExactAssessment(0.2, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "Tablet portrait",
      estimates: [
        {
          text: "Supported devices",
          assessment: new EstimateExactAssessment(0.1, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "Other",
      estimates: [
        {
          text: "Supported devices",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[13].id,
    }),
  ],
  multiple: true,
  optional: true,
});
/* 15 */ createQuestion({
  text: "What browsers should be supported and tested?",
  options: [
    {
      text: "Basic (Chrome, Safari, Firefox)",
      estimates: [
        {
          text: "Supported browsers",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Older versions and less popular ones",
      estimates: [
        {
          text: "Supported browsers",
          assessment: new EstimateRangeAssessment(0.1, 0.2, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[14].id,
    }),
  ],
});
/* 16 */ createQuestion({
  text: "Do you plan any 3rd-party integrations?",
  options: [
    {
      text: "Email subscription services",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
    {
      text: "Maps and Location services",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateRangeAssessment(8, 12),
        },
      ],
    },
    {
      text: "User analytics tools",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateExactAssessment(4),
        },
      ],
    },
    {
      text: "Customer Support and Live Chat",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateRangeAssessment(8, 12),
        },
      ],
    },
    {
      text: "Cloud storage, Files upload/download",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateRangeAssessment(8, 12),
        },
      ],
    },
    {
      text: "Payments (Stripe, PayPal)",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateRangeAssessment(16, 24),
        },
      ],
    },
    {
      text: "AWS Cognito",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateRangeAssessment(24, 32),
        },
      ],
    },
    {
      text: "Elasticsearch",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateRangeAssessment(16, 32),
        },
      ],
    },
    {
      text: "No, nothing special",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "CDN",
      estimates: [
        {
          text: "3rd-party integrations",
          assessment: new EstimateRangeAssessment(8, 24),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[15].id,
    }),
  ],
  multiple: true,
  optional: true,
});
/* 17 */ createQuestion({
  text: "How many users per month do you expect?",
  options: [
    {
      text: "< 10 000 users",
      estimates: [
        { text: "Monthly visits", assessment: new EstimateUnknownAssessment() },
      ],
    },
    {
      text: "< 100 000 users",
      estimates: [
        { text: "Monthly visits", assessment: new EstimateUnknownAssessment() },
      ],
    },
    {
      text: "< million users",
      estimates: [
        {
          text: "Monthly visits",
          assessment: new EstimateRangeAssessment(3, 6),
        },
      ],
    },
    {
      text: "> million users",
      estimates: [
        {
          text: "Monthly visits",
          assessment: new EstimateRangeAssessment(4, 6),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[16].id,
    }),
  ],
});
/* 18 */ createQuestion({
  text: "Select the type of Content Management System that's right for you?",
  title: "CMS",
  options: [
    {
      text: "Basic",
      estimates: [
        {
          text: "CMS",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "Advanced",
      estimates: [
        {
          text: "CMS",
          assessment: new EstimateExactAssessment(0.1, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "I don't know",
      estimates: [
        {
          text: "CMS",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[17].id,
      condition: new Selected(questions[13].options[2]),
    }),
  ],
});
/* 19 */ createQuestion({
  text: "Have you got a website and customer/product database ready to migrate?",
  title: "E-commerce",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Data migration",
          assessment: new EstimateRangeAssessment(16, 40),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        { text: "Data migration", assessment: new EstimateExactAssessment(0) },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[18].id,
      condition: new Or(
        new Selected(questions[2].options[2]),
        new Selected(questions[10].options[2]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[17].id,
      condition: new And(
        new Or(
          new Selected(questions[2].options[2]),
          new Selected(questions[10].options[2]),
        ),
        new Not(new Selected(questions[13].options[2])),
      ),
    }),
  ],
});
/* 20 */ createQuestion({
  text: "Do you want users to authorise on your website?",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "User authorization",
          assessment: new EstimateRangeAssessment(32, 48),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "User authorization",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[19].id,
    }),
  ],
});
/* 21 */ createQuestion({
  text: "How do you want users to authorise?",
  options: [
    {
      text: "Email/password login",
      estimates: [
        {
          text: "Authorization types",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Social media login",
      estimates: [
        {
          text: "Authorization types",
          assessment: new EstimateRangeAssessment(8, 12),
        },
      ],
    },
    {
      text: "Two factor authentication",
      estimates: [
        {
          text: "Authorization types",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
    {
      text: "Role based access",
      estimates: [
        {
          text: "Authorization types",
          assessment: new EstimateRangeAssessment(8, 20),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[20].id,
      condition: new Selected(questions[20].options[0]),
    }),
  ],
  multiple: true,
});
/* 22 */ createQuestion({
  text: "Do you want users to track their orders in the personal account?",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Order tracking",
          assessment: new EstimateRangeAssessment(40, 80),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "Order tracking",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[21].id,
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[20].id,
    }),
  ],
});
/* 23 */ createQuestion({
  text: "Do you want users to add details through the sign up and onboarding?",
  options: [
    {
      text: "No, email/name/password are enough",
      estimates: [
        {
          text: "Profile details",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Yes, for example, billing info, location, etc",
      estimates: [
        {
          text: "Profile details",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
    {
      text: "Yes, I want a big questionnaire",
      estimates: [
        {
          text: "Profile details",
          assessment: new EstimateRangeAssessment(12, 20),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[22].id,
    }),
  ],
});
/* 24 */ createQuestion({
  text: "Do you want any additional features?",
  options: [
    {
      text: "Multiple currencies",
      estimates: [
        {
          text: "Additional features",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Multiple languages",
      estimates: [
        {
          text: "Additional features",
          assessment: new EstimateRangeAssessment(12, 20),
        },
      ],
    },
    {
      text: "Multiple languages extended (arabic, hebrew or Chinese)",
      estimates: [
        {
          text: "Additional features",
          assessment: new EstimateRangeAssessment(24, 48),
        },
      ],
    },
    {
      text: "Sales pipeline automation",
      estimates: [
        {
          text: "Additional features",
          assessment: new EstimateRangeAssessment(24, 48),
        },
      ],
    },
    {
      text: "Customer self-help portal",
      estimates: [
        {
          text: "Additional features",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
    {
      text: "Marketing analytics",
      estimates: [
        {
          text: "Additional features",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[23].id,
    }),
  ],
  multiple: true,
  optional: true,
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
      .find((question) => question.id === condition.question)
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
