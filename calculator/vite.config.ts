import browserslist from "browserslist";
import { name } from "../package.json";
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
    outDir: "../dist",
    emptyOutDir: true,
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        entryFileNames: `${name}/assets/[name].js`,
        chunkFileNames: `${name}/assets/[name].js`,
        assetFileNames: `${name}/assets/[name].[ext]`,
      },
    },
  },
});
