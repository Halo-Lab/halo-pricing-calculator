import {
  JSX,
  useRef,
  Dispatch,
  RefObject,
  useContext,
  createContext,
  PropsWithChildren,
  useSyncExternalStore,
} from "react";

import { createStore, Store } from "./definition";
import { DataReactiveContainer } from "./core";

const StoreContext = createContext<
  [RefObject<DataReactiveContainer<Store>>, Dispatch<Action>]
>(null!);

export function StoreProvider({ children }: PropsWithChildren): JSX.Element {
  const reactiveContainer = useRef<DataReactiveContainer<Store>>(null!);

  // This pattern is allowed to avoid instantiating the DataReactiveContainer
  // on every render.
  // https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
  if (!reactiveContainer.current) {
    reactiveContainer.current = new DataReactiveContainer(createStore());
  }

  function dispatch(action: Action): void {
    reactiveContainer.current.data = action.reduce(
      reactiveContainer.current.data,
      async (action: Action) => {
        // Schedule the run after the current container update phase ends.
        await Promise.resolve();
        dispatch(action);
      },
    );
  }

  return (
    <StoreContext.Provider value={[reactiveContainer, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

/** Returns non-reactive readonly `Store` object
 * which always contains fresh data. */
export function useStore(): Readonly<Store> {
  const [containerRef] = useContext(StoreContext);

  return new Proxy({} as Readonly<Store>, {
    get(_, property) {
      return containerRef.current.data[property as keyof Store];
    },
  });
}

export function useSelector<R>(selector: (store: Store) => R): R {
  const [containerRef] = useContext(StoreContext);

  return useSyncExternalStore<R>(
    (callback) => containerRef.current.subscribe(callback),
    () => selector(containerRef.current.data),
  );
}

export function useDispatch(): Dispatch<Action> {
  return useContext(StoreContext)[1];
}

export abstract class Action {
  abstract reduce(
    store: Store,
    dispatch: Dispatch<Action>,
  ): Partial<Store> | void | undefined | null;
}
