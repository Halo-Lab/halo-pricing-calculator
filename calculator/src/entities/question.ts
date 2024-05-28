import { Option } from "./option.js";
import { Entity, Reference } from "./entity.js";

export enum QuestionVisibilityConditionsMatchRule {
  Or = "or",
  And = "and",
}

export enum QuestionVisibilityDependencyState {
  Selected = "selected",
  NotSelected = "not selected",
}

export class QuestionVisibilityCondition {
  constructor(
    public option: Reference<Option>,
    public state: QuestionVisibilityDependencyState = QuestionVisibilityDependencyState.Selected,
  ) {}
}

export interface ConditionalPreviousQuestionData {
  step: number;
  previous: Reference<Question>;
  matchRule?: QuestionVisibilityConditionsMatchRule;
  conditions?: QuestionVisibilityCondition[];
}

export class ConditionalPreviousQuestion {
  step: number;
  previous: Reference<Question>;
  matchRule: QuestionVisibilityConditionsMatchRule;
  conditions: QuestionVisibilityCondition[];

  constructor({
    step,
    previous,
    matchRule,
    conditions,
  }: ConditionalPreviousQuestionData) {
    this.step = step;
    this.previous = previous;
    this.matchRule = matchRule ?? QuestionVisibilityConditionsMatchRule.And;
    this.conditions = conditions ?? [];
  }
}

export interface QuestionData {
  id: Reference<Question>;
  text: string;
  next: Reference<Question>[];
  title?: string;
  options: Reference<Option>[];
  previous: ConditionalPreviousQuestion[];
  multiple?: boolean;
}

export class Question extends Entity<Question> {
  text: string;
  next: Reference<Question>[];
  options: Reference<Option>[];
  previous: ConditionalPreviousQuestion[];
  multiple: boolean;
  title?: string;

  constructor({
    id,
    text,
    next,
    title,
    options,
    previous,
    multiple,
  }: QuestionData) {
    super(id);

    this.text = text;
    this.next = next;
    this.title = title;
    this.options = options;
    this.previous = previous;
    this.multiple = multiple ?? false;
  }
}
