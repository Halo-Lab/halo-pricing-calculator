import { Question } from "./question.js";
import { Estimate } from "./estimate.js";
import { Reference, Entity } from "./entity.js";

export interface OptionData {
  id: Reference<Option>;
  text: string;
  icon?: string;
  question: Reference<Question>;
  estimates: Reference<Estimate>[];
  selection?: OptionSelection;
  summaryLabel: string;
  showOnlyLabel?: boolean;
}

/**
 * Changes a way of how an {@link Option} participates in
 * option selection process.
 */
export enum OptionSelection {
  /** Forces an {@link Option} to be the only one selected even in questions with `multiple: true`. */
  Exclusive = "exclusive-selection",
  /**
   * Allows an {@link Option} to be selected with other options even
   * in questions with `multiple: false` or `multiple: undefined`.
   */
  Inclusive = "inclusive-selection",
}

export class Option extends Entity<Option> {
  /**
   * Option's text.
   */
  text: string;
  /**
   * Option's label which will be shown in `Summary` block.
   */
  summaryLabel: string;
  /**
   * Option's label which will be shown in `Summary` block.
   */
  showOnlyLabel?: boolean;
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
  /**
   * Forces a current {@link Option} to contradict the {@link Question#multiple}
   * property.
   *
   * For example, if a question allows to select multiple options and one of them
   * has `OptionSelection.Exclusive`, then only it will be selected and selection of
   * others will be dropped.
   */
  selection?: OptionSelection;

  constructor({
    id,
    text,
    icon,
    question,
    estimates,
    selection,
    summaryLabel,
    showOnlyLabel,
  }: OptionData) {
    super(id);

    this.text = text;
    this.icon = icon;
    this.question = question;
    this.estimates = estimates;
    this.selection = selection;
    this.summaryLabel = summaryLabel;
    this.showOnlyLabel = showOnlyLabel;
  }
}
