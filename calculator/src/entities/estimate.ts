import { Option } from "./option.js";
import { Condition } from "./condition.js";
import { Entity, Reference } from "./entity.js";

export type EstimateRange = [min: number, max: number];

export enum EstimationOperationKind {
  Addition = "+",
  Multiplication = "*",
}

export interface EstimateAssessmentOptions {
  condition?: Condition;
  minimalDelta?: number;
  maximalDelta?: number;
  operationKind?: EstimationOperationKind;
}

abstract class EstimateAssessmentBase extends Condition {
  /**
   * Indicates the operation which must be conducted while
   * including current {@link Estimate} to the global {@link EstimateRange}.
   */
  operationKind: EstimationOperationKind;
  /**
   * Indicates if this {@link Estimate} can be included to the global {@link EstimateRange}.
   * An absent value means this estimate is always included.
   *
   * @default undefined
   */
  condition?: Condition;
  /**
   * Sets minimal required numeric value by which the global {@link EstimateRange}
   * increases by including current {@link Estimate}.
   *
   * @default Number.MIN_VALUE
   */
  minimalDelta?: number;
  /**
   * Sets maximal permitted numeric value by which the global {@link EstimateRange}
   * increases by including current {@link Estimate}.
   *
   * @default Number.MAX_VALUE
   */
  maximalDelta?: number;

  constructor({
    condition,
    minimalDelta,
    maximalDelta,
    operationKind,
  }: EstimateAssessmentOptions = {}) {
    super();

    this.condition = condition;
    this.minimalDelta = minimalDelta;
    this.maximalDelta = maximalDelta;
    this.operationKind = operationKind ?? EstimationOperationKind.Addition;
  }

  /**
   * Applies the current {@link Estimate} to previously reduced ones.
   */
  abstract applyTo(range: EstimateRange): EstimateRange;

  /**
   * Returns human-readable representation of the current {@link Estimate}'s
   * numeric part.
   */
  abstract override toString(): string;

  override matches(answers: Set<Reference<Option>>): boolean {
    return this.condition?.matches(answers) ?? true;
  }

  /**
   * Ensures {@link actualDelta} fits into {@link this#minimalDelta} and
   * {@link this#maximalDelta} if they are defined.
   */
  protected clamp(actualDelta: number): number {
    return Math.max(
      this.minimalDelta ?? Number.MIN_VALUE,
      Math.min(actualDelta, this.maximalDelta ?? Number.MAX_VALUE),
    );
  }
}

export class EstimateExactAssessment extends EstimateAssessmentBase {
  constructor(
    public operand: number,
    options?: EstimateAssessmentOptions,
  ) {
    super(options);
  }

  override applyTo(range: EstimateRange): EstimateRange {
    switch (this.operationKind) {
      case EstimationOperationKind.Addition: {
        const delta = this.clamp(this.operand);

        return [range[0] + delta, range[1] + delta];
      }
      case EstimationOperationKind.Multiplication: {
        const minDelta = range[0] * this.operand - range[0];
        const maxDelta = range[1] * this.operand - range[1];

        return [
          range[0] + this.clamp(minDelta),
          range[1] + this.clamp(maxDelta),
        ];
      }
    }
  }

  override toString(): string {
    const sign = this.operand >= 0 ? "+" : "";

    switch (this.operationKind) {
      case EstimationOperationKind.Addition: {
        const days = Estimate.toDays(this.clamp(this.operand));

        return `${sign}${days} day${days === 1 ? "" : "s"}`;
      }
      case EstimationOperationKind.Multiplication: {
        return `${sign}${this.operand * 100}%`;
      }
    }
  }
}

export class EstimateRangeAssessment extends EstimateAssessmentBase {
  constructor(
    public minOperand: number,
    public maxOperand: number,
    options?: EstimateAssessmentOptions,
  ) {
    super(options);
  }

  override applyTo(range: EstimateRange): EstimateRange {
    switch (this.operationKind) {
      case EstimationOperationKind.Addition: {
        return [
          range[0] + this.clamp(this.minOperand),
          range[1] + this.clamp(this.maxOperand),
        ];
      }
      case EstimationOperationKind.Multiplication: {
        const minimalDelta = range[0] * this.minOperand - range[0];
        const maximalDelta = range[1] * this.maxOperand - range[1];

        return [
          range[0] + this.clamp(minimalDelta),
          range[1] + this.clamp(maximalDelta),
        ];
      }
    }
  }

  override toString(): string {
    const sign = this.minOperand >= 0 ? "+" : "";

    switch (this.operationKind) {
      case EstimationOperationKind.Addition: {
        const minDays = Estimate.toDays(this.clamp(this.minOperand));
        const maxDays = Estimate.toDays(this.clamp(this.maxOperand));

        return `${sign}${minDays}-${maxDays} days`;
      }
      case EstimationOperationKind.Multiplication: {
        return `${sign}${this.minOperand * 100}-${this.maxOperand * 100}%`;
      }
    }
  }
}

export class EstimateUnknownAssessment extends EstimateAssessmentBase {
  override applyTo(range: EstimateRange): EstimateRange {
    return range;
  }

  override toString(): string {
    return "+? days";
  }
}

export type EstimateAssessment =
  | EstimateExactAssessment
  | EstimateRangeAssessment
  | EstimateUnknownAssessment;

export interface EstimateData {
  id: Reference<Estimate>;
  text: string;
  option: Reference<Option>;
  assessment: EstimateAssessment;
}

/**
 * Estimate is always represented with *hours* or a *multiplier* of it.
 */
export class Estimate extends Entity<Estimate> {
  /**
   * Converts working hours to days.
   */
  static toDays(hours: number): number {
    return Math.ceil(hours / 8);
  }

  /**
   * Estimate's display text.
   * It can be used as a short description of the estimate.
   *
   * The empty string means this estimate won't be shown to the user.
   */
  text: string;
  /**
   * A reference to containing this estimate {@link Option}.
   */
  option: Reference<Option>;
  /**
   * Estimate's time representation part.
   */
  assessment: EstimateAssessment;

  constructor({ id, text, option, assessment }: EstimateData) {
    super(id);

    this.text = text;
    this.option = option;
    this.assessment = assessment;
  }
}
