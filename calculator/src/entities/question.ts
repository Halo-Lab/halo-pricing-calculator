import { Option } from "./option.js";
import { Condition } from "./condition.js";
import { Entity, Reference } from "./entity.js";

export enum QuestionStep {
  New = "new",
  Same = "same",
}

export interface ConditionalPreviousQuestionLinkData {
  step: QuestionStep;
  question: Reference<Question>;
  condition?: Condition;
}

export class PreviousQuestionConditionalLink extends Condition {
  /**
   * Indicates whether this {@link Question} sits on the same
   * page as the {@link this#previous} one.
   */
  step: QuestionStep;
  /**
   * A reference to the previous {@link Question}.
   */
  question: Reference<Question>;
  /**
   * A condition which decides if the {@link this#previous}
   * question can be followed by the current one given a current environment (answers).
   *
   * If the value is absent, the current question always follows the {@link this#previous}.
   *
   * @default undefined
   */
  condition?: Condition;

  constructor({
    step,
    question,
    condition,
  }: ConditionalPreviousQuestionLinkData) {
    super();

    this.step = step;
    this.question = question;
    this.condition = condition;
  }

  override matches(answers: Set<Reference<Option>>): boolean {
    return this.condition?.matches(answers) ?? true;
  }
}

export interface QuestionData {
  id: Reference<Question>;
  text: string;
  next: Reference<Question>[];
  title?: string;
  options: Reference<Option>[];
  previous: PreviousQuestionConditionalLink[];
  multiple?: boolean;
  optional?: boolean;
}

export class Question extends Entity<Question> {
  /**
   * Question's text.
   */
  text: string;
  /**
   * References to all possible following questions.
   */
  next: Reference<Question>[];
  /**
   * References to all options (answers) of this question.
   */
  options: Reference<Option>[];
  /**
   * Links to all possible previous questions.
   * This property impacts the position of the following questions.
   *
   * Only one following question is allowed, so implicitly the {@link Or}
   * rule is applied here.
   */
  previous: PreviousQuestionConditionalLink[];
  /**
   * Indicates whether multiple answers are permitted for this
   * question.
   */
  multiple: boolean;
  /**
   * Defines the common title for grouped questions.
   * Many questions may have it, but only the first one will be used.
   */
  title?: string;
  /**
   * Indicates whether the current question needs be answered.
   */
  optional?: boolean;

  constructor({
    id,
    text,
    next,
    title,
    options,
    previous,
    multiple,
    optional,
  }: QuestionData) {
    super(id);

    this.text = text;
    this.next = next;
    this.title = title;
    this.options = options;
    this.previous = previous;
    this.multiple = multiple ?? false;
    this.optional = optional;
  }
}
