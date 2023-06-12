import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoImport from "unplugin-auto-import/vite";
import vueComponents from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import unoCss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
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
        resolvers: [ElementPlusResolver()],
        imports: ["vue"],
        eslintrc: {
          enabled: false,
        },
      }),
      unoCss(),
    ],
    esbuild: {
      drop: ["console", "debugger"],
    },
    build: {
      target: "es2015",
      minify: isProd ? "esbuild" : false,
      outDir: "build",
      assetsDir: "static",
      assetsInlineLimit: 8192,
      sourcemap: !isProd,
      rollupOptions: {
        output: {
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/entry-[name]-[hash].js",
        },
      },
    },
  };
});
