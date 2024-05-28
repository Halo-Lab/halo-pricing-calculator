import { Question } from "./question.js";
import { Estimate } from "./estimate";
import { Reference, Entity } from "./entity.js";

export interface OptionData {
  id: Reference<Option>;
  text: string;
  question: Reference<Question>;
  estimates: Reference<Estimate>[];
}

export class Option extends Entity<Option> {
  text: string;
  question: Reference<Question>;
  estimates: Reference<Estimate>[];

  constructor({ id, text, question, estimates }: OptionData) {
    super(id);

    this.text = text;
    this.question = question;
    this.estimates = estimates;
  }
}
