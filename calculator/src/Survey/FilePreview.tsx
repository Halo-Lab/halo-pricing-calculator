import { JSX, useEffect, useMemo, useState } from "react";

import { Icon } from "../components/icons";
import { Color } from "../palettes/colours";
import { Button } from "../ui/Button";
import { useDispatch } from "../store/Provider";
import { SvgDecoration } from "../ui/Svg";
import { RemoveProjectFile } from "../store/actions";
import { Text, TextDecoration } from "../ui/Text";
import { Image, ImageDecoration } from "../ui/Image";
import { Box, BoxDecoration, BoxProps } from "../ui/Box";
import { ProjectFile, ProjectFileAcceptance } from "../store/definition";

interface FilePreviewProps
  extends Omit<BoxProps, "as" | "inFront" | "decorations" | "_extend"> {
  projectFile: ProjectFile;
}

export function FilePreview({
  projectFile,
  ...props
}: FilePreviewProps): JSX.Element {
  const [isCloseButtonHovered, setIsCloseButtonHovered] = useState(false);
  const dispatch = useDispatch();
  const objectUrl = useMemo(
    () =>
      projectFile.acceptance === ProjectFileAcceptance.Accepted
        ? projectFile.original.type === "application/pdf" ||
          projectFile.original.type === "application/msword" ||
          projectFile.original.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ? null
          : URL.createObjectURL(projectFile.original)
        : null,
    [projectFile],
  );

  useEffect(() => {
    if (objectUrl) {
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [objectUrl]);

  return (
    <Box
      width={6.875}
      height={6.875}
      decorations={BoxDecoration()
        .cursor("auto")
        .borderRadius(1)
        .backgroundColor(Color.blueDark)}
      inFront={
        <Box
          width="fill"
          height="fill"
          padding={0.5}
          vertical
          spacing={
            projectFile.acceptance === ProjectFileAcceptance.Unknown
              ? 0.1
              : 0.875
          }
          decorations={BoxDecoration()
            .borderRadius(1)
            .backgroundColor(
              projectFile.acceptance !== ProjectFileAcceptance.Accepted
                ? Color.blueDark60
                : Color.blueDark20,
            )}
        >
          <Button
            width={1.5}
            height={1.5}
            alignX="end"
            onPress={() => {
              dispatch(new RemoveProjectFile(projectFile.original));
            }}
            _extend={{
              onPointerEnter() {
                setIsCloseButtonHovered(true);
              },
              onPointerLeave() {
                setIsCloseButtonHovered(false);
              },
            }}
          >
            <Icon
              variant="close"
              width="fill"
              height="fill"
              invertColor={isCloseButtonHovered ? Color.greyLight : Color.white}
            />
          </Button>

          {projectFile.acceptance === ProjectFileAcceptance.Unknown ? (
            <Icon
              width={3}
              height={3}
              variant="loader"
              alignX="center"
              moveUp={0.875}
              invertColor={Color.white}
              decorations={SvgDecoration().animation(
                "1s infinite spinning-loader",
              )}
            />
          ) : projectFile.acceptance ===
            ProjectFileAcceptance.Accepted ? null : (
            <Text
              color={Color.white}
              size={0.875}
              spacing={0.6}
              weight={500}
              alignX="center"
              decorations={TextDecoration().textAlign("center")}
            >
              {projectFile.acceptance === ProjectFileAcceptance.TooLarge
                ? "File is too large"
                : projectFile.acceptance ===
                    ProjectFileAcceptance.FailedToProcess
                  ? "Something went wrong"
                  : "Format is not supported"}
            </Text>
          )}
        </Box>
      }
      _extend={{
        onPointerUp(event) {
          event.stopPropagation();
        },
      }}
      {...props}
    >
      {objectUrl ? (
        <Image
          width="fill"
          height="fill"
          fit="contain"
          source={objectUrl}
          description="Uploaded image"
          decorations={ImageDecoration().borderRadius(1)}
        />
      ) : (
        <Icon
          color="white"
          variant="pdf"
          alignX="center"
          alignY="center"
          width={2.625}
        />
      )}
    </Box>
  );
}
