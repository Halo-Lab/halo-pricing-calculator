import { Question } from "./question.js";
import { Estimate } from "./estimate.js";
import { Reference, Entity } from "./entity.js";

export interface OptionData {
  id: Reference<Option>;
  text: string;
  icon?: string;
  question: Reference<Question>;
  estimates: Reference<Estimate>[];
}

export class Option extends Entity<Option> {
  /**
   * Option's text
   */
  text: string;
  /**
   * Option's identifier of an associated icon.
   */
  icon?: string;
  /**
   * A reference to the {@link Question} containing this option.
   */
  question: Reference<Question>;
  /**
   * References to all possible estimates for this option.
   */
  estimates: Reference<Estimate>[];

  constructor({ id, text, icon, question, estimates }: OptionData) {
    super(id);

    this.text = text;
    this.icon = icon;
    this.question = question;
    this.estimates = estimates;
  }
}
