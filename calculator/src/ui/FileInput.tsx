import {
  Ref,
  JSX,
  useRef,
  useState,
  DragEvent,
  forwardRef,
  DragEventHandler,
  MutableRefObject,
} from "react";

import { extend } from "./Element";
import { Decoration, Opaque } from "./decorations";
import { Box, BoxCSSProperties, BoxProps } from "./Box";

import "./FileInput.css";

export type FileInputCSSProperties = Opaque<
  BoxCSSProperties,
  "FileInputCSSProperties"
>;

export const FileInputDecoration = Decoration<FileInputCSSProperties>;

export type FileInputMode = "only-click" | "only-drop";

export interface FileInputProps extends Omit<BoxProps, "as"> {
  mode?: FileInputMode;
  onFiles(files: Array<File>): void;
  multiple?: boolean;
  onDropZoneEnter?: DragEventHandler<HTMLInputElement>;
  onDropZoneLeave?: DragEventHandler<HTMLInputElement>;
}

export const FileInput = forwardRef(
  (
    {
      mode,
      onFiles,
      multiple,
      children,
      onDropZoneEnter,
      onDropZoneLeave,
      _extend,
      ...props
    }: FileInputProps,
    ref?: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [draggingDetected, setIsDraggingDetected] = useState(false);

    const isClickingAllowed = mode !== "only-drop";
    const isDraggingAllowed = mode !== "only-click";

    return (
      <Box
        _extend={extend(_extend, {
          className(value = "") {
            return `${value} c-file-input ${draggingDetected ? "c-drag-over-zone" : ""}`;
          },
          onDrop() {
            if (isDraggingAllowed) {
              return (event) => {
                event.preventDefault();
                setIsDraggingDetected(false);

                const files = Array.from(event.dataTransfer.items)
                  .filter((item) => item.kind === "file")
                  .map((item) => item.getAsFile()!);

                if (files.length) {
                  onFiles(files);
                }
              };
            }
          },
          onDragOver() {
            if (isDraggingAllowed) {
              return (event) => event.preventDefault();
            }
          },
          onDragEnter() {
            if (isDraggingAllowed) {
              return (event) => {
                setIsDraggingDetected(true);
                onDropZoneEnter?.(event as DragEvent<HTMLInputElement>);
              };
            }
          },
          onDragLeave() {
            if (isDraggingAllowed) {
              return (event) => {
                setIsDraggingDetected(false);
                onDropZoneLeave?.(event as DragEvent<HTMLInputElement>);
              };
            }
          },
          onPointerUp() {
            if (isClickingAllowed) {
              return () => {
                inputRef.current?.click();
              };
            }
          },
        })}
        {...props}
      >
        <input
          ref={(node) => {
            inputRef.current = node;

            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as MutableRefObject<HTMLInputElement | null>).current = node;
            }
          }}
          type="file"
          multiple={multiple}
          onChange={(event) => {
            const files = event.currentTarget.files;

            if (files?.length) {
              onFiles(Array.from(files));
            }
          }}
        />
        {children}
      </Box>
    );
  },
);
