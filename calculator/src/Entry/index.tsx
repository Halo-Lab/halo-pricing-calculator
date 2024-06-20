import { JSX, useMemo, useId } from "react";

import { Option } from "../entities/option";
import { Button } from "../components/Button";
import { Question } from "../entities/question";
import { WebsiteIcon } from "./WebsiteIcon";
import { BrandingIcon } from "./BrandingIcon";
import { WebDevelopmentIcon } from "./WebDevelopmentIcon";
import { RightAlignedTabBackground } from "../components/RightAlignedTabBackground";
import {
  AddAnswer,
  useSelector,
  useDispatch,
  RemoveAnswer,
  MoveToNextStep,
} from "../Store";

import "./index.css";

interface EntryProperties {}

export function Entry({}: EntryProperties): JSX.Element {
  const firstQuestion = useSelector((store) => store.questionsByStep[0][0]);

  return (
    <div className="columns first_step">
      <div className="columns__col">
        <LeftCard />
      </div>
      <div className="columns__col">
        <RightCard question={firstQuestion} />
      </div>
    </div>
  );
}

function LeftCard(): JSX.Element {
  return (
    <section data-banner>
      <RightAlignedTabBackground />

      <h1>
        estimate <br /> your <br /> project
        <img
          src="https://uploads-ssl.webflow.com/63f38a8c92397a024fcb9ae8/6655c98a2ac5ea540a95dc40_calculator-illustration.webp"
          alt="Yellow sparkle calculator"
        />
      </h1>

      <footer>
        <img
          src="https://uploads-ssl.webflow.com/63f38a8c92397a024fcb9ae8/6655c989d8c17acc9e11cce7_calculator-manager.webp"
          alt="Smiling woman on yellow background"
        />
        <p>
          let's talk about <br /> project more
        </p>
        <Button
          variant="secondary-on-dark"
          onClick={() => {
            window.location.pathname = "/contact-us";
          }}
          class="is-large"
        >
          get a rough estimate
        </Button>
        <Button
          variant="secondary-on-dark"
          onClick={() => {
            window.location.pathname = "/contact-us";
          }}
          class="is-large short"
        >
          get estimate
        </Button>
      </footer>
    </section>
  );
}

interface RightCardProperties {
  question: Question;
}

function RightCard({ question }: RightCardProperties): JSX.Element {
  const dispatch = useDispatch();

  const options = useSelector((store) => store.options);
  const answers = useSelector((store) => store.answers);

  const platformOptions = useMemo(() => {
    return question.options
      .map((optionReference) => options.get(optionReference))
      .filter((option): option is Option => !!option);
  }, [options, question]);

  const shouldWaitForAnswers = useMemo(() => {
    return !platformOptions.some((option) => answers.has(option.id));
  }, [answers, platformOptions]);

  return (
    <section data-platform>
      <svg
        viewBox="0 0 640 312"
        xmlns="http://www.w3.org/2000/svg"
        data-tabbed-background
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M207.029 7.02944C202.529 2.52856 196.424 0 190.059 0H24C10.7452 0 0 10.7452 0 24V32V540C0 553.255 10.7452 564 24 564H445.353H616C629.255 564 640 553.255 640 540V276.058V56C640 42.7452 629.255 32 616 32H241.941C235.576 32 229.471 29.4714 224.971 24.9706L207.029 7.02944Z"
        />
      </svg>

      <h2>{question.title}</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          dispatch(new MoveToNextStep());
        }}
      >
        <legend>{question.text}</legend>

        {platformOptions.map((option, index) => {
          return (
            <SelectOption
              key={option.id}
              index={index}
              option={option}
              multiple={question.multiple}
            />
          );
        })}

        <Button
          type="submit"
          disabled={shouldWaitForAnswers}
          variant="primary"
          class="is-small-simple"
        >
          next
        </Button>
      </form>
    </section>
  );
}

interface SelectOptionProperties {
  index: number;
  option: Option;
  multiple: boolean;
}

function SelectOption({
  index,
  option,
  multiple,
}: SelectOptionProperties): JSX.Element {
  const inputId = useId();

  const dispatch = useDispatch();

  const answers = useSelector((store) => store.answers);

  return (
    <>
      <input
        id={inputId}
        type={multiple ? "checkbox" : "radio"}
        name="select-platform"
        checked={answers.has(option.id)}
        onChange={(event) => {
          if (event.currentTarget.checked) {
            dispatch(new AddAnswer(option.id));
          } else {
            dispatch(new RemoveAnswer(option.id));
          }
        }}
      />
      <label htmlFor={inputId} data-sliding-text-container>
        <OptionIcon index={index} />
        <span data-sliding-text={option.text}>{option.text}</span>
      </label>
    </>
  );
}

interface OptionIconProperties {
  index: number;
}

function OptionIcon({ index }: OptionIconProperties): JSX.Element {
  const components: Record<number, JSX.Element> = {
    0: <WebsiteIcon />,
    1: <WebDevelopmentIcon />,
    2: <BrandingIcon />,
  };

  return <span data-option-icon>{components[index]}</span>;
}
