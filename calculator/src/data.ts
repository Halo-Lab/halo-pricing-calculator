import { Option } from "./entities/option.js";
import { createId } from "./id.js";
import { Reference } from "./entities/entity.js";
import { SomeOf, All, Not, Selected } from "./entities/condition.js";
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
      estimates: [{ text: "", assessment: new EstimateUnknownAssessment() }],
    },
    {
      text: "Web application",
      estimates: [{ text: "", assessment: new EstimateUnknownAssessment() }],
    },
    {
      text: "Branding",
      estimates: [{ text: "", assessment: new EstimateUnknownAssessment() }],
    },
  ],
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
      condition: new SomeOf(
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
            condition: new SomeOf(
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
            condition: new SomeOf(
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
            condition: new SomeOf(
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
      condition: new SomeOf(
        new Selected(questions[2].options[0]),
        new Selected(questions[2].options[3]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[2].id,
      condition: new Not(
        new SomeOf(
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
      condition: new All(
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
      condition: new Selected(questions[0].options[1])
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
            condition: new SomeOf(
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
            condition: new SomeOf(
              new Selected(questions[2].options[0]),
              new Selected(questions[10].options[0]),
            ),
          }),
        },
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(40, 64, {
            condition: new All(
              new SomeOf(
                new Selected(questions[2].options[2]),
                new Selected(questions[10].options[2]),
              ),
              new SomeOf(
                new Selected(questions[3].options[0]),
                new Selected(questions[11].options[0]),
              ),
            ),
          }),
        },
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(80, 120, {
            condition: new All(
              new SomeOf(
                new Selected(questions[2].options[2]),
                new Selected(questions[10].options[2]),
              ),
              new SomeOf(
                new Selected(questions[3].options[1]),
                new Selected(questions[11].options[1]),
              ),
            ),
          }),
        },
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(80, 160, {
            condition: new All(
              new SomeOf(
                new Selected(questions[2].options[2]),
                new Selected(questions[10].options[2]),
              ),
              new SomeOf(
                new Selected(questions[3].options[2]),
                new Selected(questions[11].options[2]),
              ),
            ),
          }),
        },
        {
          text: "Technical stack",
          assessment: new EstimateRangeAssessment(160, 240, {
            condition: new All(
              new SomeOf(
                new Selected(questions[2].options[2]),
                new Selected(questions[10].options[2]),
              ),
              new SomeOf(
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
          assessment: new EstimateRangeAssessment(24, 48),
        },
      ],
    },
    {
      text: "> million users",
      estimates: [
        {
          text: "Monthly visits",
          assessment: new EstimateRangeAssessment(32, 48),
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
      condition: new SomeOf(
        new Selected(questions[2].options[2]),
        new Selected(questions[10].options[2]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[17].id,
      condition: new All(
        new SomeOf(
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
// Branding
/* 25 */ createQuestion({
  text: "Do you have branding or style guidelines we should follow?",
  title: "Guidelines",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Guidelines",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "Yes, but It may be enhanced",
      estimates: [
        {
          text: "",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "No, I’m open to suggestions",
      estimates: [
        {
          text: "",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "No, I don’t need it at the moment",
      estimates: [
        {
          text: "Guidelines",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[1].id,
      condition: new All(
        new Selected(questions[1].options[2]),
        new Not(
          new SomeOf(
            new Selected(questions[1].options[0]),
            new Selected(questions[1].options[1]),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[9].id,
      condition: new All(
        new Selected(questions[1].options[2]),
        new Not(new Selected(questions[1].options[1])),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[17].id,
      condition: new All(
        new Selected(questions[1].options[2]),
        new Not(new Selected(questions[13].options[2])),
        new Not(
          new SomeOf(
            new Selected(questions[2].options[2]),
            new Selected(questions[10].options[2]),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[18].id,
      condition: new All(
        new Selected(questions[1].options[2]),
        new Not(
          new SomeOf(
            new Selected(questions[2].options[2]),
            new Selected(questions[10].options[2]),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[24].id,
      condition: new Selected(questions[1].options[2]),
    }),
  ],
});
/* 26 */ createQuestion({
  text: "Please select the branding services you need",
  title: "Branding",
  options: [
    {
      text: "Logo",
      estimates: [
        {
          text: "Branding services",
          assessment: new EstimateRangeAssessment(40, 56),
        },
      ],
    },
    {
      text: "Basic Brand Guidelines",
      estimates: [
        {
          text: "Branding services",
          assessment: new EstimateExactAssessment(80),
        },
      ],
    },
    {
      text: "Advanced Brand Guidelines",
      estimates: [
        {
          text: "Branding services",
          assessment: new EstimateRangeAssessment(120, 160),
        },
      ],
    },
    {
      text: "Advanced Brand Guidelines And Brand Strategy",
      estimates: [
        {
          text: "Branding services",
          assessment: new EstimateRangeAssessment(200, 232),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[25].id,
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[0].id,
      condition: new Selected(questions[0].options[2])
    })
  ],
});
/* 27 */ createQuestion({
  text: "Do you need Naming?",
  options: [
    {
      text: "Yes",
      estimates: [
        { text: "Naming", assessment: new EstimateExactAssessment(40) },
      ],
    },
    {
      text: "No",
      estimates: [
        { text: "Naming", assessment: new EstimateUnknownAssessment() },
      ],
    },
    {
      text: "I'm not sure",
      estimates: [
        { text: "Naming", assessment: new EstimateUnknownAssessment() },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[26].id,
    }),
  ],
});
/* 28 */ createQuestion({
  text: "Would you like to have some custom elements in your identity?",
  options: [
    {
      text: "Mascottes",
      estimates: [
        { text: "Identity", assessment: new EstimateExactAssessment(40) },
      ],
    },
    {
      text: "3D Graphics",
      estimates: [
        { text: "Identity", assessment: new EstimateExactAssessment(40) },
      ],
    },
    {
      text: "Illustrations",
      estimates: [
        { text: "Identity", assessment: new EstimateExactAssessment(40) },
      ],
    },
    {
      text: "I'm not sure",
      estimates: [
        { text: "Identity", assessment: new EstimateUnknownAssessment() },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[27].id,
    }),
  ],
});
/* 29 */ createQuestion({
  text: "Do you need any additional marketing materials?",
  options: [
    {
      text: "Pitch Deck designs",
      estimates: [
        {
          text: "",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Merch & stationery for printing",
      estimates: [
        {
          text: "Marketing materials",
          assessment: new EstimateRangeAssessment(12, 32),
        },
      ],
    },
    {
      text: "Digital Ads, Media Posts",
      estimates: [
        {
          text: "Marketing materials",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
    {
      text: "Promo video",
      estimates: [
        {
          text: "",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Posters and Billboard Mockup",
      estimates: [
        {
          text: "Marketing materials",
          assessment: new EstimateRangeAssessment(4, 12),
        },
      ],
    },
    {
      text: "No, I don’t need it",
      estimates: [
        {
          text: "Marketing materials",
          assessment: new EstimateExactAssessment(40),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[28].id,
    }),
  ],
});
questions[8].previous.push(
  new PreviousQuestionConditionalLink({
    step: QuestionStep.Same,
    question: questions[29].id,
    condition: new Not(new Selected(questions[1].options[0])),
  }),
);
questions[29].next.push(questions[8].id);
/* 30 */ createQuestion({
  text: "What should be the duration of the video?",
  options: [
    {
      text: "<5 - seconds",
      estimates: [
        {
          text: "Video duration",
          assessment: new EstimateExactAssessment(4),
        },
      ],
    },
    {
      text: "Up to 15 seconds",
      estimates: [
        {
          text: "Video duration",
          assessment: new EstimateExactAssessment(8),
        },
      ],
    },
    {
      text: "Up to 1 minute",
      estimates: [
        {
          text: "Video duration",
          assessment: new EstimateExactAssessment(20),
        },
      ],
    },
  ],
  previous: [],
});
/* 31 */ createQuestion({
  text: "What type of promo video is it?",
  title: "Promo Video",
  options: [
    {
      text: "Video showcasing product interface",
      estimates: [
        {
          text: "",
          assessment: new EstimateUnknownAssessment({
            condition: new Not(
              new SomeOf(
                questions[30].options.map((option) => new Selected(option)),
              ),
            ),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(8, {
            condition: new Selected(questions[30].options[0]),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(16, {
            condition: new Selected(questions[30].options[1]),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(56, {
            condition: new Selected(questions[30].options[2]),
          }),
        },
      ],
    },
    {
      text: "Video with a simple interface and graphics",
      estimates: [
        {
          text: "",
          assessment: new EstimateUnknownAssessment({
            condition: new Not(
              new SomeOf(
                questions[30].options.map((option) => new Selected(option)),
              ),
            ),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(12, {
            condition: new Selected(questions[30].options[0]),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(32, {
            condition: new Selected(questions[30].options[1]),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(92, {
            condition: new Selected(questions[30].options[2]),
          }),
        },
      ],
    },
    {
      text: "Illustrated video",
      estimates: [
        {
          text: "",
          assessment: new EstimateUnknownAssessment({
            condition: new Not(
              new SomeOf(
                questions[30].options.map((option) => new Selected(option)),
              ),
            ),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(20, {
            condition: new Selected(questions[30].options[0]),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(64, {
            condition: new Selected(questions[30].options[1]),
          }),
        },
        {
          text: "Video type",
          assessment: new EstimateExactAssessment(160, {
            condition: new Selected(questions[30].options[2]),
          }),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[29].id,
      condition: new All(
        new Selected(questions[1].options[0]),
        new Selected(questions[29].options[3]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[9].id,
      condition: new All(
        new Not(new Selected(questions[1].options[0])),
        new Selected(questions[29].options[3]),
      ),
    }),
  ],
});
questions[30].previous.push(
  new PreviousQuestionConditionalLink({
    step: QuestionStep.Same,
    question: questions[31].id,
  }),
);
questions[31].next.push(questions[30].id);
/* 32 */ createQuestion({
  text: "Do you need a voiceover?",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Voiceover",
          assessment: new EstimateRangeAssessment(8, 20),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "Voiceover",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[30].id,
    }),
  ],
});
/* 33 */ createQuestion({
  text: "Do you have a script?",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Script",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "No, please provide one",
      estimates: [
        {
          text: "Script",
          assessment: new EstimateRangeAssessment(8, 16),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[32].id,
    }),
  ],
});
/* 34 */ createQuestion({
  text: "How big is your pitch deck?",
  title: "Pitch deck",
  options: [
    {
      text: "Up to 15 slides",
      estimates: [
        {
          text: "Pitch deck size",
          assessment: new EstimateRangeAssessment(40, 56),
        },
      ],
    },
    {
      text: "16 - 30 slides",
      estimates: [
        {
          text: "Pitch deck size",
          assessment: new EstimateRangeAssessment(64, 80),
        },
      ],
    },
    {
      text: "31 - 50 slides",
      estimates: [
        {
          text: "Pitch deck size",
          assessment: new EstimateRangeAssessment(80, 120),
        },
      ],
    },
    {
      text: "More than 51 slides",
      estimates: [
        {
          text: "Pitch deck size",
          assessment: new EstimateExactAssessment(240),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[33].id,
      condition: new Selected(questions[29].options[0]),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[29].id,
      condition: new All(
        new Selected(questions[29].options[0]),
        new Not(new Selected(questions[29].options[3])),
        new Selected(questions[1].options[0]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[9].id,
      condition: new All(
        new Selected(questions[29].options[0]),
        new Not(new Selected(questions[29].options[3])),
        new Not(new Selected(questions[1].options[0])),
      ),
    }),
  ],
});
/* 35 */ createQuestion({
  text: "By default, you get access to Figma source files. Need any other formats?",
  options: [
    {
      text: "No",
      estimates: [
        {
          text: "",
          assessment: new EstimateExactAssessment(0),
        },
      ],
    },
    {
      text: "Keynote",
      estimates: [
        {
          text: "File format",
          assessment: new EstimateExactAssessment(8, {
            condition: new Selected(questions[34].options[0]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(16, {
            condition: new Selected(questions[34].options[1]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(32, {
            condition: new Selected(questions[34].options[2]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(52, {
            condition: new Selected(questions[34].options[3]),
          }),
        },
      ],
    },
    {
      text: "PowerPoint",
      estimates: [
        {
          text: "File format",
          assessment: new EstimateExactAssessment(8, {
            condition: new Selected(questions[34].options[0]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(16, {
            condition: new Selected(questions[34].options[1]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(32, {
            condition: new Selected(questions[34].options[2]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(52, {
            condition: new Selected(questions[34].options[3]),
          }),
        },
      ],
    },
    {
      text: "Google slides",
      estimates: [
        {
          text: "File format",
          assessment: new EstimateExactAssessment(12, {
            condition: new Selected(questions[34].options[0]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(16, {
            condition: new Selected(questions[34].options[1]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(48, {
            condition: new Selected(questions[34].options[2]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(52, {
            condition: new Selected(questions[34].options[3]),
          }),
        },
      ],
    },
    {
      text: "Canva",
      estimates: [
        {
          text: "File format",
          assessment: new EstimateExactAssessment(16, {
            condition: new Selected(questions[34].options[0]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(32, {
            condition: new Selected(questions[34].options[1]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(60, {
            condition: new Selected(questions[34].options[2]),
          }),
        },
        {
          text: "File format",
          assessment: new EstimateExactAssessment(68, {
            condition: new Selected(questions[34].options[3]),
          }),
        },
      ],
    },
    {
      text: "Other",
      estimates: [
        {
          text: "",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[34].id,
    }),
  ],
});
/* 36 */ createQuestion({
  text: "Do you have content?",
  options: [
    {
      text: "No",
      estimates: [
        {
          text: "Content",
          assessment: new EstimateExactAssessment(40, {
            condition: new Selected(questions[34].options[0]),
          }),
        },
        {
          text: "Content",
          assessment: new EstimateExactAssessment(80, {
            condition: new Selected(questions[34].options[1]),
          }),
        },
        {
          text: "Content",
          assessment: new EstimateExactAssessment(160, {
            condition: new Selected(questions[34].options[2]),
          }),
        },
        {
          text: "Content",
          assessment: new EstimateExactAssessment(200, {
            condition: new Selected(questions[34].options[3]),
          }),
        },
      ],
    },
    {
      text: "Yes",
      estimates: [
        { text: "Content", assessment: new EstimateExactAssessment(0) },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[35].id,
    }),
  ],
});
// Digital marketing
/* 37 */ createQuestion({
  text: "How big is your website?",
  title: "Digital Marketing",
  options: [
    {
      text: "Up to 100 pages",
      estimates: [
        {
          text: "Website site",
          assessment: new EstimateExactAssessment(30),
        },
      ],
    },
    {
      text: "Up to 1000 pages",
      estimates: [
        {
          text: "Website site",
          assessment: new EstimateExactAssessment(40),
        },
      ],
    },
    {
      text: "Up to 10,000 pages",
      estimates: [
        {
          text: "Website site",
          assessment: new EstimateExactAssessment(60),
        },
      ],
    },
    {
      text: "More",
      estimates: [
        {
          text: "Website site",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "I'm not sure",
      estimates: [
        {
          text: "Website site",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[1].id,
      condition: new All(
        new Selected(questions[1].options[3]),
        new Not(
          new SomeOf(
            questions[1].options
              .slice(0, -1)
              .map((option) => new Selected(option)),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[9].id,
      condition: new All(
        new Selected(questions[1].options[0]),
        new Selected(questions[1].options[3]),
        new Not(
          new SomeOf(
            questions[1].options
              .slice(1, -1)
              .map((option) => new Selected(option)),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[17].id,
      condition: new All(
        new Selected(questions[1].options[1]),
        new Selected(questions[1].options[3]),
        new Not(new Selected(questions[1].options[2])),
        new Not(
          new SomeOf(
            new Selected(questions[13].options[2]),
            new Selected(questions[2].options[2]),
            new Selected(questions[10].options[2]),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[18].id,
      condition: new All(
        new Selected(questions[1].options[1]),
        new Selected(questions[1].options[3]),
        new Not(new Selected(questions[1].options[2])),
        new Not(
          new SomeOf(
            new Selected(questions[2].options[2]),
            new Selected(questions[10].options[2]),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[24].id,
      condition: new All(
        new Selected(questions[1].options[1]),
        new Selected(questions[1].options[3]),
        new Not(new Selected(questions[1].options[2])),
        new SomeOf(
          new Selected(questions[2].options[2]),
          new Selected(questions[10].options[2]),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[29].id,
      condition: new All(
        new Selected(questions[1].options[0]),
        new Selected(questions[1].options[2]),
        new Selected(questions[1].options[3]),
        new Not(
          new SomeOf(
            new Selected(questions[29].options[0]),
            new Selected(questions[29].options[3]),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[9].id,
      condition: new All(
        new Not(new Selected(questions[1].options[0])),
        new Selected(questions[1].options[2]),
        new Selected(questions[1].options[3]),
        new Not(
          new SomeOf(
            new Selected(questions[29].options[0]),
            new Selected(questions[29].options[3]),
          ),
        ),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[33].id,
      condition: new All(
        new Selected(questions[1].options[2]),
        new Selected(questions[1].options[3]),
        new Selected(questions[29].options[3]),
        new Not(new Selected(questions[29].options[0])),
      ),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[36].id,
      condition: new All(
        new Selected(questions[1].options[2]),
        new Selected(questions[1].options[3]),
        new Selected(questions[29].options[0]),
      ),
    }),
  ],
});
/* 38 */ createQuestion({
  text: "Will the content need to be updated?",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Content update",
          assessment: new EstimateExactAssessment(30),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "Content update",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "I'm not sure",
      estimates: [
        {
          text: "Content update",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[37].id,
    }),
  ],
});
/* 39 */ createQuestion({
  text: "Will we need to improve your backlink profile ?",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Profile improvement",
          assessment: new EstimateExactAssessment(15),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "Profile improvement",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "I'm not sure",
      estimates: [
        {
          text: "Profile improvement",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[38].id,
    }),
  ],
});
/* 40 */ createQuestion({
  text: "What type of audit do you need ?",
  options: [
    {
      text: "Full SEO audit (with all the following options)",
      estimates: [
        {
          text: "Audit type",
          assessment: new EstimateExactAssessment(60),
        },
      ],
    },
    {
      text: "Technical audit",
      estimates: [
        {
          text: "Audit type",
          assessment: new EstimateExactAssessment(30),
        },
      ],
    },
    {
      text: "Backlink profile audit",
      estimates: [
        {
          text: "Audit type",
          assessment: new EstimateExactAssessment(20),
        },
      ],
    },
    {
      text: "Audit after Google update",
      estimates: [
        {
          text: "Audit type",
          assessment: new EstimateExactAssessment(40),
        },
      ],
    },
    {
      text: "I’m not sure",
      estimates: [
        {
          text: "Audit type",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[39].id,
    }),
  ],
});
/* 41 */ createQuestion({
  text: "How many content do you need ?",
  options: [
    {
      text: "3 articles",
      estimates: [
        {
          text: "Content amount",
          assessment: new EstimateExactAssessment(10),
        },
      ],
    },
    {
      text: "5 articles",
      estimates: [
        {
          text: "Content amount",
          assessment: new EstimateExactAssessment(15),
        },
      ],
    },
    {
      text: "10 articles",
      estimates: [
        {
          text: "Content amount",
          assessment: new EstimateExactAssessment(30),
        },
      ],
    },
    {
      text: "More",
      estimates: [
        {
          text: "Content amount",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "I'm not sure",
      estimates: [
        {
          text: "Content amount",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[40].id,
    }),
  ],
});
// Web application
/* 42 */ createQuestion({
  text: "Which administration features do you need?",
  title: "Choose Service",
  options: [
    {
      text: "UX/UI design",
      estimates: [{ text: "", assessment: new EstimateUnknownAssessment() }],
    },
    {
      text: "Web development",
      estimates: [{ text: "", assessment: new EstimateUnknownAssessment() }],
    },
    // {
    //   text: "Branding and marketing",
    //   estimates: [{ text: "", assessment: new EstimateUnknownAssessment() }],
    // },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[0].id,
      condition: new Selected(questions[0].options[1]),
    }),
  ],
  multiple: true,
});
/* 43 */ createQuestion({
  text: "What level of customisation would you like?",
  title: "Customization",
  options: [
    {
      text: "Custom UI Design",
      estimates: [
        {
          text: "Customization",
          assessment: new EstimateRangeAssessment(180, 200),
        },
      ],
    },
    {
      text: "Material UI / Other libraries",
      estimates: [
        {
          text: "Customization",
          assessment: new EstimateRangeAssessment(160, 200),
        },
      ],
    },
    {
      text: "Wireframes / Prototypes",
      estimates: [
        {
          text: "Customization",
          assessment: new EstimateRangeAssessment(120, 160),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[42].id,
      condition: new Selected(questions[42].options[0]),
    }),
  ],
});
/* 44 */ createQuestion({
  text: "Do you have branding or style guidelines we should follow?",
  options: [
    {
      text: "Yes",
      estimates: [
        {
          text: "Style guidelines",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "I'm open to suggestions",
      estimates: [
        {
          text: "Style guidelines",
          assessment: new EstimateRangeAssessment(8, 12),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[43].id,
      condition: new Selected(questions[43].options[2]),
    }),
  ],
});
/* 45 */ createQuestion({
  text: "Approximately how many pages will your application have?",
  title: "Development",
  options: [
    {
      text: "5-7 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "8-15 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(16, 120, {
            condition: new Selected(questions[43].options[0]),
          }),
        },
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(16, 92, {
            condition: new Selected(questions[43].options[1]),
          }),
        },
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(12, 80, {
            condition: new Selected(questions[43].options[2]),
          }),
        },
      ],
    },
    {
      text: "16-20 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(120, 216, {
            condition: new Selected(questions[43].options[0]),
          }),
        },
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(102, 184, {
            condition: new Selected(questions[43].options[1]),
          }),
        },
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(72, 130, {
            condition: new Selected(questions[43].options[2]),
          }),
        },
      ],
    },
    {
      text: ">20 pages",
      estimates: [
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(216, 300, {
            condition: new Selected(questions[43].options[0]),
          }),
        },
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(184, 255, {
            condition: new Selected(questions[43].options[1]),
          }),
        },
        {
          text: "Page count",
          assessment: new EstimateRangeAssessment(130, 180, {
            condition: new Selected(questions[43].options[2]),
          }),
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
      question: questions[43].id,
      condition: new Not(new Selected(questions[43].options[2])),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[44].id,
    }),
  ],
});
/* 46 */ createQuestion({
  text: "Do you need additional screen sizes?",
  options: [
    {
      text: "Desktop only",
      estimates: [
        {
          text: "Other screen sizes",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Mobile only",
      estimates: [
        {
          text: "Other screen sizes",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Desktop and mobile",
      estimates: [
        {
          text: "Other screen sizes",
          assessment: new EstimateExactAssessment(0.3, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[45].id,
    }),
  ],
});
/* 47 */ createQuestion({
  text: "What screen orientation do you need?",
  options: [
    {
      text: "Tablet portrait",
      estimates: [
        {
          text: "Screen orientation",
          assessment: new EstimateExactAssessment(0.15, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "Tablet landscape",
      estimates: [
        {
          text: "Screen orientation",
          assessment: new EstimateExactAssessment(0.2, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "Screen orientation",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Other",
      estimates: [
        {
          text: "Screen orientation",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[46].id,
      condition: new Selected(questions[46].options[2]),
    }),
  ],
});
/* 48 */ createQuestion({
  text: "How many types of users will use the application?",
  options: [
    {
      text: "Single user type",
      estimates: [
        {
          text: "User types",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Multiple user types",
      estimates: [
        {
          text: "User types",
          assessment: new EstimateRangeAssessment(0.2, 1, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[46].id,
      condition: new Not(new Selected(questions[46].options[2])),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[47].id,
    }),
  ],
});
/* 49 */ createQuestion({
  text: "Will users have personal profiles?",
  options: [
    {
      text: "Yes, Advanced ones",
      estimates: [
        {
          text: "Personal profiles",
          assessment: new EstimateExactAssessment(0.15, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "Yes, Simple ones",
      estimates: [
        {
          text: "Personal profiles",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "Personal profiles",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[48].id,
    }),
  ],
});
/* 50 */ createQuestion({
  text: "Do you need messaging to manage customer conversations?",
  options: [
    {
      text: "Chat Support / HumanChat support",
      estimates: [
        {
          text: "Customer conversations",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Video/Audio Calls Integration (3rd Party )",
      estimates: [
        {
          text: "Customer conversations",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "User-to-user text messaging",
      estimates: [
        {
          text: "Customer conversations",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Chatbots",
      estimates: [
        {
          text: "Customer conversations",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "No",
      estimates: [
        {
          text: "Customer conversations",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[49].id,
    }),
  ],
});
/* 51 */ createQuestion({
  text: "Where do you want to save your application data ?",
  title: "Development",
  options: [
    {
      text: "A new database",
      estimates: [
        {
          text: "Data storage",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "An Existing Database",
      estimates: [
        {
          text: "Data storage",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Cloud Database",
      estimates: [
        {
          text: "Data storage",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[42].id,
      condition: new Not(new Selected(questions[42].options[0])),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.New,
      question: questions[50].id,
    }),
  ],
});
/* 52 */ createQuestion({
  text: "Which administration features do you need?",
  options: [
    {
      text: "User Management",
      estimates: [
        {
          text: "Administration features",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Content Management",
      estimates: [
        {
          text: "Administration features",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Reporting and Analytics",
      estimates: [
        {
          text: "Administration features",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Notification Control",
      estimates: [
        {
          text: "Administration features",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[51].id,
    }),
  ],
});
/* 53 */ createQuestion({
  text: "Have you got a website and customer/product database ready to migrate?",
  options: [
    {
      text: "No",
      estimates: [
        {
          text: "Data migration",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Yes",
      estimates: [
        {
          text: "Data migration",
          assessment: new EstimateRangeAssessment(16, 40),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[52].id,
    }),
  ],
});
/* 54 */ createQuestion({
  text: "Do you want users to authorise on your website?",
  options: [
    {
      text: "User authorization",
      estimates: [
        {
          text: "User authorization",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "User authorization",
      estimates: [
        {
          text: "User authorization",
          assessment: new EstimateRangeAssessment(32, 48),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[53].id,
    }),
  ],
});
/* 55 */ createQuestion({
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
      question: questions[54].id,
      condition: new Selected(questions[54].options[1]),
    }),
  ],
});
/* 56 */ createQuestion({
  text: "Do you want users to add details through the sign up and onboarding?",
  options: [
    {
      text: "No, just email/name/password",
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
      question: questions[54].id,
      condition: new Not(new Selected(questions[54].options[1])),
    }),
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[55].id,
    }),
  ],
});
questions[16].previous.push(
  new PreviousQuestionConditionalLink({
    step: QuestionStep.Same,
    question: questions[56].id,
    condition: new Selected(questions[0].options[1]),
  }),
);
questions[56].next.push(questions[16].id);
/* 57 */ createQuestion({
  text: "Do you need the back-end development?",
  options: [
    {
      text: "No, it's on my team",
      estimates: [
        {
          text: "Back-end development",
          assessment: new EstimateUnknownAssessment(),
        },
      ],
    },
    {
      text: "Use CMS/low-code solutions",
      estimates: [
        {
          text: "Back-end development",
          assessment: new EstimateRangeAssessment(0.15, 0.3, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
    {
      text: "Yes",
      estimates: [
        {
          text: "Back-end development",
          assessment: new EstimateRangeAssessment(1, 1.5, {
            operationKind: EstimationOperationKind.Multiplication,
          }),
        },
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      step: QuestionStep.Same,
      question: questions[17].id,
      condition: new Selected(questions[0].options[1]),
    }),
  ],
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
