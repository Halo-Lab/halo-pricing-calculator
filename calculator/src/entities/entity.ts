export type AnyEntity = Entity<any>;

export type Reference<To extends AnyEntity> = string & {
  __referenced__entity__: To;
};

export abstract class Entity<Of extends AnyEntity> {
  protected constructor(public id: Reference<Of>) {}
}
