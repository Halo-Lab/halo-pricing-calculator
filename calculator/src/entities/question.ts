import { Option } from "./option.js";
import { Condition } from "./condition.js";
import { Entity, Reference } from "./entity.js";

export interface ConditionalPreviousQuestionLinkData {
  question: Reference<Question>;
  condition?: Condition;
}

export class PreviousQuestionConditionalLink extends Condition {
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

  constructor({ question, condition }: ConditionalPreviousQuestionLinkData) {
    super();

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
  title: string;
  previous: PreviousQuestionConditionalLink[];
  optional?: boolean;
}

export abstract class Question extends Entity<Question> {
  /**
   * Question's text.
   */
  text: string;
  /**
   * References to all possible following questions.
   */
  next: Reference<Question>[];
  /**
   * Links to all possible previous questions.
   * This property impacts the position of the following questions.
   *
   * Only one following question is allowed, so implicitly the {@link Or}
   * rule is applied here.
   */
  previous: PreviousQuestionConditionalLink[];
  /**
   * Defines the common title for grouped questions.
   * All questions under one group have to have the same title.
   */
  title: string;
  /**
   * Indicates whether the current question needs to be answered.
   */
  optional?: boolean;

  constructor({ id, text, next, title, previous, optional }: QuestionData) {
    super(id);

    this.text = text;
    this.next = next;
    this.title = title;
    this.previous = previous;
    this.optional = optional;
  }
}

export interface RegularQuestionData extends QuestionData {
  options: Reference<Option>[];
  multiple?: boolean;
  optionToGroupMap?: Record<Reference<Option>, string>;
}

export class RegularQuestion extends Question {
  /**
   * References to all options (answers) of this question.
   */
  options: Reference<Option>[];
  /**
   * Indicates whether multiple answers are permitted for this
   * question.
   */
  multiple: boolean;
  /**
   * If questions itself should not provide a Summary entry,
   * its options may contribute to other groups. This map contains
   * relations of which option adds assessment to which group.
   *
   * When selected option is intended to contribute to another group
   * the title of the current question, which option belongs to,
   * will not appear in Summary.
   */
  optionToGroupMap?: Record<Reference<Option>, string>;

  constructor({
    options,
    multiple,
    optionToGroupMap,
    ...data
  }: RegularQuestionData) {
    super(data);

    this.options = options;
    this.multiple = multiple ?? false;
    this.optionToGroupMap = optionToGroupMap;
  }
}

export interface DescriptionQuestionData extends QuestionData {
  // TODO: these properties must be combined into one with the Rich Text value type.
  helpPoints: Array<string>;
  helpMessage: string;
}

export class DescriptionQuestion extends Question {
  helpMessage: string;
  helpPoints: Array<string>;

  constructor({ helpPoints, helpMessage, ...data }: DescriptionQuestionData) {
    super(data);

    this.helpPoints = helpPoints;
    this.helpMessage = helpMessage;
  }
}

export interface FilesQuestionData extends QuestionData {
  files: Array<File>;
  necessityExplanation: string;
}

export class FilesQuestion extends Question {
  files: Array<File>;
  necessityExplanation: string;

  constructor({ files, necessityExplanation, ...data }: FilesQuestionData) {
    super(data);

    this.files = files;
    this.necessityExplanation = necessityExplanation;
  }
}
