import {
  JSX,
  useMemo,
  Dispatch,
  useContext,
  useReducer,
  createContext,
  PropsWithChildren,
} from "react";

import { createStore, Store } from "./definition";

const StoreContext = createContext<[Store, Dispatch<Action>]>(null!);

export function StoreProvider({ children }: PropsWithChildren): JSX.Element {
  const [store, dispatch] = useReducer(
    (prevState: Store, action: Action) => {
      const nextState = action.reduce(prevState, async (action: Action) => {
        // Schedule the run after the current render phase ends.
        await Promise.resolve();
        dispatch(action);
      });

      return nextState
        ? {
            ...prevState,
            ...nextState,
          }
        : prevState;
    },
    null,
    createStore,
  );

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

export function useSelector<R>(selector: (store: Store) => R): R {
  const [store] = useContext(StoreContext);

  return useMemo(() => selector(store), [store]);
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
