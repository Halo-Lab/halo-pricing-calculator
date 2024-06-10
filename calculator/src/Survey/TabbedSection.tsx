import { JSX, PropsWithChildren, useState, useEffect } from "react";

import { Button } from "../components/Button";
import { PlusIcon } from "./PlusIcon";
import { MultiLineInput } from "../components/MultiLineInput";
import { RightAlignedTabBackground } from "../components/RightAlignedTabBackground";
import {
  useSelector,
  useDispatch,
  RemoveComment,
  MoveToPreviousStep,
} from "../Store";

interface TabbedSectionProperties extends PropsWithChildren {
  heading: string;
  nextButton(comment: string | undefined): JSX.Element;
  showComments: boolean;
}

export function TabbedSection({
  heading,
  children,
  nextButton,
  showComments,
}: TabbedSectionProperties): JSX.Element {
  const [comment, setComment] = useState<string>();

  const dispatch = useDispatch();

  const steps = useSelector((store) => store.questionsByStep.length + 1);
  const comments = useSelector((store) => store.comments);
  const currentStep = useSelector((store) => store.currentStep + 1);

  useEffect(() => {
    const currentStepComment = comments.find(
      (comment) => comment.step === currentStep - 1,
    );

    if (currentStepComment) {
      setComment(currentStepComment.text);
    } else {
      setComment(undefined);
    }
  }, [currentStep, comments]);

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
          {comment != null && (
            <MultiLineInput
              label="Additional comment"
              onInput={(value) => setComment(value)}
              value={comment as string}
            />
          )}

          <div data-buttons>
            <div>
              {showComments ? (
                <button
                  type="button"
                  data-btn-tertiary
                  onClick={() => {
                    setComment((value) => (value == null ? "" : undefined));
                  }}
                >
                  <PlusIcon isMinus={comment != null} /> add comment
                </button>
              ) : null}
            </div>
            <Button
              variant="secondary-on-light"
              onClick={() => {
                if (comment) {
                  dispatch(new RemoveComment());
                }

                dispatch(new MoveToPreviousStep());
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
}
