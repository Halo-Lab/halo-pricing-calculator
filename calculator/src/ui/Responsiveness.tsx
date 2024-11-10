import {
  JSX,
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";

export interface ViewportArea {
  width: number;
  height: number;
}

const ResponsivenessContext = createContext<ViewportArea>({
  width: 0,
  height: 0,
});

export function ResponsivenessProvider(props: PropsWithChildren): JSX.Element {
  const [viewport, setViewport] = useState<ViewportArea>({
    width: innerWidth,
    height: innerHeight,
  });

  useEffect(() => {
    const onResize = () => {
      setViewport({
        width: innerWidth,
        height: innerHeight,
      });
    };

    addEventListener("resize", onResize);

    return () => removeEventListener("resize", onResize);
  }, []);

  return (
    <ResponsivenessContext.Provider value={viewport}>
      {props.children}
    </ResponsivenessContext.Provider>
  );
}

export type Dimension = "x" | "y";

export interface Breakpoints extends ViewportArea {
  gt(breakpoint: number, dimension?: Dimension): boolean;
  gte(breakpoint: number, dimension?: Dimension): boolean;
  lt(breakpoint: number, dimension?: Dimension): boolean;
  lte(breakpoint: number, dimension?: Dimension): boolean;
  range(from: number, to: number, dimension?: Dimension): boolean;
}

export function useBreakpoints(): Breakpoints {
  const { width, height } = useContext(ResponsivenessContext);

  const gte: Breakpoints["gte"] = (breakpoint, dimension) => {
    const comparedValue = dimension === "y" ? height : width;

    return comparedValue >= breakpoint;
  };
  const lte: Breakpoints["lte"] = (breakpoint, dimension) => {
    const comparedValue = dimension === "y" ? height : width;

    return comparedValue <= breakpoint;
  };
  const gt: Breakpoints["gt"] = (breakpoint, dimension) =>
    !lte(breakpoint, dimension);
  const lt: Breakpoints["lt"] = (breakpoint, dimension) =>
    !gte(breakpoint, dimension);
  const range: Breakpoints["range"] = (from, to, dimension) =>
    gte(from, dimension) && lt(to, dimension);

  return {
    width,
    height,
    gt,
    gte,
    lt,
    lte,
    range,
  };
}
