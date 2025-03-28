import { createId } from "./id.js";
import { Reference } from "./entities/entity.js";
import { IconVariant } from "./components/icons/index.js";
import { All, Not, Selected } from "./entities/condition.js";
import { Option, OptionSelection } from "./entities/option.js";
import {
  Estimate,
  EstimateAssessment,
  EstimateRangeAssessment,
  EstimateExactAssessment,
  EstimationOperationKind,
} from "./entities/estimate.js";
import {
  Question,
  FilesQuestion,
  RegularQuestion,
  FilesQuestionData,
  DescriptionQuestion,
  RegularQuestionData,
  DescriptionQuestionData,
  PreviousQuestionConditionalLink,
} from "./entities/question.js";

export const options: Option[] = [];
export const questions: Question[] = [];
export const estimates: Estimate[] = [];

enum QuestionGroup {
  Projects = "Project type",
  Industries = "Industries",
  Services = "Type of service", // Should not appear in Summary.
  Additionals = "Additional services", // Should not appear in Summary.
  WebDesign = "Web design",
  WebDevelopment = "Web development",
  BrandingMarketing = "Branding & Marketing",
  SEO = "SEO",
  UXUIDesign = "UX/UI design",
  AppDevelopment = "App development",
  Final = "Receive an estimate", // Should not appear in Summary.
}

