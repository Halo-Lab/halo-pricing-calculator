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

// A reducer function must be stored at the module level,
// otherwise React may call it twice on every dispatch,
// because the reducer will be recreated on every StoreProvider rerender.
// Although in development mode it is always called twice to help find
// mistakes -> https://react.dev/reference/react/useReducer#my-reducer-or-initializer-function-runs-twice
function reducer(prevState: Store, action: Action): Store {
  const nextState = action.reduce(prevState);

  return nextState
    ? {
        ...prevState,
        ...nextState,
      }
    : prevState;
}

export function StoreProvider({ children }: PropsWithChildren): JSX.Element {
  const [store, dispatch] = useReducer(reducer, null, createStore);

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
  abstract reduce(store: Store): Partial<Store> | void | undefined | null;
}
