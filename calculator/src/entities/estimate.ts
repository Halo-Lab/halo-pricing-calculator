import { Option } from "./option.js";
import { Entity, Reference } from "./entity.js";

export enum EstimateApplicationConditionKind {
  Or = "or",
  And = "and",
}

export class EstimateApplicationCondition {
  constructor(
    public kind: EstimateApplicationConditionKind,
    public chosenOptions: Reference<Option>[],
  ) {}
}

abstract class EstimateAssessmentBase {
  constructor(public applicable?: EstimateApplicationCondition) {}

  abstract toString(): string;
}

export class EstimateExactAssessment extends EstimateAssessmentBase {
  constructor(
    public hours: number,
    applicable?: EstimateApplicationCondition,
  ) {
    super(applicable);
  }

  override toString(): string {
    const days = Math.ceil(this.hours / 8);

    return `${days} day${days === 1 ? "" : "s"}`;
  }
}

export class EstimateRangeAssessment extends EstimateAssessmentBase {
  constructor(
    public minHours: number,
    public maxHours: number,
    applicable?: EstimateApplicationCondition,
  ) {
    super(applicable);
  }

  override toString(): string {
    const minDays = Math.ceil(this.minHours / 8);
    const maxDays = Math.ceil(this.maxHours / 8);

    return `${minDays}-${maxDays} days`;
  }
}

export class EstimateUnknownAssessment extends EstimateAssessmentBase {
  override toString(): string {
    return "Need to consult";
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

export class Estimate extends Entity<Estimate> {
  text: string;
  option: Reference<Option>;
  assessment: EstimateAssessment;

  constructor({ id, text, option, assessment }: EstimateData) {
    super(id);

    this.text = text;
    this.option = option;
    this.assessment = assessment;
  }
}