/* 0 */ createRegularQuestion({
  text: "Select your project type:",
  title: QuestionGroup.Projects,
  options: [
    {
      text: "Website",
      icon: "website",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Web application",
      icon: "web-application",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Mobile application",
      icon: "mobile-application",
      estimates: [new EstimateExactAssessment(0)],
    },
    // {
    //   text: "Desktop application",
    //   estimates: [new EstimateExactAssessment(0)],
    // },
  ],
  previous: [],
});
/* 1 */ createRegularQuestion({
  text: "Choose the industry of your product",
  title: QuestionGroup.Industries,
  options: [
    {
      text: "SaaS",
      icon: "saas",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Healthcare",
      icon: "healthcare",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Finance",
      icon: "finance",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Education",
      icon: "education",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Transportation & Logistics",
      icon: "logistics",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "IoT",
      icon: "iot",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Insurance",
      icon: "insurance",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Wellness & Sport",
      icon: "wellness",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Real Estate",
      icon: "real-estate",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Web3",
      icon: "web3",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Social network",
      icon: "social-network",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Agency",
      icon: "agency",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Beauty & Fashion",
      icon: "fashion",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Entertainment",
      icon: "entertainment",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "E-commerce",
      icon: "e-commerce",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Other industries",
      icon: "other-industries",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[0].id,
    }),
  ],
});
// Website
/* 2 */ createRegularQuestion({
  text: "Which service are you looking for?",
  title: QuestionGroup.Services,
  options: [
    {
      text: "Web design",
      estimates: [new EstimateRangeAssessment(80, 160)],
    },
    {
      text: "Web development",
      estimates: [new EstimateRangeAssessment(96, 200)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[1].id,
      condition: new Selected((questions[0] as RegularQuestion).options[0]),
    }),
  ],
  multiple: true,
  optionToGroupMap(index, optionId) {
    switch (index) {
      case 0:
        return QuestionGroup.WebDesign;
      case 1:
        return QuestionGroup.WebDevelopment;
    }
  },
});
// Website
/* 3 */ createRegularQuestion({
  text: "How many pages will your website have?",
  title: QuestionGroup.WebDesign,
  options: [
    {
      text: "1-5 pages",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "6-10 pages",
      estimates: [new EstimateRangeAssessment(24, 48)],
    },
    {
      text: "11-20 pages",
      estimates: [new EstimateRangeAssessment(64, 112)],
    },
    {
      text: ">20 pages",
      estimates: [new EstimateRangeAssessment(144, 280)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[2].id,
      condition: new All(
        new Selected((questions[0] as RegularQuestion).options[0]),
        new Selected((questions[2] as RegularQuestion).options[0]),
      ),
    }),
  ],
});
/* 4 */ createRegularQuestion({
  text: "What design type do you prefer for your website?",
  title: QuestionGroup.WebDesign,
  options: [
    {
      text: "Custom design",
      estimates: [
        new EstimateExactAssessment(1.5, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "Template design",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[3].id,
    }),
  ],
});
/* 5 */ createRegularQuestion({
  text: "Do you already have wireframes, or do we need to build them from scratch?",
  title: QuestionGroup.WebDesign,
  options: [
    {
      text: "Yes, they're all set",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "No, they need to be designed",
      estimates: [new EstimateExactAssessment(16)],
    },
    {
      text: "I need advice on this",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[4].id,
    }),
  ],
});
/* 6 */ createRegularQuestion({
  text: "Do you have your content ready to go?",
  title: QuestionGroup.WebDesign,
  options: [
    {
      text: "Yes, it's ready!",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'll handle it myself",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "No, I need help with content writing",
      estimates: [new EstimateRangeAssessment(24, 32)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[5].id,
    }),
  ],
});
/* 7 */ createRegularQuestion({
  text: "What kinds of images or visuals do you envision for your website?",
  title: QuestionGroup.WebDesign,
  options: [
    {
      text: "Stock images",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Unique illustrations",
      estimates: [new EstimateRangeAssessment(20, 40)],
    },
    {
      text: "Custom 3d elements",
      estimates: [new EstimateRangeAssessment(16, 40)],
    },
    {
      text: "AI generated images",
      estimates: [new EstimateRangeAssessment(16, 40)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[6].id,
    }),
  ],
  multiple: true,
});
/* 8 */ createRegularQuestion({
  text: "How quickly do you need the project to be completed?",
  title: QuestionGroup.WebDesign,
  options: [
    {
      text: "Within the standard timeframe",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "As fast as possible",
      estimates: [
        new EstimateExactAssessment(0.6, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[7].id,
    }),
  ],
});
/* 9 */ createRegularQuestion({
  text: "How many pages will your website have?",
  title: QuestionGroup.WebDevelopment,
  options: [
    {
      text: "1-5 pages",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "6-10 pages",
      estimates: [new EstimateRangeAssessment(40, 100)],
    },
    {
      text: "11-20 pages",
      estimates: [new EstimateRangeAssessment(72, 180)],
    },
    {
      text: ">20 pages",
      estimates: [new EstimateRangeAssessment(200, 300)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[2].id,
      condition: new All(
        new Not(new Selected((questions[2] as RegularQuestion).options[0])),
        new Selected((questions[0] as RegularQuestion).options[0]),
        new Selected((questions[2] as RegularQuestion).options[1]),
      ),
    }),
  ],
});
/* 10 */ createRegularQuestion({
  text: "How would you like your website to be built?",
  title: QuestionGroup.WebDevelopment,
  options: [
    {
      text: "JS/React development with CMS",
      estimates: [
        new EstimateExactAssessment(1.5, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "Custom development (no CMS)",
      estimates: [
        new EstimateExactAssessment(1.2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "No-code (Webflow)",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[8].id,
      condition: new All(
        new Selected((questions[2] as RegularQuestion).options[0]),
        new Selected((questions[2] as RegularQuestion).options[1]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      question: questions[9].id,
      condition: new Not(
        new Selected((questions[2] as RegularQuestion).options[0]),
      ),
    }),
  ],
});
/* 11 */ createRegularQuestion({
  text: "What devices should your website be optimized for?",
  title: QuestionGroup.WebDevelopment,
  options: [
    {
      text: "Desktop and mobile",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Big screens (1920px, 2k, 4k)",
      estimates: [
        new EstimateExactAssessment(1.05, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "Tablet (landscape & portrait)",
      estimates: [
        new EstimateExactAssessment(1.2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[10].id,
    }),
  ],
  multiple: true,
});
/* 12 */ createRegularQuestion({
  text: "What additional features should be included in your website?",
  title: QuestionGroup.WebDevelopment,
  options: [
    {
      text: "Map and geolocation support",
      estimates: [new EstimateRangeAssessment(8, 12)],
    },
    {
      text: "Analytics tools",
      estimates: [new EstimateExactAssessment(4)],
    },
    {
      text: "Payment systems (Stripe, PayPal)",
      estimates: [new EstimateRangeAssessment(16, 24)],
    },
    {
      text: "Cloud storage, file upload",
      estimates: [new EstimateRangeAssessment(8, 12)],
    },
    {
      text: "User support and chat",
      estimates: [new EstimateRangeAssessment(8, 12)],
    },
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[11].id,
    }),
  ],
  multiple: true,
});
/* 13 */ createRegularQuestion({
  text: "Do you need any other services to go along with the project?",
  title: QuestionGroup.Additionals,
  options: [
    {
      text: "Yes, Branding & Marketing",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "SEO will come in handy",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Not right now, thanks",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[8].id,
      condition: new Not(
        new Selected((questions[2] as RegularQuestion).options[1]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      question: questions[12].id,
    }),
  ],
  multiple: true,
  optionToGroupMap(index, optionId) {
    switch (index) {
      case 0:
        return QuestionGroup.BrandingMarketing;
      case 1:
        return QuestionGroup.SEO;
    }
  },
});
/* 14 */ createRegularQuestion({
  text: "What branding services are you looking for?",
  title: QuestionGroup.BrandingMarketing,
  options: [
    {
      text: "Just a logo",
      estimates: [new EstimateRangeAssessment(40, 56)],
    },
    {
      text: "Basic Brand Guidelines",
      estimates: [new EstimateExactAssessment(80)],
    },
    {
      text: "Advanced Brand Guidelines",
      estimates: [new EstimateRangeAssessment(120, 160)],
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[13].id,
      condition: new All(
        new Selected((questions[13] as RegularQuestion).options[0]),
        new Not(new Selected((questions[13] as RegularQuestion).options[2])),
      ),
    }),
  ],
});
/* 15 */ createRegularQuestion({
  text: "Do you need help with naming?",
  title: QuestionGroup.BrandingMarketing,
  options: [
    {
      text: "Yes, I'd like a name developed",
      estimates: [new EstimateExactAssessment(40)],
    },
    {
      text: "No, I already have a name",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[14].id,
    }),
  ],
});
/* 16 */ createRegularQuestion({
  text: "Do you want any unique elements for your brand?",
  title: QuestionGroup.BrandingMarketing,
  options: [
    {
      text: "Mascots (brand characters)",
      estimates: [new EstimateExactAssessment(40)],
    },
    {
      text: "Illustrations",
      estimates: [new EstimateExactAssessment(40)],
    },
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[15].id,
    }),
  ],
  multiple: true,
});
/* 17 */ createRegularQuestion({
  text: "Do you need any additional marketing materials?",
  title: QuestionGroup.BrandingMarketing,
  options: [
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Pitch Deck designs",
      estimates: [new EstimateRangeAssessment(12, 32)],
    },
    {
      text: "Promo video",
      estimates: [new EstimateRangeAssessment(12, 32)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[16].id,
    }),
  ],
  multiple: true,
});
/* 18 */ createRegularQuestion({
  text: "How many pages does your website have?",
  title: QuestionGroup.SEO,
  options: [
    {
      text: "Up to 100 pages",
      estimates: [new EstimateExactAssessment(32)],
    },
    {
      text: "Up to 1,000 pages",
      estimates: [new EstimateExactAssessment(48)],
    },
    {
      text: "Over 10,000 pages",
      estimates: [new EstimateExactAssessment(72)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[13].id,
      condition: new All(
        new Not(new Selected((questions[13] as RegularQuestion).options[0])),
        new Not(new Selected((questions[13] as RegularQuestion).options[2])),
        new Selected((questions[13] as RegularQuestion).options[1]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      question: questions[17].id,
      condition: new All(
        new Not(new Selected((questions[13] as RegularQuestion).options[2])),
        new Selected((questions[13] as RegularQuestion).options[0]),
        new Selected((questions[13] as RegularQuestion).options[1]),
      ),
    }),
  ],
});
/* 19 */ createRegularQuestion({
  text: "Does your website content need an update?",
  title: QuestionGroup.SEO,
  options: [
    {
      text: "Yes, I need to update the content",
      estimates: [new EstimateExactAssessment(32)],
    },
    {
      text: "No, the content is good as is",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[18].id,
    }),
  ],
});
/* 20 */ createRegularQuestion({
  text: "Would you like to improve your website's backlink profile?",
  title: QuestionGroup.SEO,
  options: [
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Yes, I need to improve it",
      estimates: [new EstimateExactAssessment(16)],
    },
    {
      text: "No, it's already good",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[19].id,
    }),
  ],
});
/* 21 */ createRegularQuestion({
  text: "What type of audit do you need for your website?",
  title: QuestionGroup.SEO,
  options: [
    {
      text: "Full SEO audit",
      estimates: [new EstimateExactAssessment(72)],
    },
    {
      text: "Technical audit",
      estimates: [new EstimateExactAssessment(32)],
    },
    {
      text: "Backlink profile audit",
      estimates: [new EstimateExactAssessment(24)],
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[20].id,
    }),
  ],
});
/* 22 */ createRegularQuestion({
  text: "How much content do you need to be created?",
  title: QuestionGroup.SEO,
  options: [
    {
      text: "3 articles",
      estimates: [new EstimateRangeAssessment(8, 16)],
    },
    {
      text: "5 articles",
      estimates: [new EstimateExactAssessment(16)],
    },
    {
      text: "10 articles",
      estimates: [new EstimateExactAssessment(32)],
    },
    {
      text: "More than 10 articles",
      estimates: [new EstimateExactAssessment(96)],
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[21].id,
    }),
  ],
});
// Web application
/* 23 */ createRegularQuestion({
  text: "How many pages will your web app have?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "1-5 pages",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "6-10 pages",
      estimates: [new EstimateRangeAssessment(24, 64)],
    },
    {
      text: "11-20 pages",
      estimates: [new EstimateRangeAssessment(32, 80)],
    },
    {
      text: "20-30+ pages",
      estimates: [new EstimateRangeAssessment(160, 280)],
    },
  ],
  previous: [],
});
/* 24 */ createRegularQuestion({
  text: "What design type do you prefer for your web app?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "Custom UI design",
      estimates: [
        new EstimateExactAssessment(1.5, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "Template-based design",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[23].id,
    }),
  ],
});
/* 25 */ createRegularQuestion({
  text: "What devices should your app be optimized for",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "Desktop only",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "All screen sizes",
      estimates: [
        new EstimateExactAssessment(2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "Desktop and mobile",
      estimates: [
        new EstimateExactAssessment(1.6, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[24].id,
    }),
  ],
});
/* 26 */ createRegularQuestion({
  text: "Will your app have a single user type or multiple?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "Single user type",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Multiple user types",
      estimates: [
        new EstimateRangeAssessment(1.2, 2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[25].id,
    }),
  ],
});
/* 27 */ createRegularQuestion({
  text: "Will users have personal profiles in your app?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "Yes, users will have customized profiles",
      estimates: [
        new EstimateExactAssessment(1.15, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "No, profiles aren't needed",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[26].id,
    }),
  ],
});
/* 28 */ createRegularQuestion({
  text: "What kind of prototype do you need to visualize your app?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "Wireframes",
      estimates: [
        new EstimateExactAssessment(0),
        new EstimateRangeAssessment(4, 40, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[0],
          ),
        }),
        new EstimateRangeAssessment(24, 80, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[1],
          ),
        }),
        new EstimateRangeAssessment(44, 160, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[2],
          ),
        }),
        new EstimateExactAssessment(160, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[3],
          ),
        }),
      ],
    },
    {
      text: "Clickable prototype",
      estimates: [
        new EstimateExactAssessment(0),
        new EstimateRangeAssessment(4, 20, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[0],
          ),
        }),
        new EstimateRangeAssessment(24, 40, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[1],
          ),
        }),
        new EstimateRangeAssessment(44, 80, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[2],
          ),
        }),
        new EstimateExactAssessment(80, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[3],
          ),
        }),
      ],
    },
    {
      text: "Full experience prototype",
      estimates: [
        new EstimateExactAssessment(0),
        new EstimateRangeAssessment(8, 40, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[0],
          ),
        }),
        new EstimateRangeAssessment(48, 80, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[1],
          ),
        }),
        new EstimateRangeAssessment(88, 160, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[2],
          ),
        }),
        new EstimateExactAssessment(160, {
          condition: new Selected(
            (questions[23] as RegularQuestion).options[3],
          ),
        }),
      ],
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[27].id,
    }),
  ],
});
/* 29 */ createRegularQuestion({
  text: "Choose the necessary features for your web application",
  title: QuestionGroup.WebDevelopment,
  options: [
    {
      text: "User registration & profiles",
      estimates: [new EstimateRangeAssessment(40, 80)],
    },
    {
      text: "New database",
      estimates: [new EstimateRangeAssessment(24, 40)],
    },
    {
      text: "Chat support",
      estimates: [new EstimateRangeAssessment(40, 80)],
    },
    {
      text: "Video/Audio calls (3rd party)",
      estimates: [new EstimateRangeAssessment(40, 120)],
    },
    {
      text: "User-to-user text messaging",
      estimates: [new EstimateRangeAssessment(40, 80)],
    },
    {
      text: "Payments (Stripe, PayPal, etc.)",
      estimates: [new EstimateRangeAssessment(40, 120)],
    },
    {
      text: "Email subscription services",
      estimates: [new EstimateRangeAssessment(8, 24)],
    },
    {
      text: "Cloud storage, file upload/download",
      estimates: [new EstimateRangeAssessment(24, 40)],
    },
    {
      text: "Maps & Location services",
      estimates: [new EstimateRangeAssessment(24, 40)],
    },
    {
      text: "CDN (Content Delivery Network)",
      estimates: [new EstimateRangeAssessment(24, 40)],
    },
    {
      text: "User management",
      estimates: [new EstimateRangeAssessment(40, 80)],
    },
    {
      text: "Content management",
      estimates: [
        new EstimateExactAssessment(1.5, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "Reporting & Analytics",
      estimates: [new EstimateRangeAssessment(40, 120)],
    },
    {
      text: "Notification control",
      estimates: [new EstimateRangeAssessment(40, 80)],
    },
    {
      text: "Not sure yet, let's discuss",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [],
  optional: true,
  multiple: true,
});
/* 30 */ createRegularQuestion({
  text: "Do you need to migrate a website, product data, or client information?",
  title: QuestionGroup.WebDevelopment,
  options: [
    {
      text: "Yes",
      estimates: [new EstimateRangeAssessment(24, 40)],
    },
    {
      text: "No",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[29].id,
    }),
  ],
});
/* 31 */ createRegularQuestion({
  text: "Do you need back-end development for your project?",
  title: QuestionGroup.WebDevelopment,
  options: [
    {
      text: "No, it's on my team",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "A CMS or low-code solution will work",
      estimates: [
        new EstimateRangeAssessment(1.15, 1.3, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "Yes, I need a fully custom back-end",
      estimates: [
        new EstimateRangeAssessment(2, 2.5, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[30].id,
    }),
  ],
});
/* 32 */ createRegularQuestion({
  text: "How many monthly users do you expect?",
  title: QuestionGroup.WebDevelopment,
  options: [
    {
      text: "Less than 10,000 users",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Up to 100,000 users",
      estimates: [new EstimateRangeAssessment(24, 48)],
    },
    {
      text: "Up to 1 million users",
      estimates: [new EstimateRangeAssessment(40, 56)],
    },
    {
      text: "More than 1 million users",
      estimates: [new EstimateRangeAssessment(40, 80)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[31].id,
    }),
  ],
});
/* 33 */ createDescriptionQuestion({
  text: "Describe how your product will be used:",
  title: QuestionGroup.WebDevelopment,
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[32].id,
    }),
  ],
});
/* 34 */ createFilesQuestion({
  text: "Do you have any screens or designs for your app?",
  title: QuestionGroup.WebDevelopment,
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[33].id,
    }),
  ],
});
/* 35 */ createRegularQuestion({
  text: "Do you need help with branding & marketing?",
  title: QuestionGroup.Additionals,
  options: [
    {
      text: "Yes, I need branding & marketing",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "No, not right now",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[34].id,
    }),
  ],
  optionToGroupMap(index, optionId) {
    switch (index) {
      case 0:
        return QuestionGroup.BrandingMarketing;
    }
  },
});
/* 36 */ createRegularQuestion({
  text: "What branding services are you looking for?",
  title: QuestionGroup.BrandingMarketing,
  options: [
    {
      text: "Just a logo",
      estimates: [new EstimateRangeAssessment(40, 56)],
    },
    {
      text: "Basic Brand Guidelines",
      estimates: [new EstimateRangeAssessment(80, 120)],
    },
    {
      text: "Advanced Brand Guidelines",
      estimates: [new EstimateRangeAssessment(160, 240)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[35].id,
      condition: new Selected((questions[35] as RegularQuestion).options[0]),
    }),
  ],
});
/* 37 */ createRegularQuestion({
  text: "Do you need help with naming?",
  title: QuestionGroup.Additionals,
  options: [
    {
      text: "Yes, I'd like a name developed",
      estimates: [new EstimateExactAssessment(40)],
    },
    {
      text: "No, I already have a name",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[36].id,
    }),
  ],
});
/* 38 */ createRegularQuestion({
  text: "Do you want any unique elements for your brand?",
  title: QuestionGroup.Additionals,
  options: [
    {
      text: "Mascots (brand characters)",
      estimates: [new EstimateExactAssessment(40)],
    },
    {
      text: "Illustrations",
      estimates: [new EstimateExactAssessment(40)],
    },
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[37].id,
    }),
  ],
  multiple: true,
});
/* 39 */ createRegularQuestion({
  text: "Do you need any additional marketing materials?",
  title: QuestionGroup.Additionals,
  options: [
    {
      text: "Pitch Deck designs",
      estimates: [new EstimateRangeAssessment(80, 120)],
    },
    {
      text: "Promo video",
      estimates: [new EstimateRangeAssessment(16, 40)],
    },
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[38].id,
    }),
  ],
  multiple: true,
});
// Mobile application
/* 40 */ createRegularQuestion({
  text: "Which services are you looking for?",
  title: QuestionGroup.Services,
  options: [
    {
      text: "UI/UX design",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "App development",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[1].id,
      condition: new Selected((questions[0] as RegularQuestion).options[2]),
    }),
  ],
  multiple: true,
  optionToGroupMap(index, optionId) {
    switch (index) {
      case 0:
        return QuestionGroup.UXUIDesign;
      case 1:
        return QuestionGroup.AppDevelopment;
    }
  },
});
/* 41 */ createRegularQuestion({
  text: "How many screens will your app include?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "1-10 screens",
      estimates: [new EstimateRangeAssessment(40, 80)],
    },
    {
      text: "10-25 screens",
      estimates: [new EstimateRangeAssessment(80, 160)],
    },
    {
      text: "25+ screens",
      estimates: [new EstimateRangeAssessment(160, 240)],
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[40].id,
      condition: new Selected((questions[40] as RegularQuestion).options[0]),
    }),
  ],
});
/* 42 */ createRegularQuestion({
  text: "What design type do your prefer for your mobile app?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "Custom UI design",
      estimates: [
        new EstimateRangeAssessment(1.5, 2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "Template-based design",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[41].id,
    }),
  ],
});
/* 43 */ createRegularQuestion({
  text: "What kind of prototype do you need to visualize your app?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "Wireframes",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Clickable prototype",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Full experience prototype",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[42].id,
    }),
  ],
});
/* 44 */ createRegularQuestion({
  text: "Which platforms do you need your app for?",
  title: QuestionGroup.AppDevelopment,
  options: [
    {
      text: "iOS only",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Android only",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "Both platforms",
      estimates: [
        new EstimateExactAssessment(1.3, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[43].id,
      condition: new All(
        new Selected((questions[40] as RegularQuestion).options[0]),
        new Selected((questions[40] as RegularQuestion).options[1]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      question: questions[40].id,
      condition: new All(
        new Selected((questions[40] as RegularQuestion).options[1]),
        new Not(new Selected((questions[40] as RegularQuestion).options[0])),
      ),
    }),
  ],
});
/* 45 */ createRegularQuestion({
  text: "Choose the necessary features for your mobile application",
  title: QuestionGroup.AppDevelopment,
  options: [
    {
      text: "Payments (Stripe, PayPal, etc.)",
      estimates: [new EstimateRangeAssessment(80, 240)],
    },
    {
      text: "User authentication (login/signup)",
      estimates: [new EstimateRangeAssessment(24, 80)],
    },
    {
      text: "Maps & Location services",
      estimates: [new EstimateRangeAssessment(80, 240)],
    },
    {
      text: "Media uploads (e.g., photos, videos, documents)",
      estimates: [new EstimateRangeAssessment(80, 120)],
    },
    {
      text: "Database management, cloud storage, user management",
      estimates: [new EstimateRangeAssessment(120, 240)],
    },
    {
      text: "Chats, notifications, real-data updates",
      estimates: [new EstimateRangeAssessment(80, 160)],
    },
    {
      text: "Offline mode",
      estimates: [new EstimateRangeAssessment(160, 240)],
    },
    {
      text: "Not sure yet, let's discuss",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[44].id,
    }),
  ],
  optional: true,
  multiple: true,
});
/* 46 */ createRegularQuestion({
  text: "Do you need an admin panel to manage your app's content?",
  title: QuestionGroup.AppDevelopment,
  options: [
    {
      text: "Yes",
      estimates: [
        new EstimateRangeAssessment(1.3, 1.5, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
    },
    {
      text: "No",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[45].id,
    }),
  ],
});
/* 47 */ createDescriptionQuestion({
  text: "Describe how your product will be used:",
  title: QuestionGroup.AppDevelopment,
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[46].id,
    }),
  ],
});
/* 48 */ createFilesQuestion({
  text: "Do you have any screens or designs for your app?",
  title: QuestionGroup.AppDevelopment,
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[47].id,
    }),
  ],
});
/* 49 */ createRegularQuestion({
  text: "Do you need any additional services?",
  title: QuestionGroup.Additionals,
  options: [
    {
      text: "Yes, Branding & Marketing",
      estimates: [new EstimateExactAssessment(0)],
    },
    {
      text: "I don't need it right now",
      estimates: [new EstimateExactAssessment(0)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[43].id,
      condition: new Not(
        new Selected((questions[40] as RegularQuestion).options[1]),
      ),
    }),
    new PreviousQuestionConditionalLink({
      question: questions[48].id,
      condition: new Selected((questions[40] as RegularQuestion).options[1]),
    }),
  ],
  optionToGroupMap(index, optionId) {
    switch (index) {
      case 0:
        return QuestionGroup.BrandingMarketing;
    }
  },
});
questions[49].next.push(questions[36].id);
questions[36].previous.push(
  new PreviousQuestionConditionalLink({
    question: questions[49].id,
    condition: new Selected((questions[49] as RegularQuestion).options[0]),
  }),
);
/* 50 */ createRegularQuestion({
  text: "Which service are you looking for?",
  title: QuestionGroup.Services,
  options: [
    {
      text: "UI/UX design",
      estimates: [new EstimateRangeAssessment(80, 160)],
    },
    {
      text: "Web development",
      estimates: [new EstimateRangeAssessment(96, 200)],
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[1].id,
      condition: new Selected((questions[0] as RegularQuestion).options[1]),
    }),
  ],
  multiple: true,
  optionToGroupMap(index, optionId) {
    switch (index) {
      case 0:
        return QuestionGroup.UXUIDesign;
      case 1:
        return QuestionGroup.WebDevelopment;
    }
  },
});
questions[50].next.push(questions[23].id);
questions[23].previous.push(
  new PreviousQuestionConditionalLink({
    question: questions[50].id,
    condition: new Selected((questions[50] as RegularQuestion).options[0]),
  }),
);
questions[50].next.push(questions[29].id);
questions[29].previous.push(
  new PreviousQuestionConditionalLink({
    question: questions[50].id,
    condition: new All(
      new Not(new Selected((questions[50] as RegularQuestion).options[0])),
      new Selected((questions[50] as RegularQuestion).options[1]),
    ),
  }),
);
questions[28].next.push(questions[29].id);
questions[29].previous.push(
  new PreviousQuestionConditionalLink({
    question: questions[28].id,
    condition: new All(
      new Selected((questions[50] as RegularQuestion).options[0]),
      new Selected((questions[50] as RegularQuestion).options[1]),
    ),
  }),
);
questions[28].next.push(questions[35].id);
questions[35].previous.push(
  new PreviousQuestionConditionalLink({
    question: questions[28].id,
    condition: new All(
      new Selected((questions[50] as RegularQuestion).options[0]),
      new Not(new Selected((questions[50] as RegularQuestion).options[1])),
    ),
  }),
);

