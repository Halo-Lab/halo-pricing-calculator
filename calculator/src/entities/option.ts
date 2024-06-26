import { Question } from "./question.js";
import { Estimate } from "./estimate.js";
import { Reference, Entity } from "./entity.js";

export interface OptionData {
  id: Reference<Option>;
  text: string;
  question: Reference<Question>;
  estimates: Reference<Estimate>[];
}

export class Option extends Entity<Option> {
  /**
   * Option's text
   */
  text: string;
  /**
   * A reference to the {@link Question} containing this option.
   */
  question: Reference<Question>;
  /**
   * References to all possible estimates for this option.
   */
  estimates: Reference<Estimate>[];

  constructor({ id, text, question, estimates }: OptionData) {
    super(id);

    this.text = text;
    this.question = question;
    this.estimates = estimates;
  }
}
