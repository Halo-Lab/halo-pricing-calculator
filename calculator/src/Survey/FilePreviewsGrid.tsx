import { Fragment, JSX, useEffect, useRef } from "react";

import { Box } from "../ui/Box";
import { ProjectFile } from "../store/definition";
import { FilePreview } from "./FilePreview";
import { useBreakpoints } from "../ui/Responsiveness";
import { groupElementsBy } from "./groupElementsBy";
import { SmallFileUploadZone } from "./SmallFileUploadZone";

interface FilePreviewsGridProps {
  files: Array<ProjectFile>;
  isDragging: boolean;
}

export function FilePreviewsGrid({
  files,
  isDragging,
}: FilePreviewsGridProps): JSX.Element {
  const lastRowRef = useRef<HTMLElement>(null);
  const { gte, range } = useBreakpoints();

  const groupLength = range(980, 1100)
    ? 7
    : range(890, 980) || gte(1680)
      ? 6
      : range(750, 890) || range(1420, 1680)
        ? 5
        : range(590, 750) || range(1200, 1420)
          ? 4
          : range(430, 590) || range(1100, 1200)
            ? 3
            : 2;

  useEffect(() => {
    lastRowRef.current?.parentElement?.scrollTo({
      top: lastRowRef.current.parentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [files, groupLength]);

  return (
    <Box
      vertical
      spacing={1}
      maxHeight={
        /* Height of single FilePreview card
        6.875 *
        Number of fully visible cards
        3 +
        Number of spaces between fully visible cards
        2 *
        Spacing amount
        1 +
        Arbitrary visible height of the next FilePreview card
        2.375 */ 25
      }
      clipY="scrollable"
    >
      {groupElementsBy(files, groupLength).map((group, index, groups) => {
        const isLastGroup = groups.length - 1 === index;
        const canPlusButtonFitIntoLastRow = group.length < groupLength;

        return (
          <Fragment key={index}>
            <Box
              spacing={1}
              width="fill"
              ref={
                isLastGroup && canPlusButtonFitIntoLastRow
                  ? lastRowRef
                  : undefined
              }
            >
              {group.map((projectFile, index) => {
                return (
                  <FilePreview
                    key={projectFile.original.name + index}
                    projectFile={projectFile}
                  />
                );
              })}
              {isLastGroup && canPlusButtonFitIntoLastRow ? (
                <SmallFileUploadZone isDragging={isDragging} />
              ) : null}
            </Box>
            {isLastGroup && !canPlusButtonFitIntoLastRow ? (
              <Box spacing={1} width="fill" ref={lastRowRef}>
                <SmallFileUploadZone isDragging={isDragging} />
              </Box>
            ) : null}
          </Fragment>
        );
      })}
    </Box>
  );
}