function insertQuestionToModuleVariable(question: Question): void {
  question.previous.forEach((condition) => {
    questions
      .find((question) => question.id === condition.question)
      ?.next.push(question.id);
  });

  questions.push(question);
}

interface MinimalOptionWithEstimates {
  text: string;
  icon?: IconVariant;
  selection?: OptionSelection;
  estimates: EstimateAssessment[];
}

interface MinimalRegularQuestionData
  extends Omit<
    RegularQuestionData,
    "id" | "next" | "options" | "optionToGroupMap"
  > {
  options: MinimalOptionWithEstimates[];
  optionToGroupMap?: (
    index: number,
    optionId: Reference<Option>,
  ) => string | undefined;
}

function createRegularQuestion({
  options: minimalOptionsData,
  optionToGroupMap,
  ...minimalData
}: MinimalRegularQuestionData): void {
  const questionData: RegularQuestionData = Object.assign(
    { id: createId<Reference<Question>>(), next: [], options: [] },
    minimalData,
  );

  const question = new RegularQuestion(questionData);

  insertQuestionToModuleVariable(question);

  minimalOptionsData.forEach(
    ({ text, icon, selection, estimates: minimalEstimates }) => {
      const option = new Option({
        id: createId(),
        text,
        icon,
        question: question.id,
        estimates: [],
        selection,
      });

      question.options.push(option.id);

      options.push(option);

      minimalEstimates.forEach((assessment) => {
        const estimate = new Estimate({
          id: createId(),
          option: option.id,
          assessment,
        });

        option.estimates.push(estimate.id);

        estimates.push(estimate);
      });
    },
  );

  if (optionToGroupMap) {
    question.optionToGroupMap = question.options
      .map(
        (optionId, index) =>
          [optionId, optionToGroupMap(index, optionId)] as const,
      )
      .filter(([_, groupId]) => groupId)
      .reduce<Record<Reference<Option>, string>>(
        (accumulator, [optionId, groupId]) => {
          accumulator[optionId] = groupId!;
          return accumulator;
        },
        {},
      );
  }
}

