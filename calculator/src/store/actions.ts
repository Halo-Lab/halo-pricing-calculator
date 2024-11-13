import { Dispatch } from "react";

import { Action } from "./Provider";
import { Option } from "../entities/option";
import { Reference } from "../entities/entity";
import { RegularQuestion } from "../entities/question";
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
    const question = store.questions.get(option.question)!;

    if (question instanceof RegularQuestion && !question.multiple) {
      question.options.forEach((optionReference) => {
        answers.delete(optionReference);
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
  ];
  #fileLimitSize = 15 * 1024 ** 2; // 15 Mb in bytes

  constructor(private files: Array<File>) {
    super();
  }

  #checkMagicNumber(fileBytes: Uint8Array): boolean {
    return this.#mimes.some(({ mask, pattern }) => {
      return mask.every(
        (maskByte, index) => (fileBytes[index] & maskByte) === pattern[index],
      );
    });
  }

  async #startFileCheck(file: File, dispatch: Dispatch<Action>): Promise<void> {
    const bytes = await new Promise<Uint8Array>((resolve) => {
      // get only first 5 bytes to check for "magic numbers"
      const blob = file.slice(0, 5);
      const reader = new FileReader();

      reader.addEventListener("loadend", () => {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      });
      reader.readAsArrayBuffer(blob);
    });

    const isFileFormatAccepted = this.#checkMagicNumber(bytes);

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
