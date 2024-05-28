import {
  JSX,
  memo,
  effect,
  Getter,
  provider,
  Component,
  immediately,
  WithChildren,
} from "moru";

type MatchCallback<A> = (value: A) => boolean;

interface SwitchContext<A> {
  value: Getter<A>;
  tryMatch(predicate: MatchCallback<A>): boolean;
  defaultIsCalled(): void;
}

const [Provider, useSwitch] = provider<SwitchContext<any>>();

interface SwitchProperties<A> extends WithChildren {
  value: Getter<A>;
}

export function Switch<A>({
  value,
  children,
}: SwitchProperties<A>): JSX.Element {
  let matched = false;
  let defaultIsCalled = false;

  effect(
    () => {
      defaultIsCalled = matched = false;
    },
    [value],
    immediately,
  );

  const tryMatch = (predicate: MatchCallback<A>): boolean => {
    if (import.meta.env.DEV && defaultIsCalled) {
      throw new Error(
        "Looks like the Default component is not defined last " +
          "and was already matched. Please, define the Default after all Cases.",
      );
    }

    if (matched) {
      return false;
    } else {
      return (matched = predicate(value()));
    }
  };

  return (
    <Provider
      value={{
        value,
        tryMatch,
        defaultIsCalled() {
          defaultIsCalled = true;
        },
      }}
    >
      {children}
    </Provider>
  );
}

interface CaseProperties<A> extends WithChildren {
  when: MatchCallback<A> | A;
}

export function Case<A>({ when, children }: CaseProperties<A>): JSX.Element {
  const { value, tryMatch } = useSwitch();

  const callback: MatchCallback<A> =
    typeof when === "function"
      ? (when as MatchCallback<A>)
      : (value: A) => value === when;

  return memo(() => {
    const canRender = tryMatch(callback);

    return canRender ? children : null;
  }, [value]);
}

export const Default: Component<WithChildren> = ({ children }) => {
  const { defaultIsCalled } = useSwitch();

  return (
    <Case
      when={() => {
        defaultIsCalled();

        return true;
      }}
    >
      {children}
    </Case>
  );
};
