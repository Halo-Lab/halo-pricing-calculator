import { Dispatch } from "react";

import { Action } from "./Provider";
import { Reference } from "../entities/entity";
import { Option, OptionSelection } from "../entities/option";
import {
  FilesQuestion,
  RegularQuestion,
  DescriptionQuestion,
} from "../entities/question";
import {
  Store,
  createStore,
  ProjectFile,
  ProjectFileAcceptance,
  createQuestionsSequence,
} from "./definition";

export class ResetStore extends Action {
  override reduce(store: Store): Partial<Store> {
    return createStore();
  }
}

export class AddAnswer extends Action {
  constructor(private option: Reference<Option>) {
    super();
  }

  override reduce(store: Store): Partial<Store> {
    const answers = new Set(store.answers);
    const option = store.options.get(this.option)!;
    // only RegularQuestions have options
    const question = store.questions.get(option.question) as RegularQuestion;

    if (question.multiple) {
      if (option.selection === OptionSelection.Exclusive) {
        question.options.forEach((optionReference) => {
          answers.delete(optionReference);
        });
      } else {
        question.options.forEach((optionReference) => {
          const option = store.options.get(optionReference)!;

          if (option.selection === OptionSelection.Exclusive) {
            answers.delete(optionReference);
          }
        });
      }
    } else {
      question.options.forEach((optionReference) => {
        const option = store.options.get(optionReference)!;

        if (option.selection !== OptionSelection.Inclusive) {
          answers.delete(optionReference);
        }
      });
    }

    answers.add(this.option);

    return {
      answers,
      questionsSequence: createQuestionsSequence(store.questions, answers),
    };
  }
}

export class RemoveAnswer extends Action {
  constructor(private option: Reference<Option>) {
    super();
  }

  override reduce(store: Store): Partial<Store> | void {
    const answers = new Set(store.answers);
    const wasRemoved = answers.delete(this.option);

    if (wasRemoved) {
      return {
        answers,
        questionsSequence: createQuestionsSequence(store.questions, answers),
      };
    }
  }
}

export class RemoveAnswers extends Action {
  override reduce(store: Store): Partial<Store> | void {
    if (store.answers.size) {
      const answers = new Set(store.answers);
      answers.clear();

      return {
        answers,
        questionsSequence: createQuestionsSequence(store.questions, answers),
      };
    }
  }
}

export class MoveToNextStep extends Action {
  override reduce(store: Store): Partial<Store> {
    return { currentStep: store.currentStep + 1 };
  }
}

export class MoveToPreviousStep extends Action {
  override reduce(store: Store): Partial<Store> {
    const answers = new Set(store.answers);
    const currentQuestion = store.questionsSequence[store.currentStep];

    if (currentQuestion instanceof RegularQuestion) {
      currentQuestion.options.forEach((option) => answers.delete(option));
    }

    return {
      answers,
      currentStep: store.currentStep - 1,
      projectFiles:
        currentQuestion instanceof FilesQuestion
          ? undefined
          : store.projectFiles,
      projectDescription:
        currentQuestion instanceof DescriptionQuestion
          ? undefined
          : store.projectDescription,
    };
  }
}

export class AddProjectDescription extends Action {
  constructor(private text: string) {
    super();
  }

  override reduce(store: Store): Partial<Store> {
    return {
      projectDescription: this.text,
    };
  }
}

export class RemoveProjectDescription extends Action {
  override reduce(store: Store): Partial<Store> {
    return {
      projectDescription: undefined,
    };
  }
}

interface KnownMime {
  type: string;
  mask: Array<number>;
  pattern: Array<number>;
  extension?: string;
}

export class AddProjectFiles extends Action {
  /**
   * a list of masks for sniffing common file types
   * {@see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern}
   */
  #mimes: Array<KnownMime> = [
    {
      type: "image/jpeg",
      pattern: [0xff, 0xd8, 0xff],
      mask: [0xff, 0xff, 0xff],
    },
    {
      type: "image/png",
      pattern: [0x89, 0x50, 0x4e, 0x47],
      mask: [0xff, 0xff, 0xff, 0xff],
    },
    {
      type: "application/pdf",
      pattern: [0x25, 0x50, 0x44, 0x46, 0x2d],
      mask: [0xff, 0xff, 0xff, 0xff, 0xff],
    },
    {
      type: "application/msword",
      pattern: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
      mask: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
      extension: "doc",
    },
    {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      pattern: [0x50, 0x4b, 0x03, 0x04],
      mask: [0xff, 0xff, 0xff, 0xff],
      extension: "docx",
    },
  ];
  #fileLimitSize = 15 * 1024 ** 2; // 15 Mb in bytes

  constructor(private files: Array<File>) {
    super();
  }

  #checkMagicNumber(fileBytes: Uint8Array, file: File): boolean {
    return this.#mimes.some(({ mask, pattern, extension }) => {
      return (
        mask.every(
          (maskByte, index) => (fileBytes[index] & maskByte) === pattern[index],
        ) && (extension ? file.name.endsWith(extension) : true)
      );
    });
  }

  async #startFileCheck(file: File, dispatch: Dispatch<Action>): Promise<void> {
    const bytes = await new Promise<Uint8Array>((resolve) => {
      // get only first 8 bytes to check for "magic numbers"
      const blob = file.slice(0, 8);
      const reader = new FileReader();

      reader.addEventListener("loadend", () => {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      });
      reader.readAsArrayBuffer(blob);
    });

    const isFileFormatAccepted = this.#checkMagicNumber(bytes, file);

    const updatedProjectFileAcceptance = !isFileFormatAccepted
      ? ProjectFileAcceptance.NotSupportedExtension
      : this.#fileLimitSize < file.size
        ? ProjectFileAcceptance.TooLarge
        : ProjectFileAcceptance.Accepted;

    dispatch(
      new ChangeProjectFile({
        original: file,
        acceptance: updatedProjectFileAcceptance,
      }),
    );
  }

  override reduce(store: Store, dispatch: Dispatch<Action>): Partial<Store> {
    const files = this.files.map((file): ProjectFile => {
      this.#startFileCheck(file, dispatch);

      return {
        original: file,
        acceptance: ProjectFileAcceptance.Unknown,
      };
    });

    return {
      projectFiles: store.projectFiles?.concat(files) ?? files,
    };
  }
}

export class ChangeProjectFile extends Action {
  constructor(private projectFile: ProjectFile) {
    super();
  }

  override reduce(store: Store, dispatch: Dispatch<Action>): Partial<Store> {
    return {
      projectFiles: store.projectFiles?.map((projectFile) =>
        projectFile.original === this.projectFile.original
          ? this.projectFile
          : projectFile,
      ),
    };
  }
}

export class RemoveProjectFile extends Action {
  constructor(private file: File) {
    super();
  }

  override reduce(store: Store): Partial<Store> {
    return {
      projectFiles: store.projectFiles?.filter(
        (projectFile) => projectFile.original !== this.file,
      ),
    };
  }
}
