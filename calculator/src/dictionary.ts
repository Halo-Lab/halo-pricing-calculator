import { Entity, Reference, AnyEntity } from "./entities/entity.js";

export class Dictionary<Of extends AnyEntity> implements Iterable<Of> {
  static from<Of extends AnyEntity>(
    source: Iterable<Of> | Record<number | string | symbol, Of>,
  ): Dictionary<Of> {
    const dictionary = new Dictionary<Of>();

    const list =
      Symbol.iterator in source
        ? <Iterable<Of>>source
        : (function* () {
            for (const key in source) {
              yield source[key];
            }
          })();

    for (const entity of list) {
      dictionary.add(entity);
    }

    return dictionary;
  }

  #size: number = 0;

  [key: Reference<Of>]: Of;

  get size(): number {
    return this.#size;
  }

  *[Symbol.iterator](): Iterator<Of, void, unknown> {
    for (const key in this) {
      yield <Of>this[key];
    }
  }

  add(entity: Of): this {
    this[entity.id] = entity;
    this.#size++;

    return this;
  }

  get(reference: Reference<Of>): Of | undefined {
    return this[reference];
  }

  has(referenceOrEntity: Of | Reference<Of>): boolean {
    const reference = this.#extractReference(referenceOrEntity);

    return reference in this;
  }

  remove(referenceOrEntity: Of | Reference<Of>): this {
    const reference = this.#extractReference(referenceOrEntity);

    const isRemoved = delete this[reference];

    if (isRemoved) {
      this.#size--;
    }

    return this;
  }

  #extractReference(referenceOrEntity: Of | Reference<Of>): Reference<Of> {
    return referenceOrEntity instanceof Entity
      ? referenceOrEntity.id
      : referenceOrEntity;
  }
}
