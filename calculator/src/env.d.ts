export {};

declare global {
  interface ImportMeta {
    env: {
      VITE_SERVER_BASE_URL: string;
    };
  }
}
