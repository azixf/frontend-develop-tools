import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  transformers: [transformerDirectives()],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
        carbon: () =>
          import("@iconify-json/carbon/icons.json").then((i) => i.default),
      },
    }),
  ],
  shortcuts: [
    ["wh-full", "w-full h-full"],
    ["f-c-c", "flex justify-center items-center"],
    ["f-col", "flex flex-col"],
  ],
});
