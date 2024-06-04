import {
  JSX,
  memo,
  Show,
  state,
  Getter,
  effect,
  Component,
  WithChildren,
} from "moru";

import { Button } from "../Button.js";
import { PlusIcon } from "./PlusIcon.js";
import { MultiLineInput } from "../MultiLineInput.js";
import { RightAlignedTabBackground } from "../RightAlignedTabBackground.js";
import {
  useStore,
  RemoveCommentEvent,
  MoveToPreviousStepEvent,
} from "../../store.js";

interface TabbedSectionProperties extends WithChildren {
  heading: JSX.Element;
  nextButton(comment: Getter<string | undefined>): JSX.Element;
  showComments: boolean;
}

export const TabbedSection: Component<TabbedSectionProperties> = ({
  heading,
  children,
  nextButton,
  showComments,
}) => {
  const [select, dispatch] = useStore();

  const [comment, setComment] = state<string>();

  const steps = select((store) => store.questionsByStep.length + 1);
  const comments = select((store) => store.comments);
  const currentStep = select((store) => store.currentStep + 1);

  const isCommentsAreaVisible = memo(() => {
    return comment((value) => value != null);
  }, [comment]);

  effect(() => {
    const currentStepComment = comments((comments) =>
      comments.find((comment) => comment.step === currentStep() - 1),
    );

    if (currentStepComment) {
      setComment(currentStepComment.text);
    } else {
      setComment(undefined);
    }
  }, [currentStep]);

  return (
    <div>
      <h4>estimation of website</h4>

      <section data-tabbed-section>
        <RightAlignedTabBackground />

        <header>
          <h1>{heading}</h1>
          <span>
            <span data-label>Step:</span>
            <span data-counter>
              {currentStep}/{steps}
            </span>
          </span>
        </header>

        {children}

        <footer>
          <Show when={isCommentsAreaVisible}>
            <MultiLineInput
              label="Additional comment"
              on:input={(event) => setComment(event.currentTarget.value)}
              prop:value={comment as Getter<string>}
            />
          </Show>
          <div data-buttons>
            <div>
              {showComments ? (
                <button
                  type="button"
                  data-btn-tertiary
                  on:click={() => {
                    setComment((value) => (value == null ? "" : undefined));
                  }}
                >
                  <PlusIcon isMinus={isCommentsAreaVisible} /> add comment
                </button>
              ) : null}
            </div>
            <Button
              variant="secondary-on-light"
              on:click={() => {
                const commentText = comment();

                if (commentText) {
                  dispatch(new RemoveCommentEvent());
                }

                dispatch(new MoveToPreviousStepEvent());
              }}
            >
              back
            </Button>
            {nextButton(comment)}
          </div>
        </footer>
      </section>
    </div>
  );
};
