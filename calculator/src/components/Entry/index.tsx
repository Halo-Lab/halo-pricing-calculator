import { For, Component, memo, Getter } from "moru";

import { Option } from "../../entities/option.js";
import { Button } from "../Button";
import { createId } from "../../id.js";
import { Question } from "../../entities/question.js";
import { WebsiteIcon } from "./WebsiteIcon.js";
import { Case, Switch } from "../Switch.js";
import { BrandingIcon } from "./BrandingIcon.js";
import { WebDevelopmentIcon } from "./WebDevelopmentIcon.js";
import { RightAlignedTabBackground } from "../RightAlignedTabBackground";
import {
  useStore,
  AddAnswerEvent,
  RemoveAnswerEvent,
  MoveToNextStepEvent,
} from "../../store.js";

import "./index.css";

interface EntryProperties extends RightCardProperties {}

export const Entry: Component<EntryProperties> = ({ question }) => {
  return (
    <>
      <LeftCard />
      <RightCard question={question} />
    </>
  );
};

const LeftCard: Component<{}> = () => {
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
          on:click={() => {
            window.location.pathname = "/contact-us";
          }}
        >
          get a rough estimate
        </Button>
      </footer>
    </section>
  );
};

interface RightCardProperties {
  question: Getter<Question>;
}

const RightCard: Component<RightCardProperties> = ({ question }) => {
  const [select, dispatch] = useStore();

  const options = select((store) => store.options);
  const answers = select(
    (store) => store.answers,
    () => false,
  );

  const questionTitle = memo(() => {
    return question((question) => question.title);
  }, [question]);
  const questionText = memo(() => {
    return question((question) => question.text);
  }, [question]);
  const multipleOptionsAllowed = memo(() => {
    return question((question) => question.multiple);
  }, [question]);

  const platformOptions = memo(() => {
    return question()
      .options.map((optionReference) => options().get(optionReference))
      .filter((option): option is Option => !!option);
  }, [options, question]);

  const shouldWaitForAnswers = memo(() => {
    return !platformOptions().some((option) => answers().has(option.id));
  }, [answers]);

  return (
    <section data-platform>
      <svg
        viewBox="0 0 640 312"
        xmlns="http://www.w3.org/2000/svg"
        data-tabbed-background
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M207.029 7.02944C202.529 2.52856 196.424 0 190.059 0H24C10.7452 0 0 10.7452 0 24V32V540C0 553.255 10.7452 564 24 564H445.353H616C629.255 564 640 553.255 640 540V276.058V56C640 42.7452 629.255 32 616 32H241.941C235.576 32 229.471 29.4714 224.971 24.9706L207.029 7.02944Z"
        />
      </svg>

      <h2>{questionTitle}</h2>
      <form
        on:submit={(event) => {
          event.preventDefault();

          dispatch(new MoveToNextStepEvent());
        }}
      >
        <legend>{questionText}</legend>

        <For each={platformOptions}>
          {(option, index) => {
            return (
              <SelectOption
                index={index}
                option={option}
                multiple={multipleOptionsAllowed}
              />
            );
          }}
        </For>

        <Button type="submit" disabled={shouldWaitForAnswers} variant="primary">
          next
        </Button>
      </form>
    </section>
  );
};

interface SelectOptionProperties {
  index: Getter<number>;
  option: Getter<Option>;
  multiple: Getter<boolean>;
}

const SelectOption: Component<SelectOptionProperties> = ({
  index,
  option,
  multiple,
}) => {
  const inputId = createId();

  const [select, dispatch] = useStore();

  const answers = select(
    (store) => store.answers,
    () => false,
  );

  const text = memo(() => {
    return option((option) => option.text);
  }, [option]);

  const inputType = memo(() => {
    return multiple() ? "checkbox" : "radio";
  }, [multiple]);
  const isSelected = memo(() => {
    return answers().has(option().id);
  }, [answers, option]);

  return (
    <>
      <input
        id={inputId}
        type={inputType}
        name="select-platform"
        checked={isSelected}
        on:change={(event) => {
          if (event.currentTarget.checked) {
            dispatch(new AddAnswerEvent(option().id));
          } else {
            dispatch(new RemoveAnswerEvent(option().id));
          }
        }}
      />
      <label for={inputId} data-sliding-text-container>
        <OptionIcon index={index} />
        <span data-sliding-text={text}>{text}</span>
      </label>
    </>
  );
};

interface OptionIconProperties {
  index: Getter<number>;
}

const OptionIcon: Component<OptionIconProperties> = ({ index }) => {
  return (
    <span data-option-icon>
      <Switch value={index}>
        <Case when={0}>
          <WebsiteIcon />
        </Case>
        <Case when={1}>
          <WebDevelopmentIcon />
        </Case>
        <Case when={2}>
          <BrandingIcon />
        </Case>
      </Switch>
    </span>
  );
};
