export {};

interface Env {
  SANITY_STUDIO_PROJECT_ID: string;
  SANITY_STUDIO_DATASET_TYPE: string;
}

declare global {
  interface ImportMeta {
    env: Env;
  }
}