interface MinimalDescriptionQuestionData
  extends Omit<
    DescriptionQuestionData,
    "id" | "next" | "helpPoints" | "helpMessage"
  > {}

function createDescriptionQuestion(
  options: MinimalDescriptionQuestionData,
): void {
  const questionData: DescriptionQuestionData = {
    id: createId<Reference<Question>>(),
    next: [],
    helpMessage:
      "Please pay attention to the following points, as they will help us provide the most accurate estimate for your project:",
    helpPoints: [
      "Share your product’s problem, solution, and key details.",
      "No need to be overly detailed, but clarity is key.",
      "If you're just starting, share a competitor’s link and explain how you want to stand out.",
    ],
    ...options,
  };
  const question = new DescriptionQuestion(questionData);

  insertQuestionToModuleVariable(question);
}

interface MinimalFilesQuestionData
  extends Omit<
    FilesQuestionData,
    "id" | "next" | "files" | "necessityExplanation"
  > {}

function createFilesQuestion(options: MinimalFilesQuestionData): void {
  const questionData: FilesQuestionData = {
    id: createId<Reference<Question>>(),
    next: [],
    files: [],
    necessityExplanation:
      "They'll help us better understand your project for a more accurate estimate.",
    ...options,
  };
  const question = new FilesQuestion(questionData);

  insertQuestionToModuleVariable(question);
}
