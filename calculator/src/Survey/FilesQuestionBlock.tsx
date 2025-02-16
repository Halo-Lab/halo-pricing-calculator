import { JSX } from "react";

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
  extends Omit<BoxProps, "as" | "width" | "minHeight" | "spacing"> {
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

  return (
    <Box
      vertical
      width="fill"
      minHeight={gte(1100) ? 21.5 : undefined}
      spacing={2.375}
      {...props}
    >
      <Box width="fill" spacing={1.25} vertical>
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
        spacing={1.875}
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
          dispatch(new AddProjectFiles(files));
        }}
      >
        {files.length ? <FilePreviewsGrid files={files} /> : <NoFilesState />}
      </FileInput>
    </Box>
  );
}
