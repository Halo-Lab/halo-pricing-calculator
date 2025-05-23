import browserslist from "browserslist";
import { defineConfig } from "vite";
import { browserslistToTargets } from "lightningcss";

import { name } from "../package.json";

export default defineConfig({
  base: `/${name}`,
  css: {
    transformer: "lightningcss",
    lightningcss: {
      drafts: { customMedia: true },
      targets: browserslistToTargets(browserslist(">= 0.25%")),
    },
  },
  assetsInclude: ["**/*.lottie"],
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
