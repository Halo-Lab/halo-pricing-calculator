import { JSX, useState } from "react";

import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { useDispatch } from "../store/Provider";
import { ProjectFile } from "../store/definition";
import { NoFilesState } from "./NoFilesState";
import { FilesQuestion } from "../entities/question";
import { Box, BoxProps } from "../ui/Box";
import { useBreakpoints } from "../ui/Responsiveness";
import { AddProjectFiles } from "../store/actions";
import { FilePreviewsGrid } from "./FilePreviewsGrid";
import { FileInput, FileInputDecoration } from "../ui/FileInput";

interface FilesQuestionBlockProps
  extends Omit<BoxProps, "as" | "width" | "spacing"> {
  files: Array<ProjectFile>;
  question: FilesQuestion;
}

export function FilesQuestionBlock({
  files,
  question,
  ...props
}: FilesQuestionBlockProps): JSX.Element {
  const { gte } = useBreakpoints();
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Box vertical width="fill" spacing={2} {...props}>
      <Box width="fill" spacing={1} vertical>
        <Text size={1.5} weight={500} spacing={0.4}>
          {question.text}
        </Text>
        <Text spacing={0.4} color={Color.blueDark70}>
          {question.necessityExplanation}
        </Text>
      </Box>

      <FileInput
        multiple
        vertical
        width="fill"
        padding={files.length ? undefined : gte(550) ? 3.125 : 1.75}
        spacing={1.5}
        decorations={
          files.length
            ? undefined
            : FileInputDecoration()
                .backgroundColor(Color.greyLight)
                .borderRadius(1)
                .borderWidth(0.0625)
                .borderStyle("dashed")
                .borderColor(Color.blueDark30)
        }
        onFiles={(files) => {
          setIsDragging(false);
          dispatch(new AddProjectFiles(files));
        }}
        onDropZoneEnter={() => setIsDragging(true)}
        onDropZoneLeave={() => setIsDragging(false)}
      >
        {files.length ? (
          <FilePreviewsGrid files={files} isDragging={isDragging} />
        ) : (
          <NoFilesState />
        )}
      </FileInput>
    </Box>
  );
}
