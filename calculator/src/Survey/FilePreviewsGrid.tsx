import { Fragment, JSX } from "react";

import { Box } from "../ui/Box";
import { ProjectFile } from "../store/definition";
import { FilePreview } from "./FilePreview";
import { useBreakpoints } from "../ui/Responsiveness";
import { SmallFileUploadZone } from "./SmallFileUploadZone";

interface FilePreviewsGridProps {
  files: Array<ProjectFile>;
  isDragging: boolean;
}

export function FilePreviewsGrid({
  files,
  isDragging,
}: FilePreviewsGridProps): JSX.Element {
  const { gte, range } = useBreakpoints();

  const groupLength = range(980, 1050)
    ? 7
    : range(890, 980) || gte(1680)
      ? 6
      : range(750, 890) || range(1420, 1680)
        ? 5
        : range(590, 750) || range(1200, 1420)
          ? 4
          : range(430, 590) || range(1050, 1200)
            ? 3
            : 2;

  return (
    <Box vertical spacing={1} alignX="center">
      {groupElementsBy(files, groupLength).map((group, index, groups) => {
        const isLastGroup = groups.length - 1 === index;

        return (
          <Fragment key={index}>
            <Box spacing={1} width="fill">
              {group.map((projectFile, index) => {
                return (
                  <FilePreview
                    key={projectFile.original.name + index}
                    projectFile={projectFile}
                  />
                );
              })}
              {isLastGroup && group.length < groupLength ? (
                <SmallFileUploadZone isDragging={isDragging} />
              ) : null}
            </Box>
            {isLastGroup && group.length >= groupLength ? (
              <Box spacing={1} width="fill">
                <SmallFileUploadZone isDragging={isDragging} />
              </Box>
            ) : null}
          </Fragment>
        );
      })}
    </Box>
  );
}

function groupElementsBy<A>(
  elements: Array<A>,
  groupLength: number,
): Array<Array<A>> {
  return elements.reduce<Array<Array<A>>>(
    (accumulator, element) => {
      let lastGroup = accumulator.at(-1)!;

      if (lastGroup.length === groupLength) {
        lastGroup = [];
        accumulator.push(lastGroup);
      }

      lastGroup.push(element);

      return accumulator;
    },
    [[]],
  );
}