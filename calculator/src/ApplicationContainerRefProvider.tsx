import {
  JSX,
  useRef,
  RefObject,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";

const ApplicationContainerContext = createContext<ApplicationContainer>({
  ref: { current: null },
  scrollToTop() {},
});

export function ApplicationContainerRefProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <ApplicationContainerContext
      value={{
        ref: containerRef,
        scrollToTop() {
          // Make sure to scroll after ref is populated.
          setTimeout(
            () => {
              containerRef.current?.scrollIntoView({
                block: "start",
                inline: "nearest",
                behavior: "smooth",
              });
            },
            // Wait a bit longer than one frame to make sure that
            // the layout is recalculated and the new position is known.
            20,
          );
        },
      }}
    >
      {children}
    </ApplicationContainerContext>
  );
}

export interface ApplicationContainer {
  ref: RefObject<HTMLElement | null>;
  scrollToTop(): void;
}

export function useApplicationContainer(): ApplicationContainer {
  return useContext(ApplicationContainerContext);
}
