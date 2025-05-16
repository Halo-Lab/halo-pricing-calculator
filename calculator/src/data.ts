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
      summaryLabel: "Project type",
    },
    {
      text: "Web application",
      icon: "web-application",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Project type",
    },
    {
      text: "Mobile application",
      icon: "mobile-application",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Project type",
    },
    // {
    //   text: "Desktop application",
    //   estimates: [new EstimateExactAssessment(0)],
    //   summaryLabel: 'Project type'
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
      summaryLabel: "Industry",
    },
    {
      text: "Healthcare",
      icon: "healthcare",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Finance",
      icon: "finance",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Education",
      icon: "education",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Transportation & Logistics",
      icon: "logistics",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "IoT",
      icon: "iot",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Insurance",
      icon: "insurance",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Wellness & Sport",
      icon: "wellness",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Real Estate",
      icon: "real-estate",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Web3",
      icon: "web3",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Social network",
      icon: "social-network",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Agency",
      icon: "agency",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Beauty & Fashion",
      icon: "fashion",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Entertainment",
      icon: "entertainment",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "E-commerce",
      icon: "e-commerce",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
    },
    {
      text: "Other industries",
      icon: "other-industries",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Industry",
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
      summaryLabel: "Web design",
    },
    {
      text: "Web development",
      estimates: [new EstimateRangeAssessment(96, 200)],
      summaryLabel: "Web dev",
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[1].id,
      condition: new Selected((questions[0] as RegularQuestion).options[0]),
    }),
  ],
  multiple: true,
});
// Website
/* 3 */ createRegularQuestion({
  text: "How many pages will your website have?",
  title: QuestionGroup.WebDesign,
  options: [
    {
      text: "1-5 pages",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Web design",
    },
    {
      text: "6-10 pages",
      estimates: [new EstimateRangeAssessment(24, 48)],
      summaryLabel: "Web design",
    },
    {
      text: "11-20 pages",
      estimates: [new EstimateRangeAssessment(64, 112)],
      summaryLabel: "Web design",
    },
    {
      text: ">20 pages",
      estimates: [new EstimateRangeAssessment(144, 280)],
      summaryLabel: "Web design",
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
      summaryLabel: "Custom design",
    },
    {
      text: "Template design",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Template design",
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Design type",
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
      summaryLabel: "Wireframes",
    },
    {
      text: "No, they need to be designed",
      estimates: [new EstimateExactAssessment(16)],
      summaryLabel: "Wireframes",
    },
    {
      text: "I need advice on this",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Wireframes",
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
      summaryLabel: "Content",
    },
    {
      text: "I'll handle it myself",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Content",
    },
    {
      text: "No, I need help with content writing",
      estimates: [new EstimateRangeAssessment(24, 32)],
      summaryLabel: "Content",
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
      summaryLabel: "Stock images",
    },
    {
      text: "Unique illustrations",
      estimates: [new EstimateRangeAssessment(20, 40)],
      summaryLabel: "Illustrations",
    },
    {
      text: "Custom 3d elements",
      estimates: [new EstimateRangeAssessment(16, 40)],
      summaryLabel: "3d elements",
    },
    {
      text: "AI generated images",
      estimates: [new EstimateRangeAssessment(16, 40)],
      summaryLabel: "AI images",
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
      summaryLabel: "Standard speed",
    },
    {
      text: "As fast as possible",
      estimates: [
        new EstimateExactAssessment(0.6, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Fast development",
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
      summaryLabel: "Pages",
    },
    {
      text: "6-10 pages",
      estimates: [new EstimateRangeAssessment(40, 100)],
      summaryLabel: "Pages",
    },
    {
      text: "11-20 pages",
      estimates: [new EstimateRangeAssessment(72, 180)],
      summaryLabel: "Pages",
    },
    {
      text: ">20 pages",
      estimates: [new EstimateRangeAssessment(200, 300)],
      summaryLabel: "Pages",
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
      summaryLabel: "Project stack",
    },
    {
      text: "Custom development (no CMS)",
      estimates: [
        new EstimateExactAssessment(1.2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Project stack",
    },
    {
      text: "No-code (Webflow)",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Project stack",
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Project stack",
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
      summaryLabel: "Desktop and mobile",
    },
    {
      text: "Big screens (1920px, 2k, 4k)",
      estimates: [
        new EstimateExactAssessment(1.05, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Big screens",
    },
    {
      text: "Tablet (landscape & portrait)",
      estimates: [
        new EstimateExactAssessment(1.2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Tablet",
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
      summaryLabel: "Geo support",
    },
    {
      text: "Analytics tools",
      estimates: [new EstimateExactAssessment(4)],
      summaryLabel: "Analytics",
    },
    {
      text: "Payment systems (Stripe, PayPal)",
      estimates: [new EstimateRangeAssessment(16, 24)],
      summaryLabel: "Payments",
    },
    {
      text: "Cloud storage, file upload",
      estimates: [new EstimateRangeAssessment(8, 12)],
      summaryLabel: "File handling",
    },
    {
      text: "User support and chat",
      estimates: [new EstimateRangeAssessment(8, 12)],
      summaryLabel: "Chat",
    },
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Features",
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
      summaryLabel: "Branding & Marketing",
    },
    {
      text: "SEO will come in handy",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "SEO",
    },
    {
      text: "Not right now, thanks",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Services",
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
});
/* 14 */ createRegularQuestion({
  text: "What branding services are you looking for?",
  title: QuestionGroup.BrandingMarketing,
  options: [
    {
      text: "Just a logo",
      estimates: [new EstimateRangeAssessment(40, 56)],
      summaryLabel: "Logo",
    },
    {
      text: "Basic Brand Guidelines",
      estimates: [new EstimateExactAssessment(80)],
      summaryLabel: "Basic Brand",
    },
    {
      text: "Advanced Brand Guidelines",
      estimates: [new EstimateRangeAssessment(120, 160)],
      summaryLabel: "Advanced Brand",
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Branding",
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
      summaryLabel: "Naming",
    },
    {
      text: "No, I already have a name",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Naming",
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Naming",
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
      summaryLabel: "Mascots",
    },
    {
      text: "Illustrations",
      estimates: [new EstimateExactAssessment(40)],
      summaryLabel: "Illustrations",
    },
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Unique elements",
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
      summaryLabel: "Marketing materials",
    },
    {
      text: "Pitch Deck designs",
      estimates: [new EstimateRangeAssessment(12, 32)],
      summaryLabel: "Pitch Deck",
    },
    {
      text: "Promo video",
      estimates: [new EstimateRangeAssessment(12, 32)],
      summaryLabel: "Promo video",
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
      summaryLabel: "SEO pages",
    },
    {
      text: "Up to 1,000 pages",
      estimates: [new EstimateExactAssessment(48)],
      summaryLabel: "SEO pages",
    },
    {
      text: "Over 10,000 pages",
      estimates: [new EstimateExactAssessment(72)],
      summaryLabel: "SEO pages",
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
      summaryLabel: "SEO content",
    },
    {
      text: "No, the content is good as is",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "SEO content",
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "SEO content",
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
      summaryLabel: "SEO backlinks",
    },
    {
      text: "Yes, I need to improve it",
      estimates: [new EstimateExactAssessment(16)],
      summaryLabel: "SEO backlinks",
    },
    {
      text: "No, it's already good",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "SEO backlinks",
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
      summaryLabel: "SEO audit",
    },
    {
      text: "Technical audit",
      estimates: [new EstimateExactAssessment(32)],
      summaryLabel: "SEO audit",
    },
    {
      text: "Backlink profile audit",
      estimates: [new EstimateExactAssessment(24)],
      summaryLabel: "SEO audit",
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "SEO audit",
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
      summaryLabel: "Articles",
    },
    {
      text: "5 articles",
      estimates: [new EstimateExactAssessment(16)],
      summaryLabel: "Articles",
    },
    {
      text: "10 articles",
      estimates: [new EstimateExactAssessment(32)],
      summaryLabel: "Articles",
    },
    {
      text: "More than 10 articles",
      estimates: [new EstimateExactAssessment(96)],
      summaryLabel: "Articles",
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Articles",
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
      summaryLabel: "UI pages",
    },
    {
      text: "6-10 pages",
      estimates: [new EstimateRangeAssessment(24, 64)],
      summaryLabel: "UI pages",
    },
    {
      text: "11-20 pages",
      estimates: [new EstimateRangeAssessment(32, 80)],
      summaryLabel: "UI pages",
    },
    {
      text: "20-30+ pages",
      estimates: [new EstimateRangeAssessment(160, 280)],
      summaryLabel: "UI pages",
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
      summaryLabel: "Custom design",
    },
    {
      text: "Template-based design",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Template design",
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Design type",
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
      summaryLabel: "Optimization",
    },
    {
      text: "All screen sizes",
      estimates: [
        new EstimateExactAssessment(2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Optimization",
    },
    {
      text: "Desktop and mobile",
      estimates: [
        new EstimateExactAssessment(1.6, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Optimization",
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
      summaryLabel: "Account types",
    },
    {
      text: "Multiple user types",
      estimates: [
        new EstimateRangeAssessment(1.2, 2, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Account types",
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Account types",
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
      summaryLabel: "Personal profiles",
    },
    {
      text: "No, profiles aren't needed",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "No profiles",
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Profiles",
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
      summaryLabel: "Wireframes",
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
      summaryLabel: "Clickable prototype",
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
      summaryLabel: "Full prototype",
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Prototype",
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
      summaryLabel: "User profile",
    },
    {
      text: "New database",
      estimates: [new EstimateRangeAssessment(24, 40)],
      summaryLabel: "Database",
    },
    {
      text: "Chat support",
      estimates: [new EstimateRangeAssessment(40, 80)],
      summaryLabel: "Chat support",
    },
    {
      text: "Video/Audio calls (3rd party)",
      estimates: [new EstimateRangeAssessment(40, 120)],
      summaryLabel: "Calls",
    },
    {
      text: "User-to-user text messaging",
      estimates: [new EstimateRangeAssessment(40, 80)],
      summaryLabel: "PtP messaging",
    },
    {
      text: "Payments (Stripe, PayPal, etc.)",
      estimates: [new EstimateRangeAssessment(40, 120)],
      summaryLabel: "Payments",
    },
    {
      text: "Email subscription services",
      estimates: [new EstimateRangeAssessment(8, 24)],
      summaryLabel: "Email subs",
    },
    {
      text: "Cloud storage, file upload/download",
      estimates: [new EstimateRangeAssessment(24, 40)],
      summaryLabel: "File handling",
    },
    {
      text: "Maps & Location services",
      estimates: [new EstimateRangeAssessment(24, 40)],
      summaryLabel: "Maps & Locations",
    },
    {
      text: "CDN (Content Delivery Network)",
      estimates: [new EstimateRangeAssessment(24, 40)],
      summaryLabel: "CDN",
    },
    {
      text: "User management",
      estimates: [new EstimateRangeAssessment(40, 80)],
      summaryLabel: "User management",
    },
    {
      text: "Content management",
      estimates: [
        new EstimateExactAssessment(1.5, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Content management",
    },
    {
      text: "Reporting & Analytics",
      estimates: [new EstimateRangeAssessment(40, 120)],
      summaryLabel: "Analytics",
    },
    {
      text: "Notification control",
      estimates: [new EstimateRangeAssessment(40, 80)],
      summaryLabel: "Notifications",
    },
    {
      text: "Not sure yet, let's discuss",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Additional features",
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
      summaryLabel: "Migration",
    },
    {
      text: "No",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Migration",
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
      summaryLabel: "Back-end",
    },
    {
      text: "A CMS or low-code solution will work",
      estimates: [
        new EstimateRangeAssessment(1.15, 1.3, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Low-code back-end",
    },
    {
      text: "Yes, I need a fully custom back-end",
      estimates: [
        new EstimateRangeAssessment(2, 2.5, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "Full back-end",
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
      summaryLabel: "Visitors",
    },
    {
      text: "Up to 100,000 users",
      estimates: [new EstimateRangeAssessment(24, 48)],
      summaryLabel: "Visitors",
    },
    {
      text: "Up to 1 million users",
      estimates: [new EstimateRangeAssessment(40, 56)],
      summaryLabel: "Visitors",
    },
    {
      text: "More than 1 million users",
      estimates: [new EstimateRangeAssessment(40, 80)],
      summaryLabel: "Visitors",
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
      summaryLabel: "Branding & marketing",
    },
    {
      text: "No, not right now",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Branding & marketing",
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[34].id,
    }),
  ],
});
/* 36 */ createRegularQuestion({
  text: "What branding services are you looking for?",
  title: QuestionGroup.BrandingMarketing,
  options: [
    {
      text: "Just a logo",
      estimates: [new EstimateRangeAssessment(40, 56)],
      summaryLabel: "Logo",
    },
    {
      text: "Basic Brand Guidelines",
      estimates: [new EstimateRangeAssessment(80, 120)],
      summaryLabel: "Basic Brand",
    },
    {
      text: "Advanced Brand Guidelines",
      estimates: [new EstimateRangeAssessment(160, 240)],
      summaryLabel: "Advanced Brand",
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
      summaryLabel: "Naming",
    },
    {
      text: "No, I already have a name",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Naming",
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Naming",
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
      summaryLabel: "Mascots",
    },
    {
      text: "Illustrations",
      estimates: [new EstimateExactAssessment(40)],
      summaryLabel: "Illustrations",
    },
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Unique elements",
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
      summaryLabel: "Pitch deck",
    },
    {
      text: "Promo video",
      estimates: [new EstimateRangeAssessment(16, 40)],
      summaryLabel: "Promo video",
    },
    {
      text: "I'd like to discuss it",
      selection: OptionSelection.Exclusive,
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Marketing materials",
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
      summaryLabel: "UI/UX design",
    },
    {
      text: "App development",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "App development",
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[1].id,
      condition: new Selected((questions[0] as RegularQuestion).options[2]),
    }),
  ],
  multiple: true,
});
/* 41 */ createRegularQuestion({
  text: "How many screens will your app include?",
  title: QuestionGroup.UXUIDesign,
  options: [
    {
      text: "1-10 screens",
      estimates: [new EstimateRangeAssessment(40, 80)],
      summaryLabel: "Screens",
    },
    {
      text: "10-25 screens",
      estimates: [new EstimateRangeAssessment(80, 160)],
      summaryLabel: "Screens",
    },
    {
      text: "25+ screens",
      estimates: [new EstimateRangeAssessment(160, 240)],
      summaryLabel: "Screens",
    },
    {
      text: "I'd like to discuss it",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Screens",
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
      summaryLabel: "Custom UI",
    },
    {
      text: "Template-based design",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Template UI",
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Design type",
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
      estimates: [
        new EstimateExactAssessment(0),
        new EstimateRangeAssessment(4, 80, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[0],
          ),
        }),
        new EstimateRangeAssessment(44, 200, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[1],
          ),
        }),
        new EstimateRangeAssessment(280, 320, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[2],
          ),
        }),
      ],
      summaryLabel: "Wireframes",
    },
    {
      text: "Clickable prototype",
      estimates: [
        new EstimateExactAssessment(0),
        new EstimateRangeAssessment(4, 40, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[0],
          ),
        }),
        new EstimateRangeAssessment(44, 100, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[1],
          ),
        }),
        new EstimateRangeAssessment(120, 160, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[2],
          ),
        }),
      ],
      summaryLabel: "Clickable prototype",
    },
    {
      text: "Full experience prototype",
      estimates: [
        new EstimateExactAssessment(0),
        new EstimateRangeAssessment(8, 80, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[0],
          ),
        }),
        new EstimateRangeAssessment(88, 200, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[1],
          ),
        }),
        new EstimateRangeAssessment(320, 400, {
          condition: new Selected(
            (questions[41] as RegularQuestion).options[2],
          ),
        }),
      ],
      summaryLabel: "Full prototype",
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Prototype type",
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
      summaryLabel: "OS support",
    },
    {
      text: "Android only",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "OS support",
    },
    {
      text: "Both platforms",
      estimates: [
        new EstimateExactAssessment(1.3, {
          operationKind: EstimationOperationKind.Multiplication,
        }),
      ],
      summaryLabel: "OS support",
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
      summaryLabel: "Payments",
    },
    {
      text: "User authentication (login/signup)",
      estimates: [new EstimateRangeAssessment(24, 80)],
      summaryLabel: "Authentication",
    },
    {
      text: "Maps & Location services",
      estimates: [new EstimateRangeAssessment(80, 240)],
      summaryLabel: "Maps & Locations",
    },
    {
      text: "Media uploads (e.g., photos, videos, documents)",
      estimates: [new EstimateRangeAssessment(80, 120)],
      summaryLabel: "File handling",
    },
    {
      text: "Database management, cloud storage, user management",
      estimates: [new EstimateRangeAssessment(120, 240)],
      summaryLabel: "Storage",
    },
    {
      text: "Chats, notifications, real-data updates",
      estimates: [new EstimateRangeAssessment(80, 160)],
      summaryLabel: "Real-time system",
    },
    {
      text: "Offline mode",
      estimates: [new EstimateRangeAssessment(160, 240)],
      summaryLabel: "Offline mode",
    },
    {
      text: "Not sure yet, let's discuss",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Additional features",
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
      summaryLabel: "Admin panel",
    },
    {
      text: "No",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Admin panel",
    },
    {
      text: "I'm not sure yet",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Admin panel",
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
      summaryLabel: "Branding & Marketing",
    },
    {
      text: "I don't need it right now",
      estimates: [new EstimateExactAssessment(0)],
      summaryLabel: "Services",
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
      summaryLabel: "UI/UX design",
    },
    {
      text: "Web development",
      estimates: [new EstimateRangeAssessment(96, 200)],
      summaryLabel: "Web dev",
    },
  ],
  previous: [
    new PreviousQuestionConditionalLink({
      question: questions[1].id,
      condition: new Selected((questions[0] as RegularQuestion).options[1]),
    }),
  ],
  multiple: true,
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
  summaryLabel: string;
}

interface MinimalRegularQuestionData
  extends Omit<RegularQuestionData, "id" | "next" | "options"> {
  options: MinimalOptionWithEstimates[];
}

function createRegularQuestion({
  options: minimalOptionsData,
  ...minimalData
}: MinimalRegularQuestionData): void {
  const questionData: RegularQuestionData = Object.assign(
    { id: createId<Reference<Question>>(), next: [], options: [] },
    minimalData,
  );

  const question = new RegularQuestion(questionData);

  insertQuestionToModuleVariable(question);

  minimalOptionsData.forEach(
    ({ text, icon, selection, estimates: minimalEstimates, summaryLabel }) => {
      const option = new Option({
        id: createId(),
        text,
        icon,
        question: question.id,
        estimates: [],
        selection,
        summaryLabel,
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
      "To help us provide the most accurate estimate, please pay attention to the following points:",
    helpPoints: [
      "Tell us about your product's purpose, key features, and the problem it solves.",
      "No need to be overly detailed, but clarity is key.",
      "If you're just starting, share a competitor's link and explain how you want to stand out.",
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
