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
  alignUIForMaximumComfortableVisibility() {},
});

export function ApplicationContainerRefProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <ApplicationContainerContext
      value={{
        ref: containerRef,
        alignUIForMaximumComfortableVisibility() {
          // Make sure to scroll after ref is populated.
          setTimeout(
            () => {
              const boundingRectangle =
                containerRef.current?.getBoundingClientRect();

              if (boundingRectangle) {
                const top =
                  // If we cannot fix calculator UI into the viewport,
                  boundingRectangle.height >= innerHeight
                    ? // scroll to the top leaving the small padding.
                      boundingRectangle.top -
                      // We have to subtract here to scroll farther, if calculator
                      // overlaps with the top edge of the viewport and to scroll less
                      // if overlapping happens with the bottom edge of the viewport.
                      // That way we will always have a small distance between viewport
                      // and calculator.
                      16 // px
                    : boundingRectangle.top +
                      // Invert the sign here to correctly extend or decrease the scrolling path.
                      // When we have to go up, the top value is negative and we must add a negative
                      // padding to it, otherwise the padding must be subtracted.
                      -(
                        // Calculate position of the top edge of the calculator UI
                        // relative to the viewport's top edge such that the center of both is
                        // the same point.
                        (innerHeight / 2 - boundingRectangle.height / 2)
                      );

                // Scroll the page for calculator is not scrollable.
                scrollBy({
                  top,
                  behavior: "smooth",
                });
              }
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
  alignUIForMaximumComfortableVisibility(): void;
}

export function useApplicationContainer(): ApplicationContainer {
  return useContext(ApplicationContainerContext);
}
