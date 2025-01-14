export interface Subscriber<A> {
  (data: A): void;
}

export class DataReactiveContainer<A> {
  #data: A;
  #subscribers = new Set<Subscriber<A>>();

  constructor(data: A) {
    this.#data = data;
  }

  get data(): A {
    return this.#data;
  }

  set data(values: Partial<A> | void | null | undefined) {
    if (values) {
      this.#data = {
        ...this.#data,
        ...values,
      };

      this.#subscribers.forEach((subscriber) => subscriber(this.#data));
    }
  }

  subscribe(subscriber: Subscriber<A>): VoidFunction {
    this.#subscribers.add(subscriber);

    return () => {
      this.#subscribers.delete(subscriber);
    };
  }
}
