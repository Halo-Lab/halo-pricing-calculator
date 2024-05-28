import { resolve } from "node:path";

import { defineCliConfig, getStudioEnvironmentVariables } from "sanity/cli";

const envDir = resolve("..");

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET_TYPE } =
  getStudioEnvironmentVariables({
    envFile: { mode: "development", envDir },
  });

export default defineCliConfig({
  api: {
    dataset: SANITY_STUDIO_DATASET_TYPE,
    projectId: SANITY_STUDIO_PROJECT_ID,
  },
  vite: {
    envDir,
  },
});
