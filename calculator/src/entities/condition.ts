import { Option } from "./option.js";
import { Reference } from "./entity.js";

export abstract class Condition {
  /**
   * Returns `true` if this condition is satisfied by given {@link answers}.
   * Otherwise, it returns `false`.
   */
  abstract matches(answers: Set<Reference<Option>>): boolean;
}

/**
 * Tries to match at least one {@link Condition}.
 */
export class SomeOf extends Condition {
  conditions: Condition[];

  constructor(...conditions: [Condition[]] | Condition[]) {
    super();

    this.conditions = conditions.flat();
  }

  override matches(answers: Set<Reference<Option>>): boolean {
    return this.conditions.some((condition) => condition.matches(answers));
  }
}

/**
 * Matches only if all {@link Condition}s are satisfied.
 */
export class All extends Condition {
  conditions: Condition[];

  constructor(...conditions: [Condition[]] | Condition[]) {
    super();

    this.conditions = conditions.flat();
  }

  override matches(answers: Set<Reference<Option>>): boolean {
    return this.conditions.every((condition) => condition.matches(answers));
  }
}

/**
 * Matches if the {@link Condition} does not match.
 */
export class Not extends Condition {
  constructor(public condition: Condition) {
    super();
  }

  override matches(answers: Set<Reference<Option>>): boolean {
    return !this.condition.matches(answers);
  }
}

/**
 * Matches only if the {@link Option} is included in answers.
 */
export class Selected extends Condition {
  constructor(public option: Reference<Option>) {
    super();
  }

  override matches(answers: Set<Reference<Option>>): boolean {
    return answers.has(this.option);
  }
}
