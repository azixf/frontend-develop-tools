import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoImport from "unplugin-auto-import/vite";
import vueComponents from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    vueComponents({
      dts: "./src/typings/vue-components.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    autoImport({
      dts: "./src/typings/auto-import.d.ts",
      imports: ["vue"],
      eslintrc: {
        enabled: false,
      },
    }),
  ],
});
