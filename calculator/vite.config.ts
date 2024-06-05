import browserslist from "browserslist";
import { name } from "../package.json";
import { defineConfig } from "vite";
import { browserslistToTargets } from "lightningcss";

export default defineConfig({
  base: `/${name}`,
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
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
