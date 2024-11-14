import { JSX, useState } from "react";

import { Box } from "../ui/Box";
import { Summary } from "./Summary";
import { FinalWords } from "./FinalWords";
import { Questionnaire } from "./Questionnaire";
import { SendEmailForm } from "./SendEmailForm";
import { useBreakpoints } from "../ui/Responsiveness";

export function Survey(): JSX.Element {
  const { lt } = useBreakpoints();
  const [isDataSendFormVisible, setIsDataSendFormVisible] = useState(false);
  const [shouldFinalWordsFrameBeVisible, setShouldFinalWordsFrameBeVisible] =
    useState(false);

  return (
    <>
      <Box width="fill" vertical={lt(1050)} spacing={lt(1050) ? 1 : 2}>
        {shouldFinalWordsFrameBeVisible ? (
          <FinalWords />
        ) : (
          <Questionnaire
            userReachedTheEnd={() => setIsDataSendFormVisible(true)}
          />
        )}
        <Summary shouldRestrictHeight={!shouldFinalWordsFrameBeVisible} />
      </Box>
      {isDataSendFormVisible && (
        <SendEmailForm
          closeForm={() => setIsDataSendFormVisible(false)}
          onEmailSent={() => {
            setIsDataSendFormVisible(false);
            setShouldFinalWordsFrameBeVisible(true);
          }}
        />
      )}
    </>
  );
}

// import { Option } from "../entities/option";
// import { Button } from "../components/Button";
// import { Question } from "../entities/question";
// import { PlusIcon } from "./PlusIcon";
// import { FinalStage } from "./FinalStage";
// import { TabbedSection } from "./TabbedSection";
// import { Estimate, EstimateRange } from "../entities/estimate";
// import {
//   useSelector,
//   useDispatch,
//   AddComment,
//   MoveToNextStep,
//   AddAnswer,
//   RemoveAnswer,
// } from "../Store";

// import "./index.css";

// interface SurveyProperties {}

// export function Survey({}: SurveyProperties): JSX.Element {
//   const currentStep = useSelector((store) => store.currentStep);
//   const questions = useSelector(
//     (store) => store.questionsSequence[currentStep],
//   );

//   return (
//     <div className="columns">
//       <div className="columns__col">
//         {questions ? <QuestionsBlock questions={questions} /> : <FinalStage />}
//       </div>
//       <div className="columns__col">
//         <ResultsBlock />
//       </div>
//     </div>
//   );
// }

// interface QuestionsBlockProperties {
//   questions: Question[];
// }

// function QuestionsBlock({ questions }: QuestionsBlockProperties): JSX.Element {
//   const dispatch = useDispatch();

//   const answers = useSelector((store) => store.answers);

//   const isMovingForwardForbidden = useMemo(() => {
//     return !questions.every((question) => {
//       return (
//         question.optional ||
//         question.options.some((optionReference) => answers.has(optionReference))
//       );
//     });
//   }, [answers, questions]);

//   return (
//     <TabbedSection
//       heading={questions.find((question) => question.title)?.title ?? ""}
//       showComments
//       nextButton={(comment) => (
//         <Button
//           onClick={() => {
//             if (comment) {
//               dispatch(new AddComment(comment));
//             }

//             dispatch(new MoveToNextStep());
//           }}
//           disabled={isMovingForwardForbidden}
//           variant="primary"
//         >
//           next
//         </Button>
//       )}
//     >
//       <div data-questions>
//         {questions.map((question) => (
//           <QuestionBlock key={question.id} question={question} />
//         ))}
//       </div>
//     </TabbedSection>
//   );
// }

// interface QuestionBlockProperties {
//   question: Question;
// }

// function QuestionBlock({ question }: QuestionBlockProperties): JSX.Element {
//   const blockId = useId();

//   const dispatch = useDispatch();
//   const options = useSelector((store) => store.options);

//   const questionOptions = useMemo(() => {
//     return question.options
//       .map((optionReference) => options.get(optionReference))
//       .filter((option): option is Option => !!option);
//   }, [options, question]);

//   return (
//     <article>
//       <h3>{question.text}</h3>

//       {questionOptions.map((option) => {
//         return (
//           <SelectOption
//             key={option.id}
//             name={blockId}
//             option={option}
//             multiple={question.multiple}
//           />
//         );
//       })}
//     </article>
//   );
// }

// interface SelectOptionProperties {
//   name: string;
//   option: Option;
//   multiple: boolean;
// }

// function SelectOption({
//   name: blockName,
//   option,
//   multiple,
// }: SelectOptionProperties): JSX.Element {
//   const inputId = useId();

//   const dispatch = useDispatch();

//   const answers = useSelector((store) => store.answers);

//   return (
//     <>
//       <input
//         id={inputId}
//         type={multiple ? "checkbox" : "radio"}
//         name={multiple ? "" : blockName}
//         checked={answers.has(option.id)}
//         onChange={(event) => {
//           if (event.currentTarget.checked) {
//             dispatch(new AddAnswer(option.id));
//           } else {
//             dispatch(new RemoveAnswer(option.id));
//           }
//         }}
//       />
//       <label htmlFor={inputId}>{option.text}</label>
//     </>
//   );
// }

// function ResultsBlock(): JSX.Element {
//   const listRef = useRef<HTMLOListElement>(null);

//   const [isListExpanded, setIsListExpanded] = useState(false);

//   const options = useSelector((store) => store.options);
//   const answers = useSelector((store) => store.answers);
//   const estimates = useSelector((store) => store.estimates);

//   const estimatesOfSelectedOptions = useMemo(() => {
//     return Array.from(answers)
//       .map((optionReference) => options.get(optionReference))
//       .flatMap((option) => {
//         return option?.estimates.map((estimateReference) =>
//           estimates.get(estimateReference),
//         );
//       })
//       .filter((estimate): estimate is Estimate => !!estimate?.text)
//       .filter((estimate) => {
//         return estimate.assessment.matches(answers);
//       });
//   }, [answers, options, estimates]);

//   const overallEstimateRange = useMemo(() => {
//     return estimatesOfSelectedOptions.reduce(
//       (accumulator: EstimateRange, estimate) => {
//         return estimate.assessment.applyTo(accumulator);
//       },
//       [0, 0],
//     );
//   }, [estimatesOfSelectedOptions]);

//   return (
//     <section data-results>
//       <header>
//         <h2>Summary</h2>

//         <button
//           type="button"
//           onClick={() => {
//             setIsListExpanded((value) => !value);
//           }}
//         >
//           <PlusIcon isMinus={isListExpanded} />
//         </button>
//       </header>

//       <ol
//         ref={listRef}
//         data-expanded={isListExpanded}
//         scroll-style-light=""
//         data-lenis-prevent
//       >
//         {estimatesOfSelectedOptions.map((estimate) => {
//           return (
//             <li key={estimate.id}>
//               <span>{estimate.text}</span>{" "}
//               <span>{estimate.assessment.toString()}</span>
//             </li>
//           );
//         })}
//       </ol>

//       <footer>
//         Total:
//         <span>
//           {Estimate.toDays(overallEstimateRange[0])}-
//           {Estimate.toDays(overallEstimateRange[1])} days
//         </span>
//       </footer>
//     </section>
//   );
// }
