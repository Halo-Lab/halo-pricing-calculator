import browserslist from "browserslist";
import { defineConfig } from "vite";
import { browserslistToTargets } from "lightningcss";

export default defineConfig({
  css: {
    transformer: "lightningcss",
    lightningcss: {
      drafts: { customMedia: true },
      targets: browserslistToTargets(browserslist(">= 0.25%")),
    },
  },
  build: {
    cssMinify: "lightningcss",
  },
});
