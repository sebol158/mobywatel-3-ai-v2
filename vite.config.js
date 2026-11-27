import { defineConfig } from "vite";
import { copyFileSync, cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

function copyStaticAssets() {
  return {
    name: "copy-static-assets",
    closeBundle() {
      const distDir = resolve("dist");
      mkdirSync(distDir, { recursive: true });
      for (const file of ["manifest.json", "icon-mobywatel.svg"]) {
        if (existsSync(file)) copyFileSync(file, resolve(distDir, file));
      }
      if (existsSync("figma-svg")) {
        cpSync("figma-svg", resolve(distDir, "figma-svg"), { recursive: true });
      }
    }
  };
}

export default defineConfig({
  base: "./",
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
  plugins: [copyStaticAssets()]
});
